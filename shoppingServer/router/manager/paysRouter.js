const express = require('express');
const { handlerToken } = require('../../middleware');
const managerModule = require('../../db/modules/manager/managerModule');
const PayModule = require('../../db/modules/manager/payModule');

const router = express.Router();

router.get('', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const { page } = req.body;
        let user = await managerModule.findOne({name: data.username||data.name}).exec();
        await managerModule.populate(user, { path:'pays' });
        let ans = user['pays'];
        if(page>0){
            ans = ans.filter((item, ind)=>Math.floor(ind/5)===page-1)
        }
        await PayModule.populate(ans, { path:'payForInfo' });
        res.statusCode = 200;
        res.json({
            code: 20000,
            msg:'req pays success',
            data: ans,
        });
    }, (err)=>{
        res.json({
            code: 401,
            msg:'req pays failed',
            data: err||'please retry',
        });
    });
});

router.delete('/:targetId', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        let { targetId } = req.params;
        let updateAns = await managerModule.updateOne({name: data.username}, {$pull:{pays:targetId}}).exec();
        const deleteAns = await PayModule.deleteOne({_id: targetId}).exec();
        if(updateAns.modifiedCount===1&&deleteAns.deletedCount===1){
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'delete pay success',
            });
        }else {
            if(updateAns.modifiedCount!==1){
                throw 'Update failed!';
            }
            else if(deleteAns.deletedCount !== 1){
                throw 'Delete failed!';
            }
        }
    }, (err)=>{
        res.json({
            code: 402,
            msg:'delete failed',
            data: err
        });
    });
})

router.get('/pages', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const user = await managerModule.findOne({name: data.username}, {pays:1});
        res.statusCode = 200;
        res.json({
            code: 20000,
            msg:'get pays page success',
            data: Math.ceil(user.pays.length/5) || 0,
        });
        return;
    }, (err)=>{
        res.json({
            code: 403,
            msg:'get pays pages failed',
            data: err,
        })
    });
})

module.exports = router;