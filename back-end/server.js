const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const axios = require('axios');

const app = express()
const port = 3000

const YOUR_CLIENT_ID = '48950314663-rdl0gt9ah525so4akpkqhsl3bft1k0fe.apps.googleusercontent.com'
const YOUR_CLIENT_SECRET = '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'
const YOUR_REDIRECT_URL = 'http://localhost:3000/auth/google/callback'

const conn = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'ecproject'
})

if(conn){console.log('connected!');}


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
			headers: { Authorization: `Bearer ${access_token}` },
		});
    console.log(profile);
	  res.redirect('/auth/checkDatabase');
	}catch{
	  res.redirect('/');
	}
});


app.get('/auth/checkDatabase',async (req, res) => {
    res.send('checkDatabase')
})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})