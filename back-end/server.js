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

// ---------------------------------------------------------------------------

app.use('/content', content);
app.use('/lessons', lessons);




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










app.get("/api/user/rank",  async (req, res) => {
    let sql = `WITH RankedUsers AS (SELECT coin_balance, xp, user_name, user_ID RANK() OVER (ORDER BY xp DESC) AS rank FROM user WHERE user_status = 'verified')
SELECT * FROM RankedUsers WHERE rank <= 10 OR user_name = ? ORDER BY rank LIMIT 11;`

    conn.query(sql,[],(err,result)=>{
        if(err){
            res.status(500).json(err.message)
        }

        res.status(200).json(result)
    })
})


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