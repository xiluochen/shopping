const express = require('express');
const { handlerToken } = require('../../middleware');
const managerModule = require('../../db/modules/manager/managerModule');

const router = express.Router();

router.get('', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        let target;
        const { page } = req.body;
        const user = await managerModule.findOne({name: data.username}, {users:1, status:1});
        if(user.status === '0'){
            const ans = await managerModule.find({status: {$ne: '0'}}, 
                {
                    brands:0, pays:0, commodities:0
                }
            ).exec();
            if(ans){
                if(page>0){
                    target = ans.filter((item, ind)=>(Math.floor(ind/5)===page-1));
                }else {
                    target = ans;
                }
                res.statusCode = 200;
                res.json({
                    code: 20000,
                    msg:'req users success',
                    data: target,
                });
                return;
            }else {
                res.statusCode = 500;
                res.json({
                    code: 602,
                    msg:'req users failed',
                    data: 'db error!',
                });
                return;
            }
        }else {
            await managerModule.populate(user.users, { path: 'managers' });
            if(page>0){
                target = user.users.filter((item, ind)=>(Math.floor(ind/5)===page-1));
            }else {
                target = user.users;
            }
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'req users success',
                data: target,
            });
            return;
        }
    }, (err)=>{
        res.json({
            code: 601,
            msg:'req users failed',
            data: err
        });
    });
});

router.delete('', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const user = await managerModule.findOne({name: data.username}).exec();
        if(user.status === '0'){
            const { ids } = req.body;
            const deleteAns = await managerModule.deleteMany({_id:{$in: ids}});
            if(deleteAns.deletedCount === ids.length){
                res.statusCode = 200;
                res.json({
                    code: 20000,
                    msg:'delete ids success',
                    data:'success'
                });
                return;
            }else {
                res.statusCode = 404;
                res.json({
                    code: 606,
                    msg:'update users failed',
                    data:'ids error!'
                });
            }
        }else {
            res.statusCode = 403;
            res.json({
                code: 605,
                msg:'update users failed',
                data:'no authority!'
            });
        }
    }, (err)=>{
        res.json({
            code: 604,
            msg:'update users failed',
            data: err
        });
    });
});

router.get('/pages', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const user = await managerModule.findOne({name: data.username}, { users:1, status:1 });
        if(user){
            if(user.users){
                res.statusCode  = 200;
                res.json({
                    code: 20000,
                    msg:'req users pages success',
                    data: Math.ceil(user.users.length / 5)
                });
            }else if(user.status === '0'){
                const ans = await managerModule.count({}).exec();
                if(ans>=0){
                    res.statusCode = 200;
                    res.json({
                        code: 20000,
                        msg:'req users page success',
                        data: ans
                    });
                    return;
                }else {
                    res.statusCode = 500;
                    res.json({
                        code: 610,
                        msg:'req users page failed',
                        data: 'server error!'
                    });
                    return;
                }
            }else {
                res.statusCode = 403;
                res.json({
                    code: 609,
                    msg:'req users pages failed',
                    data: 'no authority!'
                });
                return;
            }
        }else {
            res.statusCode = 403;
            res.json({
                code: 608,
                msg:'req users pages failed',
                data: 'please login and then retry!'
            });
            return;
        }
    }, (err)=>{
        res.json({
            code: 607,
            msg:'req users pages failed',
            data: err
        });
    })
})

router.post('', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const user = await managerModule.findOne({name: data.username}, {status:1}).exec();
        if(user.status === '0'){
            const {userInfo} = req.body;
            if(typeof userInfo === 'object'){
                await managerModule.create(userInfo);
                res.statusCode = 200;
                res.json({
                    code: 20000,
                    msg:'append user success',
                    data: 'success'
                })
                return;
            }else {
                res.statusCode = 404;
                res.json({
                    code: 613,
                    msg:'append user failed',
                    data: 'userinfo type error!'
                })
                return;
            }
        }else {
            res.statusCode = 403;
            res.json({
                code: 612,
                msg:'append user failed',
                data: 'no authority!'
            })
            return;
        }
    }, (err)=>{
        res.json({
            code: 611,
            msg:'append user failed',
            data:err
        });
    });
})
module.exports = router;