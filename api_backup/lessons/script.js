const express = require("express");
const path = require("path");
const multer = require('multer');
const fs = require('fs');
const axios = require("axios");

const moment = require('moment-timezone')

// const wordList = require('./vocab/script')
const router = express.Router();
const conn = require('../conn'); // นำเข้าการเชื่อมต่อจากไฟล์ server.js

let urlAPI = 'https://api-ecproject.poommer.in.th/api'


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

router.get('/topic/heading', async (req, res) => {
    try {
        let sql = "SELECT * FROM `lessons` WHERE `lesson_level` = '0'";

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
        const { lesCon_lesID, lesCon_content} = req.body;
        // const { id } = req.params;
        
        const sql = "INSERT INTO `lesson_content` ( `lesCon_lesID`,  `lesCon_content`) VALUE(?, ?)" ;
        
        conn.execute(sql, [lesCon_lesID, lesCon_content],(err, result)=>{
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
//                     wl_name: curr.wl_nameม
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
        
        const sql = "SELECT `lesCon_id`, `vocab_ID`, `word_en`, `word_th`, `pos`, status_image, `wordlist`.`wl_name` FROM `lesson_content`, `lessons`, `vocab`, `wordlist` WHERE `lessons`.`lesson_ID` = `lesCon_lesID` AND `vocab`.`vocab_ID` = `lesCon_content` AND `wordlist`.`wl_id` = `vocab`.`word_cate` AND `lesson_ID` = ?; ";
        
        conn.execute(sql, [lesson_id],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            if(result.length < 1){
                res.status(404).json({status:404,message:"not found data.", row_num:0})
               }else{
                const resultLest = result.map(item => {
                    return{
                        ...item,
                        imageURL:item. status_image === 1 ? `https://api-ecproject.poommer.in.th/media/image/vocab/${item.vocab_ID.split('-')[0]}/${item.word_en}.webp`:'none',
                        soundURL:`https://api-ecproject.poommer.in.th/media/sound/vocab/${item.vocab_ID.split('-')[0]}/${item.word_en}.wav`,
    
                    }
                })
                res.status(200).json({status:200,message:"found data.", row_num:result.length, response:resultLest})
   
            }
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

// -----------------------------------------------------------------------

const upload_sound_sentence = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const lessonID = req.query.lessonID; // ใช้ lessonID ในการกำหนดโฟลเดอร์
            const uploadPath = path.join(__dirname, '../../domains/api-ecproject.poommer.in.th/public_html/media/sound/sentence', lessonID);

            // ตรวจสอบและสร้างโฟลเดอร์ถ้าไม่มี
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            let en = req.query.en;
            en = en.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_'); // ใช้ en ในการตั้งชื่อไฟล์
            const filePath = path.join(__dirname, '../../domains/api-ecproject.poommer.in.th/public_html/media/sound/sentence', req.query.lessonID, en + path.extname(file.originalname));

            // ลบไฟล์เก่าถ้ามี
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            cb(null, path.basename(filePath));
        }
    })
}).single('file_sound'); // อัพโหลดเฉพาะไฟล์เสียง


router.post('/set/sentence', upload_sound_sentence,  async (req, res) => {
    try{
        const file_sound = req.file ? req.file.filename : null;
        const {lessonID, th, en} = req.body;
        
        const sql = "INSERT INTO `sentences`(`sen_lesID`, `sen_th`, `sen_en`) VALUES (?, ?, ?) ";
        
        conn.execute(sql, [lessonID, th, en],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(201).json({status:201,response:{lessonID, th, en,sound_url:`https://api-ecproject.poommer.in.th/media/sound/sentence/${lessonID}/${en.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}.wav`}})
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
            const resultLest = result.map(item => {
                return{
                    ...item,
                    sound_url:`https://api-ecproject.poommer.in.th/media/sound/sentence/${item.sen_lesID}/${item.sen_en.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}.wav`

                }
            })
        
            res.status(200).json({status:200,response:resultLest})
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
const upload_sound_conversation = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const converID = req.query.converID; // ใช้ lessonID ในการกำหนดโฟลเดอร์
            const uploadPath = path.join(__dirname, '../../domains/api-ecproject.poommer.in.th/public_html/media/sound/conversation', converID);

            // ตรวจสอบและสร้างโฟลเดอร์ถ้าไม่มี
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            let index = req.query.index;
            const filePath = path.join(__dirname, '../../domains/api-ecproject.poommer.in.th/public_html/media/sound/conversation', req.query.converID, index + path.extname(file.originalname));

            // ลบไฟล์เก่าถ้ามี
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            cb(null, path.basename(filePath));
        }
    })
}).single('file_sound'); // อัพโหลดเฉพาะไฟล์เสียง


router.post('/conversation',  async (req, res) => {
    try{
        const {lessonID, name, speaker_A, speaker_B} = req.body;
        const id = `conver-${lessonID}`
        
        const sql = "INSERT INTO `conversation`(`conver_id`, `conver_lesID`,`conver_name`, `specker_A`, `specker_B`) VALUES (?, ?, ?, ?, ?) ";
        // name = JSON.stringify(name)
        conn.execute(sql, [id, lessonID, name, speaker_A, speaker_B],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(201).json({status:201,response:{id, lessonID, name, speaker_A, speaker_B}})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.put('/conversation/:converID',  async (req, res) => {
    try{
        const {name, specker_A, specker_B} = req.body;
        const {converID} = req.params;
        
        const sql = "UPDATE `conversation` SET `conver_name`=?,`specker_A`=?,`specker_B`=?  WHERE `conver_id` = ?";
        // contents = JSON.stringify(contents)
        conn.execute(sql, [name, specker_A, specker_B, converID],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(200).json({status:200,response:{name, specker_A, specker_B}})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})

router.delete('/conversation/:converID',  async (req, res) => {
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


router.post('/conversation/:converID', upload_sound_conversation, async (req, res) => {
    try{
        const file_sound = req.file ? req.file.filename : null;
        const { th, en, index, speaker} = req.body;
        const {converID} = req.params;
        const id = `${converID}-${index}`
        
        const sql = "INSERT INTO `conver_content`(`converContent_ID`, `converContent_converID`, `converContent_th`, `converContent_en`, `converContent_Index`, `converContent_speaker`)  VALUES (?, ?, ?, ?, ?, ?) ";
        // contents = JSON.stringify(contents)
        conn.execute(sql, [id, converID, th, en, index, speaker],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(201).json({status:201,response:{id, converID, th, en, index, speaker,sound_url:`https://api-ecproject.poommer.in.th/media/sound/conversation/${converID}/${index}.wav`}})
        })
        
    }
    catch(err){
        res.status(500).json({status:500, message:err.message})
    }
})


router.get('/conversation/:converID',  async (req, res) => {
    try{
        const {converID} = req.params;
        
        const sql = "SELECT * FROM `conversation` WHERE `conver_id` = ?";
        
        conn.execute(sql, [converID], (err, result)=>{
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

router.get('/conversation/:converID/content',  async (req, res) => {
    try{
        const {converID} = req.params;

        const response = await axios.get(`${urlAPI}/lessons/conversation/${converID}`)
        const heading = response.data.response
        
        const sql = "SELECT `converContent_th`, `converContent_en`, `converContent_Index`, `converContent_speaker` FROM `conver_content` INNER JOIN conversation ON `converContent_converID` = `conversation`.`conver_id` AND `conversation`.`conver_id` = ? ORDER BY `conver_content`.`converContent_Index` ASC;";
        
        conn.execute(sql, [converID], (err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
            result = result.map((value) => {
                return {
                    text_th:value.converContent_th,
                    text_en:value.converContent_en,
                    speaker:value.converContent_speaker,
                    index:value.converContent_Index,
                    url_sound:`https://api-ecproject.poommer.in.th/media/sound/conversation/${converID}/${value.converContent_Index}.wav`
                }
            })

            result = {heading, result}
        
            res.status(200).json({status:200,response:result})
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
        let conversation = await axios.get(`${urlAPI}/lessons/conversation/conver-${lesID}/content`) ;

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

router.get('/genID/:lesson_ID', async (req, res) => {
    const {lesson_ID} = req.params
    // const id = await genID_lesson(lesson_ID)
    let latestID_SQL = await conn.promise().query("SELECT * FROM lesson_history WHERE lesHit_lesID = ? ORDER BY lesHit_lesID DESC LIMIT 1;", [lesson_ID]);
    let id;

    if(latestID_SQL[0].length === 1){
        const dateLetest = moment(latestID_SQL[0][0].lesHit_timestamp)
        const latestID = latestID_SQL[0][0].lesHit_id

        if(dateLetest.format('YYYYDDMM') === moment().tz('Asia/Bangkok').format('YYYYDDMM')){
            const randomNumber = parseInt(latestID_SQL[0][0].lesHit_id.split('-')[3])+1
            id = `${moment().tz('Asia/Bangkok').format('YYYYDDMM')}-${lesson_ID}-${randomNumber.toString().padStart(4, "0")}`
        }  

        else{
            id = `${moment().tz('Asia/Bangkok').format('YYYYDDMM')}-${lesson_ID}-${'1'.toString().padStart(4, "0")}`
        }
    }else{
        id = `${moment().tz('Asia/Bangkok').format('YYYYDDMM')}-${lesson_ID}-${'1'.toString().padStart(4, "0")}`
    }

    res.status(200).json({id:id});

})

router.post('/enroll/', async (req, res) => {
    try {
        const {lesson_ID, user_ID} = await req.body
        const sql = "INSERT INTO `lesson_history`(`lesHit_id`, `lesHit_UserID`, `lesHit_lesID`, `lesHit_status`) VALUES (?, ?, ?, ?)"
        const response = await axios.get(`${urlAPI}/lessons/genID/${lesson_ID}`)
        const id = response.data.id
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


router.patch('/enroll/', async (req, res) => {
    try {
        const {lesson_ID, user_ID} = req.body
        const sql = "UPDATE `lesson_history` SET `lesHit_status`= ? WHERE `lesHit_UserID`= ? AND `lesHit_lesID`= ?"
        conn.execute(sql, [1, user_ID, lesson_ID],(err, result)=>{
            if (err) {
                res.status(500).json({status:500, message:err.message});
            }
        
            res.status(201).json({status:201,response:{user_ID:user_ID, lesson_ID:lesson_ID, status:true}})
        })
    } catch (err) {
        res.status(500).json({status:500, message:err.message})
    }
})

// -----------------------------------------------------------------------

router.get('/chapterMenu', async (req, res) => {
    try {
        const { user_id } = req.query;

        const sql = `
            SELECT 
                lessons.lesson_ID, 
                lessons.lesson_title, 
                lessons.lesson_description, 
                lessons.unit_No, 
                lessons.lesson_level, 
                lesson_history.lesHit_status 
            FROM 
                lessons 
            LEFT JOIN 
                lesson_history 
            ON 
                lessons.lesson_ID = lesson_history.lesHit_lesID 
            AND 
                lesson_history.lesHit_UserID = ? 
            WHERE 
                lessons.unit_No IS NOT NULL 
            ORDER BY 
                lessons.unit_No ASC, 
                lessons.lesson_level ASC
        `;

        conn.execute(sql, [user_id], (err, result) => {
            if (err) {
                return res.status(500).json({ status: 500, message: err.message });
            }

            // Grouping lessons by unit_No
            const groupedResult = result.reduce((acc, lesson) => {
                const { unit_No } = lesson;
                if (!acc[unit_No]) {
                    acc[unit_No] = [];
                }
                acc[unit_No].push(lesson);
                return acc;
            }, {});

            // Converting the grouped result object into an array of arrays
            const response = Object.values(groupedResult);

            res.status(200).json({ status: 200, response });
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
});


module.exports = router;
