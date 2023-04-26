const express = require('express');
const jwt = require('jsonwebtoken');
const { salt } = require('../../config/app.config');
const { userModule, shopCarModule, locationsModule } = require('../../db/modules/userModule');

const { handlerToken } = require('../../middleware/index');

const router = express.Router();

const moduleDict = {
    'shopcars':shopCarModule,
    'locations':locationsModule
};

const askUserInfoByKey = (token, res, key)=>{
    jwt.verify(token, salt, async(err, data)=>{
        if(err){
            res.statusCode = 504;
            res.json({
                code:2004,
                msg:`req ${key} failed`,
                data:'please login'
            });
            return;
        }
        const { username } = data;
        userModule.findOne({username}).exec().then((user)=>{
            userModule.populate(user, {path:key}).then(async()=>{
                let ansData = user[key];
                if(key === 'shopcars'){
                    await shopCarModule.populate(ansData, {path:'target'});
                }
                res.statusCode = 200;
                res.json({
                    code:20000,
                    msg:'success',  
                    data:ansData,
                }) 
            });
        }).catch((err)=>{
            res.statusCode = 500;
            res.json({
                code:2005,
                msg:'failed',  
                data:err,
            })
        });
    });
}

const askAppendByKey = (token, res, key, newData)=>{
    jwt.verify(token, salt, async(err, data)=>{
        if(err){
            res.statusCode = 504;
            res.json({
                code: 2007,
                msg: `append ${key} wrong`,
                data:"please login",
            })
            return;
        }
        const { username } = data;
        const findRes = await moduleDict[key].findOne({target:newData.target}).exec();
        if(!findRes){
            moduleDict[key].create(newData).then(({ _id })=>{
                userModule.updateOne({username}, {$push:{[key]:_id}}).then(()=>{
                    res.statusCode = 200;
                    res.json({
                        code: 20000,
                        msg: "success",
                        data:"append success"
                    })
                }, (err)=>{
                    res.statusCode = 500;
                    res.json({
                        code:2008,
                        msg:'update failed',
                        data:err
                    })
                });
            }).catch((err)=>{
                res.statusCode = 500;
                res.json({
                    code:2009,
                    msg:'create failed',
                    data:err
                })
            });
        }else {
            moduleDict[key].updateOne({_id:findRes._id}, {num: findRes.num+newData.num}).exec()
                .then((data)=>{
                    if(data.modifiedCount === 1){
                        res.statusCode = 200;
                        res.json({
                            code: 20000,
                            msg: "success",
                            data:"append success"
                        })
                    }else {
                        res.statusCode = 500;
                        res.json({
                            code:2010,
                            msg:'update failed',
                            data:'please try again!'
                        })
                    }
                },(err)=>{
                    res.statusCode = 500;
                    res.json({
                        code:2011,
                        msg:'update failed',
                        data:err
                    })
                });

        }
        
    });
} 

router.get('', handlerToken, (req, res)=>{
    jwt.verify(req.token, salt, (err, data)=>{
        if(err){
            res.statusCode = 404;
            res.json({
                code: 2001,
                msg: "userinfo wrong",
                data:"input error",
            })
            return;
        }
        const { username } = data;
        userModule.findOne({ username }).exec().then(ans=>{
            if(ans) {
                res.send({
                    code: 20000,
                    msg:'userinfo success',
                    data:ans
                });
            }else {
                res.statusCode = 404;
                res.json({
                    code: 2002,
                    msg:'userinfo error',
                    data:'please login',
                })
            }
        }).catch((err)=>{
            res.statusCode = 500;
            res.json({
                code: 2003,
                msg:'find error',
                data:err,
            })
        });
        
    })
})

router.get('/shopcar', handlerToken, (req, res)=>{
    askUserInfoByKey(req.token, res, 'shopcars');
})

router.post('/shopcar', handlerToken, (req, res)=>{
    const newData = req.body;
    if(newData){
        askAppendByKey(req.token, res, 'shopcars', newData);
    }else {
        res.statusCode = 404;
        res.json({
            code:2006,
            msg:'append failed',
            data:'data error',
        })
    }
})

router.get('/locs', handlerToken, (req, res)=>{
    askUserInfoByKey(req.token, res, 'locations');
})

router.post('locs', handlerToken, (req, res)=>{
    const newData = req.body;
    if(newData){
        askAppendByKey(req.token, res, 'locations', newData);
    }else {
        res.statusCode = 404;
        res.json({
            code:2006,
            msg:'append failed',
            data:'data error',
        })
    }
})

module.exports = router;