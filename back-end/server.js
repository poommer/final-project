const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const axios = require("axios");
const { error, log, count } = require("console");
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const serveIndex = require('serve-index');

const content = require('./content/script')
const lessons = require('./lessons/script')
const reward = require('./reward/script')
const user = require('./user/script')
const quiz = require('./quiz/script')
const mission = require('./mission/script')

const conn = require('./conn')


const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// กำหนดพาธไปยังโฟลเดอร์ uploads
const upload_folder = path.join(__dirname, 'uploads');

// เสิร์ฟไฟล์แบบ static จากโฟลเดอร์ uploads
app.use('/upload/url', express.static(upload_folder), serveIndex(upload_folder, { 'icons': true }));

const YOUR_CLIENT_ID =
    "48950314663-6bmeog4bo4p8ke8p35q28kpv1irer6tm.apps.googleusercontent.com";
const YOUR_CLIENT_SECRET = "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";
const YOUR_REDIRECT_URL = "http://localhost:3000/auth/google/callback";

app.get("/auth/google", (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URL}&response_type=code&scope=profile email`;
    res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    try {
        const { data } = await axios.post("https://oauth2.googleapis.com/token", {
            client_id: YOUR_CLIENT_ID,
            client_secret: YOUR_CLIENT_SECRET,
            code,
            redirect_uri: YOUR_REDIRECT_URL,
            grant_type: "authorization_code",
        });
        const { access_token, id_token } = data;
        const { data: profile } = await axios.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );
        console.log(profile);
        const { data: profileData } = await axios.get(
            `http://localhost:3000/auth/google/checkEmail?email=${profile.email}&id=${profile.id}`
        );

        try {
            // แปลงข้อมูลเป็น query string
            const params = new URLSearchParams();
            params.append("status", profileData.status);
            params.append("response", JSON.stringify(profileData.response));
            params.append("message", profileData.message);

            const queryString = params.toString();

            // ทำการ redirect พร้อมกับ query parameters
            res.redirect(`http://localhost:5173/api?${queryString}`);
        } catch (error) {
            res.redirect("http://localhost:5173");
        }

        // res.redirect(`/auth/google/checkEmail?email=${profile.email}&id=${profile.id}`);
    } catch (err) {
        res.redirect("/auth/google");
    }
});

app.get("/auth/google/checkEmail", async (req, res) => {
    let email = req.query.email;
    let id = req.query.id;
    let SQL =
        "SELECT user_ID, user_name, user_gender, user_birthday, user_email,  coin_balance, xp, user_rank, user_status FROM user WHERE user_email = ?";
    try {
        await conn.execute(SQL, [email], async (err, result) => {
            try {
                if (result.length === 1) {
                    let { user_ID, user_name, user_email, user_status } = result[0];
                    res.status(200).json({
                        status: 200,
                        message: "User found.",
                        response: {
                            user_ID: user_ID,
                            user_name: user_name,
                            user_email: user_email,
                            user_status: user_status,
                        },
                    });
                } else {
                    let SQLInsert =
                        "INSERT INTO user (user_ID, user_email, user_status) VALUES (?, ?, ?);";
                    try {
                        await conn.execute(
                            SQLInsert,
                            [id, email, "wait verify"],
                            (err, result) => {
                                if (err) {
                                    res.status(500).json({ message: err.message });
                                    return;
                                }
                                res.status(201).json({
                                    status: 201,
                                    message: "created account.",
                                    response: {
                                        user_ID: id,
                                        user_name: "",
                                        user_email: email,
                                        user_status: "wait verify",
                                    },
                                });
                            }
                        );
                    } catch (err) {
                        res.status(500).json({ message: err.message });
                    }
                }
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put("/auth/register", async (req, res) => {
    const { id, name, birthday, gender } = req.body;

    try {
        let SQL = `UPDATE user SET user_name = ?, user_gender = ?, user_birthday = ?, user_status = ? WHERE user_ID = ${id}`;

        conn.execute(SQL, [name, gender, birthday, "verified"], (err, result) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: err.message,
                });
            }

            if (result.affectedRows === 0) {
                res.status(404).json({ status: 500, message: "No rows updated" });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Data updated successfully",
                });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const puppeteer = require('puppeteer')

async function scrape() {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
 
    await page.goto('https://www.scholarship.in.th/category/language-tips/page/1');
 
    // ดึงจำนวน <article> จากหน้า
    const content_number = await page.evaluate(() => {
        const articles = document.querySelectorAll("#site-inner > main > div > div:nth-child(2) > div > div > div > div > article");
        return articles.length; // คืนค่าจำนวนแท็ก <article>
    });
 
    let arr_news = []; // อาร์เรย์เก็บข้อมูลข่าว
 
    // ลูปเพื่อดึงข้อมูลจากแต่ละ <article>
    for (let i = 0; i < content_number; i++) {
        const content = await page.evaluate((index) => {
            const articles = document.querySelectorAll("#site-inner > main > div > div:nth-child(2) > div > div > div > div > article");
            const article = articles[index]; // เลือกแท็ก <article> ตาม index
 
            if (article) {
                return {
                    index: index,
                    title: article.querySelector('h2') ? article.querySelector('h2').innerText : 'No title',
                    image: article.querySelector('img') ? article.querySelector('img').src : 'No image',
                    author: article.querySelector('div.author') ? article.querySelector('div.author').innerText : 'No author',
                    date: article.querySelector('div.date') ? article.querySelector('div.date').innerText : 'No date',
                    link: article.querySelector('a') ? article.querySelector('a').href : 'No link'
                };
            } else {
                return { index: index, message: 'Article not found' };
            }
        }, i); // ส่ง index ให้กับ evaluate
 
        arr_news.push(content); // เก็บข้อมูลที่ได้จากแต่ละ article
    }
 
    console.log(arr_news); // แสดงผลข้อมูลที่ดึงมา
    await browser.close();
 
    return arr_news; // คืนค่าข้อมูลทั้งหมด
 }
async function scrape_News() {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
 
    await page.goto('https://www.scholarship.in.th/');
 
    // ดึงจำนวน <article> จากหน้า
    const content_number = await page.evaluate(() => {
        const articles = document.querySelectorAll(`#site-inner > main > div > div > div.elementor-element.elementor-element-78816c9a.e-flex.e-con-boxed.e-con.e-parent > div > div > div > div.elementor-element.elementor-element-46001d6a.elementor-widget.rivax-post-modern-widget > div > div > div.rivax-posts-wrapper.layout-grid > div   > article`);
        return articles.length; // คืนค่าจำนวนแท็ก <article>
    });
 
    let arr_news = []; // อาร์เรย์เก็บข้อมูลข่าว
 
    // ลูปเพื่อดึงข้อมูลจากแต่ละ <article>
    for (let i = 0; i < content_number; i++) {
        const content = await page.evaluate((index) => {
            const articles = document.querySelectorAll(`#site-inner > main > div > div > div.elementor-element.elementor-element-78816c9a.e-flex.e-con-boxed.e-con.e-parent > div > div > div > div.elementor-element.elementor-element-46001d6a.elementor-widget.rivax-post-modern-widget > div > div > div.rivax-posts-wrapper.layout-grid > div > article`);
            const article = articles[index]; // เลือกแท็ก <article> ตาม index
 
            if (article) {
                return {
                    index: index,
                    title: article.querySelector('.title > a') ? article.querySelector('.title > a').innerText : 'No title',
                    image: article.querySelector('img') ? article.querySelector('img').src : 'No image',
                    author: article.querySelector('.author-meta') ? article.querySelector('.author-meta').innerText : 'author',
                    date: article.querySelector('.date') ? article.querySelector('.date').innerText : 'yyyy/mm/dd',
                    link: article.querySelector('a') ? article.querySelector('a').href : 'No link'
                };
            } else {
                return { index: index, message: 'Article not found' };
            }
        }, i); // ส่ง index ให้กับ evaluate
 
        arr_news.push(content); // เก็บข้อมูลที่ได้จากแต่ละ article
    }
 
    console.log(arr_news); // แสดงผลข้อมูลที่ดึงมา
    await browser.close();
 
    return arr_news; // คืนค่าข้อมูลทั้งหมด
 }
 

app.get("/newsAndBlog/scraping/ScholarShip", async (req, res) => {
    try {
        const news = await scrape_News(); // เรียก scrape และรอผลลัพธ์
        const Blog = await scrape(); // เรียก scrape และรอผลลัพธ์
        res.status(200).json({website_name:'ScholarShip', website_url:'https://www.scholarship.in.th/' ,result:{news, Blog}}); // ส่งผลลัพธ์กลับ
    } catch (error) {
        console.error("Error scraping:", error);
        res.status(500).json({ success: false, error: error.message }); // ส่งข้อผิดพลาด
    }
});

// ---------------------------------------------------------------------------

app.use('/content', content);
app.use('/lessons', lessons);
app.use('/reward', reward);
app.use('/user', user);
app.use('/quiz', quiz);
app.use('/mission', mission);




// admin API

/* account admin */
app.post("/api/admin/account/create", async (req, res) => {
    const { username, password, role } = req.body;
    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSaltSync(saltRounds);
        const passHash = await bcrypt.hash(password, salt);
        let SQL =
            "INSERT INTO `admin`( `ad_username`, `ad_password`, `ad_role`, `ad_status`) VALUES (?, ?, ?, ?)";

        conn.execute(
            SQL,
            [username, passHash, role, "wait verify"],
            async (err, result) => {
                if (err) {
                    res.status(500).json({ error });
                }

                res.status(201).json({
                    status: 201,
                    data: {
                        username: username,
                        password: passHash,
                        status: "wait verify",
                    },
                });
            }
        );
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.post("/api/admin/account/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        let SQL = "SELECT * FROM `admin` WHERE  `ad_username` = ?";

        conn.execute(SQL, [username], async (err, result) => {
            if (err) {
                res.status(500).json({ err });
            }

            if (result.length === 1) {
                let { ad_ID, ad_username, ad_password, ad_role } = result[0];
                let checkPassword = await bcrypt.compare(password, ad_password);
                if (checkPassword) {
                    res.status(200).json({
                        ad_ID: ad_ID,
                        username: ad_username,
                        ad_role: ad_role,
                    });
                } else {
                    res.status(200).json({
                        message: "password incorrect",
                    });
                }
            } else {
                res.status(200).json({
                    message: "username incorrect",
                });
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete("/api/admin/account/del", async (req, res) => {
    const { id } = req.body;
    conn.execute(
        "DELETE FROM `admin` WHERE `ad_ID` = ? ",
        [id],
        async (err, result) => {
            if (err) {
                res.status(500).json(err.message);
            }

            res.status(200).json({
                status: 200,
                message: `admin[${id}] is deleted.`,
            });
        }
    );
});










app.get("/rank", async (req, res) => {
    const user_name = req.query.user_name;  // ใช้ query string เพื่อดึงชื่อผู้ใช้
    
    let sql = `WITH RankedUsers AS (
                    SELECT 
                        coin_balance, 
                        xp, 
                        user_name, 
                        user_ID, 
                        RANK() OVER (ORDER BY xp DESC) AS rank 
                    FROM user 
                    WHERE user_status = 'verified'
                )
                SELECT * 
                FROM RankedUsers 
                WHERE rank <= 10 OR user_name = ? 
                ORDER BY rank;`;

    conn.query(sql, [user_name], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }

        // แยกข้อมูลระหว่างผู้ใช้เอง (userRank) กับ อันดับที่เหลือ (topRanks)
        let userRank = result.find(item => item.user_name === user_name);
        let topRanks = result.filter(item => item.user_name !== user_name).slice(0, 10);

        res.status(200).json({
            userRank: userRank,
            topRanks: topRanks
        });
    });
});


// -----------------------------------------------------------------------------
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


app.get('/test/pagi', async (req, res) => {
    const {page} = req.query

    let ItemNum = 10
    let dataLen = 58


    let pagin =  Math.ceil(dataLen/ItemNum)

    let firstItem = page === 1 ? 1 :  (page - 1) * ItemNum + 1 ;
    let offset   =  ItemNum * page >= dataLen ? dataLen : ItemNum * page ;
    // let offset   =  ItemNum * page >= dataLen ? dataLen : ItemNum * page ;

    res.status(200).json({pagin, ItemNum, dataLen, firstItem, offset})
})