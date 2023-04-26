const express = require('express');
const jwt = require('jsonwebtoken');
const md5 = require('MD5');

const { salt } = require('../../config/app.config');
const ManagerModule= require('../../db/modules/manager/managerModule');

const router = express.Router();

// 登录
router.post('', async(req, res)=>{
    const { username, password } = req.body;
    // console.log(req);
    try{
        let ans = await ManagerModule.findOne({name:username});
        let md5Res = md5(password);
        // console.log(ans);
        if(ans.name == username && ans.pwd == md5Res){
            let token = jwt.sign({
                username,
                password: md5Res
            }, salt, {
                expiresIn: 3000,
            });
            res.json({
                code: 20000,
                msg:'backmanager login success',
                token
            });
        }else {
            throw 'input error!';
        }

    }catch(err){
        res.statusCode = 403;
        res.json({
            code: 101,
            msg:'backmanager login failed',
            data: err
        })
    }
})

module.exports = router;