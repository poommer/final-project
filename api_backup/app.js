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
const user = require('./user/script.js') 
const lessons = require('./lessons/script.js') 
const quiz = require('./quiz/script.js') 
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
app.use('/api/user/', user);
app.use('/api/lessons/', lessons);
app.use('/api/quiz/', quiz);

/*-----------------------------------------------------------------------------------------*/
app.get('/api/test', async (req, res) => {
window.location = '../'
})


app.listen(80, () => {

    console.log(`server run on port: 80`);

});