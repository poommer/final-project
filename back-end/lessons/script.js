const express = require("express");
const path = require("path");
const multer = require('multer');
const fs = require('fs');
const axios = require("axios");

const moment = require('moment-timezone')

// const wordList = require('./vocab/script')
const router = express.Router();
const conn = require('../conn'); // นำเข้าการเชื่อมต่อจากไฟล์ server.js

let urlAPI = 'http://localhost:3000'


router.post('/topic', async (req, res) => {
    try {
   const {lesson_ID, lesson_title, lesson_description, unit_No, lesson_level} = req.body

   const sql = "INSERT INTO `lessons`(`lesson_ID`, `lesson_title`, `lesson_description`, `unit_No`, `lesson_level`) VALUES (?, ?, ?, ?, ?)";

   conn.execute(sql, [lesson_ID, lesson_title, lesson_description, unit_No, lesson_level], (err, result)=>{
    if (err) {
        res.status(500).json({status:500, message:err.message});
    }

    res.status(201).json({status:201,response:{lesson_ID, lesson_title, lesson_description, unit_No, lesson_level}})

   })
    }catch(err){
        res.status(500).json({status:500, message:err.message})
    }
   
})

router.put('/topic/:id', async (req, res) => {
    try {
   const { lesson_title, lesson_description, unit_No, lesson_level} = req.body
   const {id} = req.params

   const sql = "UPDATE `lessons` SET  `lesson_title` = ?, `lesson_description` = ?, `unit_No` = ?, `lesson_level` = ? WHERE `lesson_ID` = ?";

   conn.execute(sql, [lesson_title, lesson_description, unit_No, lesson_level, id], (err, result)=>{
    if (err) {
        res.status(500).json(err.message);
    }

    res.status(200).json({status:200,response:{id, lesson_title, lesson_description, unit_No, lesson_level}})

   })
    }catch(err){
        res.status(500).json({status:500, message:err.message})
    }
   
})

router.get('/topic', async (req, res) => {
    try {
        let sql = "SELECT * FROM `lessons`";

        conn.execute(sql, (err, result)=>{
         if (err) {
             res.status(500).json(err.message);
         }
     
         res.status(200).json({status:200, message:"found data.", row_num:result.length, response:result})
     
        })
         }catch(err){
             res.status(500).json({status:500, message:err.message})
         }
})

router.get('/topic/:unit_No', async (req, res) => {
    try {
        const {unit_No} = req.params
         
        const {lev} = req.query

        let sql = "SELECT * FROM `lessons` WHERE unit_No = ?";
        let query = [];

 

        if(lev) {
           sql += ` AND lesson_level = ${lev}`
        }

        conn.execute(sql, [unit_No] ,(err, result)=>{
         if (err) {
             res.status(500).json({status:500,message:err.message});
         }

         if(result.length < 1){
             res.status(404).json({status:404,message:"not found data.", row_num:0})
            }else{
             res.status(200).json({status:200,message:"found data.", row_num:result.length, response:result})

         }
     
        })
         }catch(err){
             res.status(500).json({status:500, message:err.message})
         }
})

router.delete('/topic/:id', async (req, res) => {
    try {

   const {id} = req.params

   let sql = "DELETE FROM `lessons` WHERE ";

   if(id.split('-')[1] === '0'){
        sql += `unit_No = '${id.split('-')[0]}'`
        message = `lesson ID ${id.split('-')[0]} has been deleted!`
    }else{
        sql += `lesson_ID = '${id}'`
        message = `sub lesson ID ${id} has been deleted!`
   }

   conn.execute(sql, (err, result)=>{
    if (err) {
        res.status(500).json(err.message);
    }

    res.status(200).json({status:200,message:message})

   })
    }catch(err){
        res.status(500).json({status:500, message:err.message})
    }
   
})


// -----------------------------------------------------------------------

router.post('/set/vocab',  async (req, res) => {
    try{
        const {lesCon_lesID, lesCon_content} = req.body;
        
        const sql = "INSERT INTO `lesson_content` (`lesCon_lesID`, `lesCon_content`) VALUE(?,?) ";
        
        conn.execute(sql, [lesCon_lesID, lesCon_content],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(201).json({status:201,response:{lesCon_lesID, lesCon_content}})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.put('/set/vocab/:id',  async (req, res) => {
    try{
        const { lesCon_lesID, lesCon_content} = req.body;
        const { id } = req.params;
        
        const sql = "UPDATE `lesson_content` SET `lesCon_lesID` = ?, `lesCon_content` = ? WHERE `lesCon_id` = ?" ;
        
        conn.execute(sql, [lesCon_lesID, lesCon_content, id],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(200).json({status:200,response:{lesCon_lesID, lesCon_content}})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.delete('/set/vocab/:id',  async (req, res) => {
    try{
        const { id } = req.params;
        
        const sql = "DELETE FROM `lesson_content` WHERE `lesCon_id` = ?" ;
        
        conn.execute(sql, [id],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(200).json({status:200,response:`vocab ID ${id.split('-')[0]} has been deleted!`})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

// router.get('/set/vocab/les/:unit_No',  async (req, res) => {
//     try{
//         const {unit_No} = req.params
        
//         const sql = "SELECT `lesCon_id`, `lesson_ID`, `lesson_title`, `word_en`, `word_th`, `pos`, `wordlist`.`wl_name` FROM `lesson_content`, `lessons`, `vocab`, `wordlist` WHERE `lessons`.`lesson_ID` = `lesCon_lesID` AND `vocab`.`vocab_ID` = `lesCon_content` AND `wordlist`.`wl_id` = `vocab`.`word_cate` AND `unit_No` = ?; ";
        
//         conn.execute(sql, [unit_No],(err, result)=>{
//             if (err) {
//                 res.status(500).json({status:500, message:err.message});
//             }

//             result = result.reduce((acc, curr) => {
//                 let lesson = acc.find(item => item.lesson_ID === curr.lesson_ID && item.lesson_title === curr.lesson_title);

//                 if (!lesson) {
//                     lesson = {
//                         lesson_ID: curr.lesson_ID,
//                         lesson_title: curr.lesson_title,
//                         vocab: []
//                     };
//                     acc.push(lesson);
//                 }

//                 lesson.vocab.push({
//                     lesCon_id:curr.lesCon_id,
//                     word_en: curr.word_en,
//                     word_th: curr.word_th,
//                     pos: curr.pos,
//                     wl_name: curr.wl_name
//                 });

//                 return acc;
//             }, []);
        
//             if(result.length < 1){
//                 res.status(404).json({status:404,message:"not found data.", row_num:0})
//                }else{
//                 res.status(200).json({status:200,message:"found data.", row_num:result.length, response:result})
   
//             }
//         })
        
//     }
//     catch(err){
//         res.status(500).json({status:500, message:err.message})
//     }
// })

router.get('/set/vocab/lev/:lesson_id',  async (req, res) => {
    try{
        const {lesson_id} = req.params
        
        const sql = "SELECT `lesCon_id`, `word_en`, `word_th`, `pos`, `wordlist`.`wl_name` FROM `lesson_content`, `lessons`, `vocab`, `wordlist` WHERE `lessons`.`lesson_ID` = `lesCon_lesID` AND `vocab`.`vocab_ID` = `lesCon_content` AND `wordlist`.`wl_id` = `vocab`.`word_cate` AND `lesson_ID` = ?; ";
        
        conn.execute(sql, [lesson_id],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            if(result.length < 1){
                res.status(404).json({status:404,message:"not found data.", row_num:0})
               }else{
                res.status(200).json({status:200,message:"found data.", row_num:result.length, response:result})
   
            }
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

// -----------------------------------------------------------------------

router.post('/set/sentence',  async (req, res) => {
    try{
        const {lessonID, th, en} = req.body;
        
        const sql = "INSERT INTO `sentences`(`sen_lesID`, `sen_th`, `sen_en`) VALUES (?, ?, ?) ";
        
        conn.execute(sql, [lessonID, th, en],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(201).json({status:201,response:{lessonID, th, en}})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.get('/set/sentence/:lesson_id',  async (req, res) => {
    try{
        const {lesson_id} = req.params;
        
        const sql = "SELECT * FROM `sentences` WHERE `sen_lesID` = ?";
        
        conn.execute(sql, [lesson_id], (err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(200).json({status:200,response:result})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.put('/set/sentence/:sen_id',  async (req, res) => {
    try{
        const {lesson_id, th, en} = req.body;
        const {sen_id} = req.params;
        
        const sql = "UPDATE `sentences` SET `sen_lesID` = ?, `sen_th` = ?, `sen_en` = ?  WHERE  `sen_id` = ? ";
        
        conn.execute(sql, [lesson_id, th, en, sen_id],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(200).json({status:200,response:{lesson_id, th, en}})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.delete('/set/sentence/:sen_id',  async (req, res) => {
    try{
        const {sen_id} = req.params;
        
        const sql = "DELETE FROM `sentences` WHERE  `sen_id` = ? ";
        
        conn.execute(sql, [sen_id], (err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(200).json({status:200,response:`sentence ID ${sen_id} has been deleted!`})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

// -----------------------------------------------------------------------

router.post('/set/conver',  async (req, res) => {
    try{
        const {lessonID, contents} = req.body;
        
        const sql = "INSERT INTO `conversation`(`conver_lesID`, `conver_content`) VALUES (?, ?) ";
        // contents = JSON.stringify(contents)
        conn.execute(sql, [lessonID, JSON.stringify(contents)],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(201).json({status:201,response:{lessonID, contents}})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.put('/set/conver/:converID',  async (req, res) => {
    try{
        const {lessonID, contents} = req.body;
        const {converID} = req.params;
        
        const sql = "UPDATE `conversation` SET `conver_lesID` = ?, `conver_content` = ?  WHERE `conver_id` = ?";
        // contents = JSON.stringify(contents)
        conn.execute(sql, [lessonID, JSON.stringify(contents), converID],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(201).json({status:201,response:{lessonID, contents}})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.get('/set/conver/:converID',  async (req, res) => {
    try{
        const {converID} = req.params;
        
        const sql = "SELECT * FROM `conversation` WHERE `conver_lesID` = ?";
        
        conn.execute(sql, [converID], (err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }

            result = result.map((value) => {
                let {conver_content, ...data} = value
                const newOBJ = JSON.parse(conver_content)
                return {...data, conver_content:newOBJ}
            })
        
            res.status(200).json({status:200,response:result})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.delete('/set/conver/:converID',  async (req, res) => {
    try{
        const {converID} = req.params;
        
        const sql = "DELETE FROM `conversation` WHERE `conver_lesID` = ? ";
        
        conn.execute(sql, [converID], (err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(200).json({status:200,response:`sentence ID ${converID} has been deleted!`})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

// -----------------------------------------------------------------------

router.get('/detail/:lesID', async (req, res) =>{
    try{
        const {lesID} = req.params
        let vocab = await axios.get(`${urlAPI}/lessons/set/vocab/lev/${lesID}`) ;
        let sentence = await axios.get(`${urlAPI}/lessons/set/sentence/${lesID}`) ;
        let conversation = await axios.get(`${urlAPI}/lessons/set/conver/${lesID}`) ;

        const responseData = {
            status:200,
            lesson:lesID,
            vocab: vocab.data.response,
            sentence: sentence.data.response,
            conversation: conversation.data.response
        };

        res.status(200).json(responseData)


    }catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

// -----------------------------------------------------------------------

async function genID_vocab (lesID) {
    let latestID_SQL = await conn.promise().query("SELECT * FROM lesson_history WHERE lesHit_lesID = ? ORDER BY lesHit_lesID DESC LIMIT 1;", [lesID]);
    return `${moment().tz('Asia/Bangkok').format('YYYYDDMM')}-${lesID}-${latestID_SQL[0].length === 1 ? (parseInt(latestID_SQL[0][0].lesHit_lesID.split('-'))[3]+1).toString().padStart(4, "0") :'1'.padStart(4, "0")}` ;
        
}
router.post('/enroll/', async (req, res) => {
    try {
        const {lesson_ID, user_ID} = await req.body
        const sql = "INSERT INTO `lesson_history`(`lesHit_id`, `lesHit_UserID`, `lesHit_lesID`, `lesHit_status`) VALUES (?, ?, ?, ?)"
        const id = await genID_vocab(lesson_ID)
        // res.send(id)

        conn.execute(sql, [id, user_ID, lesson_ID, false],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(201).json({status:201,response:{id:id, user_ID:user_ID, lesson_ID:lesson_ID, status:false}})
        })
    } catch (err) {
        res.status(500).json({status:500, message:err.message})
    }
})

// -----------------------------------------------------------------------

router.get('/chapterMenu', async (req, res) => {
    try {
        const {user_id } = req.query;

        const sql = "SELECT `lesson_ID`, `lesson_title`, `lesson_description`, `lessons`.`unit_No`, lessons.lesson_level, lesson_history.lesHit_status FROM lessons LEFT JOIN lesson_history ON lessons.lesson_ID = lesson_history.lesHit_lesID AND lesson_history.lesHit_UserID = ? WHERE lessons.unit_No IS NOT NULL ORDER BY `lessons`.`lesson_ID` ASC;";
        conn.execute(sql, [user_id], (err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(200).json({status:200,response:result})
        })
    } catch (err) {
        res.status(500).json({status:500, message:err.message})
    }
})

module.exports = router;
