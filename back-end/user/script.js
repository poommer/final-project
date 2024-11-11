const express = require("express");
const axios = require('axios');
const moment = require('moment-timezone')

const router = express.Router();
const conn = require('../conn') // นำเข้าการเชื่อมต่อจากไฟล์ server.js

const YOUR_CLIENT_ID = '48950314663-70khk95jdcj6tq31a0f4h1ss51keovbl.apps.googleusercontent.com'
const YOUR_CLIENT_SECRET = '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'
const YOUR_REDIRECT_URL = 'https://api-ecproject.poommer.in.th/api/user/auth/google/callback'

router.get('/auth/google', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URL}&response_type=code&scope=profile email`;
    res.redirect(url);
});

router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
	try {
		const { data } = await axios.post('https://oauth2.googleapis.com/token', {
			client_id: YOUR_CLIENT_ID,
			client_secret: YOUR_CLIENT_SECRET,
			code,
			redirect_uri: YOUR_REDIRECT_URL,
			grant_type: 'authorization_code',
		});
		const { access_token, id_token } = data;
		const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
			headers: { Authorization: `Bearer ${access_token}` }
		});
   // res.status(200).json(profile);
       const { data: profileData } = await axios.get(`https://api-ecproject.poommer.in.th/api/user/auth/google/checkEmail?email=${profile.email}&id=${profile.id}`)

        try {
             // แปลงข้อมูลเป็น query string
                const params = new URLSearchParams()
                params.append('status',profileData.status)
                params.append('response',JSON.stringify(profileData.response))
                params.append('message',profileData.message)

                const queryString = params.toString();

                // ทำการ redirect พร้อมกับ query parameters
                res.redirect(`https://final-project-pooms-projects.vercel.app/api?${queryString}`);
          } catch (error) {
                res.redirect('https://final-project-pooms-projects.vercel.app')
          }

    
        //res.redirect(`/api/`);
    } catch(err) {
        res.redirect(`https://final-project-pooms-projects.vercel.app/api?${queryString}`);
    }
});

// ----------------------------------


router.get('/auth/google/checkEmail', async (req, res) => {
    let email = req.query.email;
    let id = req.query.id;
    let SQL = 'SELECT user_ID, user_name, user_gender, user_birthday, user_email,  coin_balance, xp, user_rank, user_status FROM user WHERE user_email = ?'
    try {
        await conn.execute(SQL, [email],
            async (err, result) => {
                try {

                    if (result.length === 1) {
                        let { user_ID, user_name, user_email, user_status  } = result[0]
                        res.status(200).json({
                            status: 200,
                            message: 'User found.',
                            response: {
                                user_ID: user_ID,
                                user_name: user_name,
                                user_email:user_email,
                                user_status:user_status
                            }
                        });
                    } else {
                        //let insertQuery = 'INSERT INTO user (user_ID, user_email, user_status) VALUES (?, ?, ?)';
                        try {
                            await conn.execute('INSERT INTO user (user_ID, user_email, user_status) VALUES (?, ?, ?)', [id, email, 'wait verify'], (err_insert, result_insert) => {
                                if (err_insert) {
                                    res.status(500).json({ message: err.message });
                                    return
                                }
                                res.status(201).json({
                            status: 201,
                            message: 'created account.',
                            response: {
                                user_ID: id,
                                user_name: '',
                                user_email:email,
                                user_status:'wait verify'
                                    }
                                })
                            })
                        } catch (err) { res.status(500).json({ message: err.message }); }
                    }


                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }

        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
)


router.put('/auth/register', async (req, res) => {
    const { id, name, birthday, gender } = req.body

    try {

        let SQL = `UPDATE user SET user_name = ?, user_gender = ?, user_birthday = ?, user_status = ? WHERE user_ID = ${id}`

        conn.execute(SQL, [name, gender,  birthday, 'verified'], (err, result) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                res.status(404).json({status:500, message:'No rows updated'});
              } else {
                res.status(200).json({
                    status:200, 
                    message:'Data updated successfully'
                });
              }


        })
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// ------------------------------------------------------------
const urlAPI = 'https://api-ecproject.poommer.in.th/api'

router.get('/xp/genID/:type', async (req, res) => {
    const {type} = req.params
    // const id = await genID_lesson(type)
    let latestID_SQL = await conn.promise().query("SELECT * FROM xp WHERE XPtrans_type = ? ORDER BY XPtrans_ID DESC LIMIT 1;", [type]);
    let id;
const Datenow = moment().tz('Asia/Bangkok').format('YYYYMMDD')
    if(latestID_SQL[0].length === 1){
        const dateLetest = moment(latestID_SQL[0][0].XPtrans_date).format('YYYYMMDD')
        const latestID = latestID_SQL[0][0].XPtrans_ID

        if(dateLetest === moment().tz('Asia/Bangkok').format('YYYYMMDD')){
            const randomNumber = parseInt(latestID_SQL[0][0].XPtrans_ID.split('-')[2])+1
           id = `${Datenow}-${type}-${randomNumber.toString().padStart(4, "0")}`
        }  

        else{
            id = `${Datenow}-${type}-0001`
        }
    }else{
        id =  `${Datenow}-${type}-0001`
    }

    res.status(200).json({id:id});

})

router.get('/:userID/xp/', async (req, res) => {
    const {userID} = req.params
    const sql = "SELECT xp FROM user WHERE user_ID = ?";
    conn.execute(sql, [userID], (err, result) => {
        if (err) {
            res.status(500).json({status:500, message:err.message});
        }

        res.status(200).json({status:200,result});
    })
})

router.post('/:userID/xp/1', async (req, res) => {
    const {userID} = req.params
    const {amount, description} = req.body
    const sql = "INSERT INTO `xp` (`XPtrans_ID`, `XPtrans_userID`, `XPtrans_type`, `xp_amount`,  `XPtrans_description`) VALUES (?, ?, ?, ?, ?) "
    const response_id = await axios.get(`${urlAPI}/user/xp/genID/1`);
    const id = response_id.data.id

    const response_amountXP = await axios.get(`${urlAPI}/user/${userID}/xp`);
    const amountXP = response_amountXP.data.result[0].xp

    
    conn.execute(sql, [id, userID, 1, amount, description], (err, result) => {
        if (err) {
            res.status(500).json({status:500, message:err.message});
        }
        
        const sqlUpdate = "UPDATE `user` SET `xp`=? WHERE `user_ID`=?" ;
        const xpBalance = parseInt(amountXP) + parseInt(amount)
        conn.execute(sqlUpdate, [xpBalance, userID], (err_update, result_update) => {
            if (err_update) {
                res.status(500).json({status:500, message:err_update.message});
            }
            
        res.status(201).json({status:201, response:{userID, type:'add', amount, xpBalance, description}});
    
    })

    })
})

// ----------------

router.get('/coin/genID/:type', async (req, res) => {
    const {type} = req.params
    // const id = await genID_lesson(type)
    let latestID_SQL = await conn.promise().query("SELECT * FROM coin WHERE coinTrans_type = ? ORDER BY coinTrans_ID DESC LIMIT 1;", [type]);
    let id;
const Datenow = moment().tz('Asia/Bangkok').format('YYYYMMDD')
    if(latestID_SQL[0].length === 1){
        const dateLetest = moment(latestID_SQL[0][0].coinTrans_date)
        const latestID = latestID_SQL[0][0].coinTrans_ID

        if(dateLetest.format('YYYYMMDD') === moment().tz('Asia/Bangkok').format('YYYYMMDD')){
            const randomNumber = parseInt(latestID_SQL[0][0].coinTrans_ID.split('-')[2])+1
           id = `${Datenow}-${type}-${randomNumber.toString().padStart(4, "0")}`
        }  

        else{
            id = `${Datenow}-${type}-0001`
        }
    }else{
        id =  `${Datenow}-${type}-0001`
    }

    res.status(200).json({id:id});

})

router.get('/:userID/coin/', async (req, res) => {
    const {userID} = req.params
    const sql = "SELECT coin_balance FROM user WHERE user_ID = ?";
    conn.execute(sql, [userID], (err, result) => {
        if (err) {
            res.status(500).json({status:500, message:err.message});
        }

        res.status(200).json({status:200,result});
    })
})

router.post('/:userID/coin/1', async (req, res) => {
    const {userID} = req.params
    const {amount, description} = req.body
    const sql = "INSERT INTO `coin` (`coinTrans_ID`, `coinTrans_userID`, `coinTrans_type`, `coin_amount`, `coinTrans_description`) VALUES (?, ?, ?, ?, ?) "
    const response_id = await axios.get(`${urlAPI}/user/coin/genID/1`);
    const id = response_id.data.id

    const response_amount_coin_balance = await axios.get(`${urlAPI}/user/${userID}/coin`);
    const amount_coin_balance = response_amount_coin_balance.data.result[0].coin_balance

    
    conn.execute(sql, [id, userID, 1, amount, description], (err, result) => {
        if (err) {
            res.status(500).json({status:500, message:err.message});
        }
        
        const sqlUpdate = "UPDATE `user` SET `coin_balance`= ? WHERE `user_ID`=?" ;
        const coinBalance = parseInt(amount_coin_balance) + parseInt(amount)
        conn.execute(sqlUpdate, [coinBalance, userID], (err_update, result_update) => {
            if (err_update) {
                res.status(500).json({status:500, message:err_update.message});
            }
            
        res.status(201).json({status:201, response:{userID, type:'add', amount, coinBalance, description}});
    
    })

    })
})
router.post('/:userID/coin/2', async (req, res) => {
    const {userID} = req.params
    const {amount, description} = req.body
    const sql = "INSERT INTO `coin` (`coinTrans_ID`, `coinTrans_userID`, `coinTrans_type`, `coin_amount`, `coinTrans_description`) VALUES (?, ?, ?, ?, ?) "
    const response_id = await axios.get(`${urlAPI}/user/coin/genID/2`);
    const id = response_id.data.id

    const response_amount_coin_balance = await axios.get(`${urlAPI}/user/${userID}/coin`);
    const amount_coin_balance = response_amount_coin_balance.data.result[0].coin_balance

    
    conn.execute(sql, [id, userID, 2, amount, description], (err, result) => {
        if (err) {
            res.status(500).json({status:500, message:err.message});
        }
        
        const sqlUpdate = "UPDATE `user` SET `coin_balance`= ? WHERE `user_ID`=?" ;
        const coinBalance = parseInt(amount_coin_balance) - parseInt(amount)
        conn.execute(sqlUpdate, [coinBalance, userID], (err_update, result_update) => {
            if (err_update) {
                res.status(500).json({status:500, message:err_update.message});
            }
            
        res.status(201).json({status:201, response:{userID, type:'use', amount, coinBalance, description}});
    
    })

    })
})

// ------------------------------------------------------------
router.get("/rank", async (req, res) => {
    const user_ID = req.query.user_ID;  // ใช้ query string เพื่อดึง user_ID
    
    let sql = `WITH RankedUsers AS (
                    SELECT 
                        coin_balance, 
                        xp, 
                        user_name, 
                        user_ID, 
                        ROW_NUMBER() OVER (ORDER BY xp DESC) AS rank 
                    FROM user 
                    WHERE user_status = 'verified'
                )
                SELECT * 
                FROM RankedUsers 
                WHERE rank <= 10 OR user_ID = ? 
                ORDER BY rank;`;

    conn.query(sql, [user_ID], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // แยก userRank กับ topRanks
        let userRank = result.find(item => item.user_ID == user_ID); // หาผู้ใช้ที่ login เข้ามา
        let topRanks = result.filter(item => item.rank <= 10); // เก็บข้อมูลของผู้ใช้ที่ติด 10 อันดับแรก

        // ตรวจสอบว่าผู้ใช้ที่ login ติดใน 10 อันดับแรกหรือไม่
        if (topRanks.find(item => item.user_ID == user_ID)) {
            // ถ้าผู้ใช้ติด 10 อันดับแรก ให้แสดงเฉพาะ topRanks
            res.status(200).json({
                topRanks: topRanks
            });
        } else {
            // ถ้าผู้ใช้ไม่ได้ติด 10 อันดับแรก ให้แสดง topRanks และ userRank
            res.status(200).json({
                topRanks: topRanks,
                userRank: userRank
            });
        }
    });
});


// ------------------------------------------------------------
router.post('/:userID/statistic', async (req, res) => {
    try{
        const {userID} = req.params
        const { skill  } = req.body;
        const {Reading, Listening, Speaking, Writing, vocab, grammar } = skill[0]
        const data = [
            userID,
            Listening.full,      // skill_ListeningFull
            Listening.received,  // skill_ListeningReceived
            Speaking.full,       // skill_speakingFull
            Speaking.received,   // skill_speakingReceived
            Reading.full,        // skill_readingFull
            Reading.received,    // skill_readingReceived
            Writing.full,        // skill_writingFull
            Writing.received,    // skill_writingReceived
            vocab.received,      // Vocab_Recognition
            vocab.full,      // Vocab_Recognition
            vocab.vocab_learning, // Vocab_learning
            grammar.received,     // grammar_Received
            grammar.full     // grammar_Received
        ];

        /*
        5 = (a/100)*10
        (5*100)/10 = a
50a
        */
        
        const sql = "INSERT INTO `statistic_skill` ( `skill_username`, `skill_lesson`, `skill_ListeningFull`, `skill_ListeningReceived`, `skill_speakingFull`, `skill_speakingReceived`, `skill_readingFull`, `skill_readingReceived`, `skill_writingFull`, `skill_writingReceived`, `Vocab_Recognition`, `vocab_full`, `Vocab_learning`, `grammar_Received`, `grammar_full`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        conn.execute(sql,data, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({status:201,result:{Reading, Listening, Speaking, Writing, vocab, grammar}})
        })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
})

router.get('/:userID/statistic', async (req, res) => {
    try{
    const {userID} = req.params
    sql = `
    SELECT
COUNT(skill_id) AS attended,
    ( SUM(skill_ListeningReceived)*100) / SUM(skill_ListeningFull) AS listening,
    ( SUM(skill_speakingReceived)*100) / SUM(skill_speakingFull) AS speaking,
    ( SUM(skill_readingReceived)*100) / SUM(skill_readingFull) AS reading,
    ( SUM(skill_writingReceived)*100) / SUM(skill_writingFull) AS writing,
    ( SUM(Vocab_Recognition)*100) / SUM(vocab_full) AS vocab,
    ( SUM(grammar_Received)*100) / SUM(grammar_full) AS grammar
FROM
    statistic_skill
INNER JOIN user ON user.user_ID = statistic_skill.skill_username  AND statistic_skill.skill_username = ?;
    `
    conn.execute(sql,[userID], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({status:200,result})
    })
} catch (err) {
    res.status(500).json({ status: 500, message: err.message });
}

})
// ------------------------------------------------------------
router.get('/profile/:userID',async (req, res) => {
    try{
        const {userID} = req.params
        const sql = "SELECT * FROM `user` WHERE `user_ID` = ?";

        conn.execute(sql,[userID], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
    
            res.status(200).json({status:200,result})
        })

    } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
}
})

router.get('/profile/:userID/show',async (req, res) => {
    try{
        const {userID} = req.params
        const response_profile = await axios.get(`${urlAPI}/user/profile/${userID}`);
        const profile = response_profile.data.result[0]
    const sql = "SELECT `lesson_title`,`lesson_level`,`unit_No`,lesHit_status FROM `lessons` INNER JOIN `lesson_history` ON `lesson_history`.`lesHit_lesID` = `lessons`.`lesson_ID` AND `lesson_history`.`lesHit_UserID` = ? WHERE lesHit_status = 0;";
    conn.execute(sql,[userID], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const data = result[0];

            let lesson = 'lesson '+data.unit_No
            let lesson_percen = (data.lesson_level - 1) * 25
            // --------------------------------------------


            let total = 44
            let lessonsCompleted = ((data.unit_No - 1) * 4) + (data.lesson_level - 1)

            let learning_percen = (lessonsCompleted/total) * 100
    
            res.status(200).json({status:200,result:{profile,progress:{lesson,lesson_percen, learning_percen}}})
        })
} catch (err) {
    res.status(500).json({ status: 500, message: err.message });
}


})
// ------------------------------------------------------------
router.get('/',async (req, res) => {
    res.send('connected the login.')
})

module.exports = router;