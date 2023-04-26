const express = require('express');
const jwt = require('jsonwebtoken');
const md5 = require('MD5');

const { handlerToken } = require('../../middleware/index');
const { salt } = require('../../config/app.config');
const managerModule = require('../../db/modules/manager/managerModule');

const router = express.Router();

router.get('', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const ans = await managerModule.findOne({name: data.username}).exec();
        if(ans.status !== '0'){
            await managerModule.populate(ans, {path:'roots'});
        }
        res.statusCode = 200;
        res.json({
            code: 20000,
            msg: 'req userinfo success',
            data: ans,
        });
        return;
    }, (err)=>{
        console.log(err);
        res.json({
            code: 301,
            msg:'req userinfo failed',
            data:err||'please retry'
        });
    });
});

router.post('', handlerToken, async(req, res)=>{
    req.verifyCall(async(data)=>{
        const updateData = req.body;
        let ans = await managerModule.updateOne({name: data.username}, updateData).exec();
        if(ans.modifiedCount){
            let resData = {
                code: 20000,
                msg: 'update userinfo success',
                data: 'success'
            };
            if(updateData.name){
                resData['token'] = jwt.sign({
                    username: updateData.name,
                    password: md5(data.password),
                }, salt, {
                    expiresIn: 3000,
                });
            }
            res.statusCode = 200;
            res.json(resData);
            return;
        }else {
            throw 'update error! please retry.';
        }
    }, (err)=>{
        res.json({
            code: 302,
            msg:'update userinfo failed',
            data:err||'please retry'
        });
    });
})

module.exports = router;