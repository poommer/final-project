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

const conn = mysql.createConnection({
    user: "root",
    password: "",
    database: "ecproject",
});

if (conn) {
    console.log("connected!");
}

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
// admin API

/* account admin */
app.post("/api/admin/account/register", async (req, res) => {
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



app.get("/api/admin/account/login", async (req, res) => {
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
/* --- end --- */

/* word list */
app.get("/api/word-list/read/", async (req, res) => {
    try {
        conn.execute("SELECT * FROM `wordlist` ORDER BY `wordlist`.`wl_id` DESC;", async (err, result) =>{
            if(err){err.message}
            res.status(200).json(result);
        });

        
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get("/api/word-list/read/:id", async (req, res) => {
    try {
        let id = req.params.id
        conn.execute("SELECT * FROM `wordlist` WHERE `wordlist`.`wl_id` = ?;", [id], async (err, result) =>{
            if(err){err.message}
            res.status(200).json(result);
        });
        
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.delete("/api/word-list/delete/:id", async (req, res) => {
    try {
        let id = req.params.id
        conn.execute("DELETE FROM `wordlist` WHERE `wordlist`.`wl_id` = ?;", [id], async (err, result) =>{
            if(err){err.message}
            res.status(200).json({
                status: 200,
                message: `deleted.`,
            });
        });
        
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.post("/api/word-list/create", async (req, res) => {
    try {
        const { name, description } = req.body;
        let latestID_SQL = await conn.promise().query("SELECT * FROM `wordlist` ORDER BY `wordlist`.`wl_id` DESC LIMIT 1;");
        let genID = `wl${(parseInt(latestID_SQL[0][0].wl_id.slice(2)) + 1).toString().padStart(3, "0")}`;
        let sql = "INSERT INTO `wordlist` (`wl_id`, `wl_name`, `wl_description`) VALUES (?, ?, ?)";
        conn.execute(sql, [genID, name, description], (err, result) => {
            if (err) {
                res.status(500).json(err.message);
            }

            res.status(200).json({
                status:200,
                message:'word list created!',
                response:{name, description}
            });
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

/* --- end --- */


app.get("/api/pos/read/", async (req, res) => {
    try {
        conn.execute("SELECT * FROM `partofspeech`;", async (err, result) =>{
            if(err){err.message}
            res.status(200).json(result);
        });

        
    } catch (err) {
        res.status(500).json(err.message);
    }
});

/* vocab */
async function genID_vocab (word_List) {
    let latestID_SQL = await conn.promise().query("SELECT * FROM vocab WHERE word_cate = ? ORDER BY vocab_ID DESC LIMIT 1;", [word_List]);
    return `${word_List}-${latestID_SQL[0].length === 1 ? (parseInt(latestID_SQL[0][0].vocab_ID.slice('6'))+1).toString().padStart(4, "0") :'1'.padStart(4, "0")}` ;
        
}

// ตั้งค่า storage สำหรับเสียง
const storage_sound = multer.diskStorage({
    destination: function (req, file, cb) {
        const word_List = req.query.wl;
        const uploadPath = path.join(__dirname, 'uploads/sound', word_List);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const word_en = req.query.we;
        cb(null, word_en + path.extname(file.originalname));
    }
});

const storage_image = multer.diskStorage({
    destination: function (req, file, cb) {
        const word_List = req.query.wl;
        const uploadPath = path.join(__dirname, 'uploads/image', word_List);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const word_en = req.query.we;
        cb(null, word_en + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            
            
            const word_List = req.query.wl;
            let uploadPath;

            if (file.fieldname === 'file_sound') {
                uploadPath = path.join(__dirname, 'uploads/sound', word_List);
            } else if (file.fieldname === 'file_image') {
                uploadPath = path.join(__dirname, 'uploads/image', word_List);
            }

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const word_en = req.query.we;
            cb(null, word_en + path.extname(file.originalname));
        }
    })
}).fields([
    { name: 'file_sound', maxCount: 1 },
    { name: 'file_image', maxCount: 1 }
]);



app.post("/api/vocab/create", upload, async (req, res) => {
    try {
        const { word_en, word_th, pos, word_List} = req.body;
        const file_sound = req.files['file_sound'] ? req.files['file_sound'][0] : null;
        const file_image = req.files['file_image'] ? req.files['file_image'][0] : null;
        const genID = await genID_vocab(word_List);

        console.log( { word_en, word_th, pos, word_List});
        

        let sql = "INSERT INTO vocab (vocab_ID, word_en, word_th, pos, word_cate) VALUES (?, ?, ?, ?, ?)";
        conn.execute(sql, [genID, word_en, word_th, pos, word_List], (err, result) => {
            if (err) {
                res.status(500).json(err.message);
            }

            res.status(200).json({
                status:200,
                message:'word list created!',
                response:{
                    word_en,
                    word_th,
                    pos,
                    word_List
                }
            });

        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});



app.get("/api/vocab/wordlist/:wordlist", async (req, res) => {
    try{
        const {wordlist} = req.params
        conn.execute(`SELECT * FROM vocab WHERE word_cate = ? `, [wordlist], (err, result) => {
            if(err){res.status(500).json({message:err.message})}

            res.status(200).json(result)
            

        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

app.get("/api/vocab/wordlist", async (req, res) => {
    try{
        const {wordlist} = req.params
        conn.execute("SELECT `vocab_ID`, `word_en`, `word_th`, `wl_name`, `pos_name` FROM `vocab` JOIN `wordlist` ON `vocab`.word_cate = `wordlist`.`wl_id` JOIN `partofspeech` ON `vocab`.pos = `partofspeech`.`pos_id`; ", (err, result) => {
            if(err){res.status(500).json({message:err.message})}

            res.status(200).json(result)
            

        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

app.patch("/api/vocab/edit/:id", async (req, res) => {
    try{
        const {id, word_en, word_th, pos, word_List } = req.body
    let sql = "";
}catch(err){
    res.status(500).json(err.message)
}
})





/* --- end --- */


app.get("/api/user/rank",  async (req, res) => {
    let sql = "SELECT coin_balance, xp, user_name, user_ID FROM `user` WHERE `user`.`user_status` = 'verified' ORDER BY `user`.`xp` DESC;"

    conn.query(sql,(err,result)=>{
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
