const express = require("express");
const axios = require('axios');
const moment = require('moment-timezone')

const router = express.Router();
const conn = require('../conn') // นำเข้าการเชื่อมต่อจากไฟล์ server.js

// ------------------------------------------------------------
router.post('/title', async (req,res)=>{
    try{
        const {name, type, QTY, timer, health,image_url} = req.body
        const sql = "INSERT INTO `quiz`(`quiz_name`, `quiz_type`, `quiz_qty`, `quiz_timer`, `quiz_Health`,image_url) VALUES (?,?,?,?,?,?)";
        conn.execute(sql,[name, type, QTY, timer, health,image_url],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({status:201,result:{name, type, QTY, timer, health}})
        })
    
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})

router.put('/:id/title', async (req,res)=>{
    try{
        const {id} = req.params
        const {name, type, QTY, timer, health} = req.body
        const sql = "UPDATE `quiz` SET `quiz_name` = ?, `quiz_type` = ?, `quiz_qty` = ?, `quiz_timer` = ?, `quiz_Health` = ? WHERE `quiz_id` = ? " ;
        conn.execute(sql,[name, type, QTY, timer, health, id],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({status:200,result:{name, type, QTY, timer, health}})
        })
    
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})

router.put('/:id/played', async (req,res)=>{
    try{
        const {id} = req.params
        const sql = "UPDATE `quiz` SET `quiz_palyed`= `quiz_palyed` + 1 WHERE `quiz_id` = ? " ;
        conn.execute(sql,[id],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({status:200,result:"added"})
        })
    
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})

router.delete('/:id/', async (req,res)=>{
    try{
        const {id} = req.params
        const sql = "DELETE FROM `quiz` WHERE `quiz_id` = ? " ;
        conn.execute(sql,[id],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({status:200,result:"deleted"})
        })
    
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})

router.get('/title/', async (req,res)=>{
    try{
        const sql = "SELECT * FROM `quiz`" ;
        conn.execute(sql,(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({status:200,result})
        })
    
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})

router.get('/:id/title', async (req,res)=>{
    try{
        const {id} = req.params
        const sql = "SELECT * FROM `quiz` WHERE quiz_id = ?" ;
        conn.execute(sql, [id],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({status:200,result})
        })
    
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})
// ------------------------------------------------------------
router.post('/:id/content', async (req,res)=>{
    try{
        const {id} = req.params
        const {wordID} = req.body
        const sql = "INSERT INTO `quiz_content`( `Qcontent_quizID`, `Qcontent_value`) VALUES (?,?)"
        conn.execute(sql,[id,wordID],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({status:201,result:{id,wordID}})
        })
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})

router.delete('/:id/content/:wordID', async (req,res)=>{
    try{
        const {wordID} = req.params
        const sql = "DELETE FROM `quiz_content`WHERE Qcontent_id = ?"
        conn.execute(sql,[wordID],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({status:200,result:'deleted'})
        })
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})

router.get('/:id/', async (req, res) => {
    try {
        const { id } = req.params;
        
        // ดึงข้อมูลจาก API
        const quizDataResponse = await axios.get(`https://api-ecproject.poommer.in.th/api/quiz/${id}/title`);
        const quizData = quizDataResponse.data.result;

        const sql = `
            SELECT vocab_ID, word_en, word_th, status_image
            FROM vocab
            INNER JOIN quiz_content 
                ON quiz_content.Qcontent_value = vocab.vocab_ID 
                AND quiz_content.Qcontent_quizID = ?;
        `;

        conn.execute(sql, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const resultLest = result.map(item => {
                return{
                    ...item,
                    imageURL:`https://api-ecproject.poommer.in.th/media/image/vocab/${item.vocab_ID.split('-')[0]}/${item.word_en}.webp`,
                    soundURL:`https://api-ecproject.poommer.in.th/media/sound/vocab/${item.vocab_ID.split('-')[0]}/${item.word_en}.wav`,

                }
            })

            // ส่ง response ที่รวมข้อมูลจาก API และฐานข้อมูล
            res.status(200).json({
                status: 200,
                result: {
                    quizDetail: quizData,  // ข้อมูลจาก API
                    content: resultLest         // ข้อมูลจากฐานข้อมูล
                }
            });
        });

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
});

// ------------------------------------------------------------
router.post('/:userID/play/:id', async (req,res)=>{
    try{
        const {id,userID} = req.params
        const sql = "INSERT INTO `quiz_play` (`Qplay_QuizID` , `Qplay_user`) VALUES (?,?)"
        conn.execute(sql,[id,userID],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({status:201,result:{id,userID}})
        })
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})

router.get('/:userID/history', async (req,res)=>{
    try{
        const {userID} = req.params
        const sql = "SELECT  `Qplay_user`, `Qplay_QuizID`, `Qplay_timestamp` FROM `quiz_play` WHERE Qplay_user = ?"
        conn.execute(sql,[userID],(err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({status:201,result})
        })
    }catch(err){
        res.status(500).json({ status: 500, message: err.message });
    }
})

// ------------------------------------------------------------
router.get('/',async (req, res) => {
    res.send('connected the login.')
})

module.exports = router;