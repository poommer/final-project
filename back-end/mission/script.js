const express = require("express");
const path = require("path");
const multer = require('multer');
const fs = require('fs');
const axios = require("axios");

const moment = require('moment-timezone')

// const wordList = require('./vocab/script')
const router = express.Router();
const conn = require('../conn'); // นำเข้าการเชื่อมต่อจากไฟล์ server.js

const URL = 'https://api-ecproject.poommer.in.th/api'
// ------------------------------------------------------------
router.get('/genID', (req, res) => {
    const sql = "SELECT `mis_id` FROM `mission` ORDER BY `mis_id` DESC LIMIT 1;"
    conn.execute(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const randomNumber = parseInt(result[0].mis_id)+1
        id = `${randomNumber.toString().padStart(4, "0")}`
        res.status(200).json(id)
    })

})

router.get('/getWord', (req, res) => {
    const sql = "SELECT * FROM `vocab` WHERE LENGTH(`word_en`) = 5 ORDER BY RAND() LIMIT 1;"
    conn.execute(sql,(err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })

})

router.post('/getWord', async (req, res) => {
    const response_id = await axios.get(`${URL}/mission/genID`)
    const id = response_id.data
    const response = await axios.get(`${URL}/mission/getWord`)
    const word = response.data[0].word_en
    const sql = "INSERT INTO `mission`(`mis_id`, `mis_word`, mis_forDate) VALUES (?,?,?)"
    conn.execute(sql, [id, word, moment().tz('Asia/Bangkok').format('YYYY/MM/DD')], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({id, word, for_daate:moment().tz('Asia/Bangkok').format('YYYY/MM/DD') })
    })

})

router.get('/today', (req, res) => {
    const sql = "SELECT * FROM `mission` WHERE mis_forDate = ?"
    conn.execute(sql, [moment().tz('Asia/Bangkok').format('YYYY/MM/DD')], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })

})

router.get('/all', (req, res) => {
    const sql = "SELECT * FROM `mission`"
    conn.execute(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result)
    })

})

router.put('/view', async (req, res) => {
    const sql = "UPDATE `mission` SET `mis_view` =  `mis_view` + 1 WHERE `mis_forDate` = ?;"
    conn.execute(sql, [moment().tz('Asia/Bangkok').format('YYYY/MM/DD')], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({status:200, massage:'updated!'})
    })

})

// ------------------------------------------------------------
router.post('/:user/play', async (req, res) => {
    const {user } = req.params
    const {Ans, round, xp, coin, status_mission} = req.body
    const missionToday = await axios.get(`${URL}/mission/today`)
    let mission = missionToday.data[0].mis_id
    const sql = "INSERT INTO `mission_play`(`misPlay_user`, `misPlay_misID`, `misPlay_Ans`, `misPlay_round`, `misPlay_xp`, `misPlay_coin`, `misPlay_fordate`, `misPlay_status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    conn.execute(sql, [user,mission, Ans, round, xp, coin, moment().tz('Asia/Bangkok').format('YYYY/MM/DD'), status_mission], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({user,mission, Ans, round, xp, coin, fordate:moment().tz('Asia/Bangkok').format('YYYY/MM/DD'), status_mission})
    })

})

router.patch('/:user/:fordate/play', async (req, res) => {
    const {user,fordate } = req.params
    const {Ans, round, xp, coin, status_mission} = req.body
    let dateConvert = moment(fordate).tz('Asia/Bangkok').format('YYYY/MM/DD')
    const sql = "UPDATE `mission_play` SET `misPlay_Ans` = ?, `misPlay_round` = ?, `misPlay_xp` = ?, `misPlay_coin` = ?, `misPlay_status` = ? WHERE `misPlay_fordate` = ? AND `misPlay_user` = ?" 
    conn.execute(sql, [Ans, round, xp, coin, status_mission, dateConvert, user], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({Ans, round, xp, coin, status_mission, for_date:dateConvert, user})
    })

})

router.get('/:user/:fordate/play', async (req, res) => {
    const {user,fordate } = req.params
    let dateConvert = moment(fordate).tz('Asia/Bangkok').format('YYYY/MM/DD')
    const sql = "SELECT * FROM `mission_play` WHERE `misPlay_fordate` = ? AND `misPlay_user` = ?" 
    conn.execute(sql, [dateConvert, user], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if(result.length < 1){
            res.status(200).json({status_create:false})
        }else{
            res.status(200).json({status_create:true, result})
        }
    })
})

// ------------------------------------------------------------
router.get('/:user/history', async (req, res) => {
    const {user } = req.params
    const sql = "SELECT * FROM `mission_play` WHERE `misPlay_user` = ?" 
    conn.execute(sql, [user], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
     
            res.status(200).json({status_create:true, result})
        
    })
})


// ------------------------------------------------------------
router.get('/', (req, res) => {
    res.send('connected!')
})

module.exports = router;