const express = require("express");
const path = require("path");
const multer = require('multer');
const fs = require('fs');

// const wordList = require('./vocab/script')
const router = express.Router();
const conn = require('../conn') // นำเข้าการเชื่อมต่อจากไฟล์ server.js


router.get("/wordlist/", async (req, res) => {
    try {
        conn.execute("SELECT * FROM `wordlist` ORDER BY `wordlist`.`wl_id` DESC;", async (err, result) =>{
            if(err){err.message}
            res.status(200).json(result);
        });

        
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get("/wordlist/:id", async (req, res) => {
    try {
        let id = req.params.id
        conn.execute("SELECT * FROM `wordlist` WHERE `wordlist`.`wl_id` = ?;", [id], async (err, result) =>{
            if(err){err.message}
            res.status(200).json(result);
        });
        
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.delete("/wordlist/:id", async (req, res) => {
    try {
        let id = req.params.id
        conn.execute("DELETE FROM `wordlist` WHERE `wordlist`.`wl_id` = ?;", [id], async (err, result) =>{
            if(err){err.message}
            res.status(200).json({
                status: 200,
                message: `deleted.`,
            });
        });
        
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.post("/wordlist/", async (req, res) => {
    try {
        const { name, description } = req.body;
        let latestID_SQL = await conn.promise().query("SELECT * FROM `wordlist` ORDER BY `wordlist`.`wl_id` DESC LIMIT 1;");
        let genID = `wl${(parseInt(latestID_SQL[0][0].wl_id.slice(2)) + 1).toString().padStart(3, "0")}`;
        let sql = "INSERT INTO `wordlist` (`wl_id`, `wl_name`, `wl_description`) VALUES (?, ?, ?)";
        conn.execute(sql, [genID, name, description], (err, result) => {
            if (err) {
                res.status(500).json(err.message);
            }

            res.status(200).json({
                status:200,
                message:'word list created!',
                response:{name, description}
            });
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get("/pos/show", async (req, res) => {
    try {
        conn.execute("SELECT * FROM `partofspeech`;", async (err, result) =>{
            if(err){err.message}
            res.status(200).json(result);
        });

        
    } catch (err) {
        res.status(500).json(err.message);
    }
});

/* ---------------------------------------------------------------------------------- */

async function genID_vocab (word_List) {
    let latestID_SQL = await conn.promise().query("SELECT * FROM vocab WHERE word_cate = ? ORDER BY vocab_ID DESC LIMIT 1;", [word_List]);
    return `${word_List}-${latestID_SQL[0].length === 1 ? (parseInt(latestID_SQL[0][0].vocab_ID.slice('6'))+1).toString().padStart(4, "0") :'1'.padStart(4, "0")}` ;
        
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            
            
            const word_List = req.query.wl;
            let uploadPath;

            if (file.fieldname === 'file_sound') {
                uploadPath = path.join(__dirname, '../../domains/api-ecproject.poommer.in.th/public_html/media/sound', word_List);
            } else if (file.fieldname === 'file_image') {
                uploadPath = path.join(__dirname, '../../domains/api-ecproject.poommer.in.th/public_html/media/image', word_List);
            }

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const word_en = req.query.we;
            let filePath;

            if (file.fieldname === 'file_sound') {
                filePath = path.join(__dirname, '../../domains/api-ecproject.poommer.in.th/public_html/media/sound', req.query.wl, word_en + path.extname(file.originalname));
            } else if (file.fieldname === 'file_image') {
                filePath = path.join(__dirname, '../../domains/api-ecproject.poommer.in.th/public_html/media/image', req.query.wl, word_en + '.webp');
            }

            // ลบไฟล์เดิมหากมีอยู่
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            cb(null, path.basename(filePath));
        }
    })
}).fields([
    { name: 'file_sound', maxCount: 1 },
    { name: 'file_image', maxCount: 1 }
]);

router.post("/vocab/", upload, async (req, res) => {
    try {
        const { word_en, word_th, pos, word_List} = req.body;
        const file_sound = req.files['file_sound'] ? req.files['file_sound'][0] : null;
        const file_image = req.files['file_image'] ? req.files['file_image'][0] : null;
        const genID = await genID_vocab(word_List);

        console.log( { word_en, word_th, pos, word_List});
        

        let sql = "INSERT INTO vocab (vocab_ID, word_en, word_th, pos, word_cate) VALUES (?, ?, ?, ?, ?)";
        conn.execute(sql, [genID, word_en, word_th, pos, word_List], (err, result) => {
            if (err) {
                res.status(500).json(err.message);
            }

            res.status(200).json({
                status:200,
                message:'word list created!',
                response:{
                    word_en,
                    word_th,
                    pos,
                    word_List
                }
            });

        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get("/vocab/:wordlist", async (req, res) => {
    try{
        const {wordlist} = req.params

        const page = parseInt(req.query.page) || 1;
        const  [[{count}]]  = await conn.promise().query("SELECT COUNT(*) as count FROM `vocab` JOIN `wordlist` ON `vocab`.word_cate = `wordlist`.`wl_id` JOIN `partofspeech` ON `vocab`.pos = `partofspeech`.`pos_id`;")


        let limit = 10
    
        // let count = 21
    
        let pagin =  Math.ceil(count/limit)
    
        let startIndex = page === 1 ? 1 :  (page - 1) * limit + 1 ;
        let offset   =  limit * page >= count ? count : limit * page ;


        conn.execute(`SELECT * FROM vocab WHERE word_cate = ? `, [wordlist], (err, result) => {
            if(err){res.status(500).json({message:err.message})}

            const resultLest = result.map(item => {
                return{
                    ...item,
                    imageURL:`https://api-ecproject.poommer.in.th/media/image/${item.vocab_ID.split('-')[0]}/${item.word_en}.webp`,
                    soundURL:`https://api-ecproject.poommer.in.th/media/sound/${item.vocab_ID.split('-')[0]}/${item.word_en}.wav`,

                }
            })

            res.status(200).json(result)
            

        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get("/vocab/", async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const  [[{count}]]  = await conn.promise().query("SELECT COUNT(*) as count FROM `vocab` JOIN `wordlist` ON `vocab`.word_cate = `wordlist`.`wl_id` JOIN `partofspeech` ON `vocab`.pos = `partofspeech`.`pos_id`;")


        let limit = 10
    
        // let count = 21
    
        let pagin =  Math.ceil(count/limit)
    
        let startIndex = page === 1 ? 1 :  (page - 1) * limit + 1 ;
        let offset   =  limit * page >= count ? count : limit * page ;


        conn.execute("SELECT `vocab_ID`, `word_en`, `word_th`, `wl_name`, `pos_name` FROM `vocab` JOIN `wordlist` ON `vocab`.word_cate = `wordlist`.`wl_id` JOIN `partofspeech` ON `vocab`.pos = `partofspeech`.`pos_id` LIMIT ?,?; ",[startIndex, offset], (err, result) => {
            if(err){res.status(500).json({message:err.message})}
            const resultLest = result.map(item => {
                return{
                    ...item,
                    imageURL:`https://api-ecproject.poommer.in.th/media/image/${item.vocab_ID.split('-')[0]}/${item.word_en}.webp`,
                    soundURL:`https://api-ecproject.poommer.in.th/media/sound/${item.vocab_ID.split('-')[0]}/${item.word_en}.wav`,

                }
            })

            // newList = {pesponse:{...resultLest}, pagin:pagin}

            res.status(200).json({resultLest:resultLest,  pagination:pagin})
            

        })

        // res.status(200).json({count, pagin, startIndex, offset})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.delete("/vocab/:vocabID", async (req, res) => {
    try {
        const { vocabID } = req.params;

        // ดึงข้อมูลคำศัพท์ปัจจุบันจากฐานข้อมูลเพื่อหาที่ตั้งของไฟล์ที่เกี่ยวข้อง
        const [currentData] = await conn.promise().execute("SELECT word_en, word_cate FROM vocab WHERE vocab_ID = ?", [vocabID]);

        if (currentData.length === 0) {
            return res.status(404).json({ message: 'Vocabulary not found' });
        }

        const currentWordEn = currentData[0].word_en;
        const currentWordCate = currentData[0].word_cate;

        // กำหนด path สำหรับไฟล์เสียงและภาพที่ต้องการลบ
        const oldSoundPath = path.join(__dirname, 'uploads/sound', currentWordCate, currentWordEn + '.wav');
        const oldImagePath = path.join(__dirname, 'uploads/image', currentWordCate, currentWordEn + '.webp');

        // ลบไฟล์เสียงและภาพที่เกี่ยวข้องถ้ามีอยู่
        if (fs.existsSync(oldSoundPath)) {
            fs.unlinkSync(oldSoundPath);
        }
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }

        // SQL สำหรับการลบข้อมูลในตาราง vocab
        let sql = "DELETE FROM vocab WHERE vocab_ID = ?";
        await conn.promise().execute(sql, [vocabID]);

        res.status(200).json({
            status: 200,
            message: 'Vocabulary deleted successfully!',
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* ---------------------------------------------------------------------------------- */

router.post("/sentences", async (req, res) => {
    
})

/* ---------------------------------------------------------------------------------- */

// router.

module.exports = router;