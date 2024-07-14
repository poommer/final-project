const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const axios = require('axios');
const { error } = require('console');
const cors = require("cors");

const app = express()
const port = 3000
app.use(cors());
app.use(express.json());


const YOUR_CLIENT_ID = '48950314663-6bmeog4bo4p8ke8p35q28kpv1irer6tm.apps.googleusercontent.com'
const YOUR_CLIENT_SECRET = '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'
const YOUR_REDIRECT_URL = 'http://localhost:3000/auth/google/callback'

const conn = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'ecproject'
})

if (conn) { console.log('connected!'); }


app.get('/auth/google', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URL}&response_type=code&scope=profile email`;
    res.redirect(url);
});
app.get('/auth/google/callback', async (req, res) => {
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
    console.log(profile);
        const { data: profileData } = await axios.get(`http://localhost:3000/auth/google/checkEmail?email=${profile.email}&id=${profile.id}`)

        try {
             // แปลงข้อมูลเป็น query string
                const params = new URLSearchParams()
                params.append('status',profileData.status)
                params.append('response',JSON.stringify(profileData.response))
                params.append('message',profileData.message)

                const queryString = params.toString();

                // ทำการ redirect พร้อมกับ query parameters
                res.redirect(`http://localhost:5173/api?${queryString}`);
          } catch (error) {
                res.redirect('http://localhost:5173')
          }

    
        // res.redirect(`/auth/google/checkEmail?email=${profile.email}&id=${profile.id}`);
    } catch(err) {
        res.redirect('/auth/google')
    }
});


app.get('/auth/google/checkEmail', async (req, res) => {
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
                        let SQLInsert = 'INSERT INTO user (user_ID, user_email, user_status) VALUES (?, ?, ?);';
                        try {
                            await conn.execute(SQLInsert, [id, email, 'wait verify'], (err, result) => {
                                if (err) {
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


app.put('/auth/register', async (req, res) => {
    const { id, name, birthday, gender, updateStatus } = req.body

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
                let { user_ID, user_name, user_email, user_status  } = result[0]
                res.status(200).json({
                    status:200, 
                    message:'Data updated successfully',
                    response: {
                        user_ID: user_ID,
                        user_name: user_name,
                        user_email:user_email,
                        user_status:user_status
                    }
                });
              }


        })
    }

    catch (err) {
        res.status(500).json({ message: err.message });
    }
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})