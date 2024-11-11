const express = require("express");
const path = require("path");
const multer = require('multer');
const fs = require('fs');
const axios = require("axios");

const moment = require('moment-timezone')

// const wordList = require('./vocab/script')
const router = express.Router();
const conn = require('../conn'); // นำเข้าการเชื่อมต่อจากไฟล์ server.js

const urlAPI = 'http://localhost:3000'

router.get('/xp/genID/:type', async (req, res) => {
    const {type} = req.params
    // const id = await genID_lesson(type)
    let latestID_SQL = await conn.promise().query("SELECT * FROM xp WHERE XPtrans_type = ? ORDER BY XPtrans_ID DESC LIMIT 1;", [type]);
    let id;
const Datenow = moment().tz('Asia/Bangkok').format('YYYYDDMM')
    if(latestID_SQL[0].length === 1){
        const dateLetest = moment(latestID_SQL[0][0].XPtrans_date)
        const latestID = latestID_SQL[0][0].XPtrans_ID

        if(dateLetest.format('YYYYDDMM') === moment().tz('Asia/Bangkok').format('YYYYDDMM')){
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
const Datenow = moment().tz('Asia/Bangkok').format('YYYYDDMM')
    if(latestID_SQL[0].length === 1){
        const dateLetest = moment(latestID_SQL[0][0].XPtrans_date)
        const latestID = latestID_SQL[0][0].XPtrans_ID

        if(dateLetest.format('YYYYDDMM') === moment().tz('Asia/Bangkok').format('YYYYDDMM')){
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

router.get('/', (req, res) => {
    res.send('connected!')
})

module.exports = router;