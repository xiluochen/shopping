const express = require('express');
const jwt = require('jsonwebtoken');
const { salt } = require('../../config/app.config');
const { userModule } = require('../../db/modules/userModule');
const router = express.Router();

const handlerToken = (req, res, next)=>{
    req.token = req.get('token');
    next();
}

router.post('', handlerToken, async(req, res)=>{
    const pays = req.body;
    jwt.verify(req.token, salt, async(err, data)=>{
        if(err){
            res.statusCode = 500;
            res.json({
                code:5001,
                msg:'payfor failed',
                data:'database error'
            })
        }
        const {username} = data;
        userModule.findOneAndUpdate({username}, {$pullAll: {shopcars:pays.ids}}).then(()=>{
            res.statusCode = 200;
            res.json({
                code:20000,
                msg:'success',
                data:'payfor success'
            })
        }).catch((err)=>{
            res.statusCode = 500;
            res.json({
                code:5002,
                msg:'payfor failed',
                data:err
            })
        })
    })
    
})

module.exports = router;