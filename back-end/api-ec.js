// require package


const mysql = require('mysql2');
const axios = require('axios');
const cors = require("cors");
const bodyParser = require('body-parser')
const path = require('path');
const express = require("express");
const fs = require('fs');
const multer = require('multer');

const conn = require('./conn.js')

const content = require('./content/script.js')
const login = require('./login/script.js')


// create instance

const app = express();

app.use(cors());


// middleware

app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({extended: true}));

// public folder path

const public = path.join(__dirname, 'public');

app.use('/api', express.static(public));
/*---------------------------------------------------------------------------------------------------*/
app.use('/api/content/', content);

app.use('/api/login/', login);

/*---------------------------------------------------------------------------------------------------*/

//google

const YOUR_CLIENT_ID = '48950314663-70khk95jdcj6tq31a0f4h1ss51keovbl.apps.googleusercontent.com'
const YOUR_CLIENT_SECRET = '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'
const YOUR_REDIRECT_URL = 'https://api-ecproject.poommer.in.th/api/auth/google/callback'

app.get('/api/auth/google', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URL}&response_type=code&scope=profile email`;
    res.redirect(url);
});
app.get('/api/auth/google/callback', async (req, res) => {
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
       const { data: profileData } = await axios.get(`https://api-ecproject.poommer.in.th/api/auth/google/checkEmail?email=${profile.email}&id=${profile.id}`)

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


app.get('/api/auth/google/checkEmail', async (req, res) => {
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


app.put('/api/auth/register', async (req, res) => {
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

/*-----------------------------------------------------------------------------------------*/



/*-----------------------------------------------------------------------------------------*/
app.get('/api/test', async (req, res) => {
window.location = '../'
})


app.listen(80, () => {

    console.log(`server run on port: 80`);

});