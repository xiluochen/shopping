const express = require('express');
const ImgModule = require('../db/modules/imgModule');

const router = express.Router();

router.get('/:id', async(req, res)=>{
    const { id } = req.params;
    try {
        if(id){
            const {img} = await ImgModule.findById(id).exec();
            if(img){
                const base64 = img.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
                const dataBuffer = Buffer.from(base64,'base64');
                res.setHeader('Content-Type', 'application/octet-stream;charset=utf-8');
                res.send(dataBuffer);
            }else {
                throw 'not found'
            }
        }else {
            throw 'id error!'
        }
    }catch(err) {
        console.log(err);
        res.statusCode = 404;
        res.send('');
    }
    
});

router.post('', async(req, res)=>{

});

module.exports = router;