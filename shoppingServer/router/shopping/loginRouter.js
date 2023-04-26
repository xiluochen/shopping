const express = require('express');
const jwt = require('jsonwebtoken');
const md5 = require('MD5');
const { salt } = require('../../config/app.config');
const { userModule } = require('../../db/modules/userModule');

const router = express.Router();

router.post('', async(req, res)=>{
    const { username, password } = req.body;
    userModule.find({username}).exec().then((ans)=>{
        if( !username || !password ){
            res.statusCode=404;
            res.json({
                code:1001,
                msg:'register failed',
                data:'input error',
            })
            return;
        }
        if(ans.length === 0){
            const md5Res = md5(password)
            userModule.create({
                username,
                password:md5Res,
                avator:'',
                shopcar:[],
                location:[],
            }).then(()=>{
                const token = jwt.sign({
                    username,
                    password: md5Res
                }, salt, {
                    expiresIn: 3000,
                });
                res.statusCode = 200;
                res.json({
                    code: 20000,
                    msg:'success',
                    token
                });
            });
        }else {
            res.statusCode = 500;
            res.json({
                code: 1002,
                msg:'register failed',
                data:'username is already created'
            })
        }
    }).catch(err=>{
        res.statusCode = 500;
        res.json({
            code: 1003,
            msg:'register failed',
            data:err
        })
    });
    
})

router.get('', (req, res)=>{
    const { username, password } = req.query;
    if(!username||!password){
        res.statusCode = 400;
        res.json({
            code: 1004,
            msg:'login failed',
            data:'input error'
        });
        return;
    }
    userModule.findOne({username}).exec().then((ans)=>{
        if(ans){
            const md5Res = md5(password);
            if(ans.password === md5Res){
                const token = jwt.sign({
                    username,
                    password: md5Res
                }, salt, {
                    expiresIn: 3000,
                });
                res.json({
                    code: 20000,
                    msg:'success',
                    token
                });
                return;
            }
            res.statusCode = 400;
            res.json({
                code: 1005,
                msg:'login failed',
                data:'password wrong'
            });
            return;
        } else {
            res.statusCode = 404;
            res.json({
                code: 1006,
                msg:'login failed',
                data:'no user'
            });
        }
    }).catch(err=>{
        res.statusCode = 500;
        res.json({
            code: 1007,
            msg:'login failed',
            data:err
        })
    });
    
})

module.exports = router;