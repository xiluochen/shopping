const express = require('express');
const { handlerToken } = require('../../middleware');
const managerModule = require('../../db/modules/manager/managerModule');
const PayModule = require('../../db/modules/manager/payModule');

const router = express.Router();

router.get('/pay', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        let ans = await managerModule.findOne({name: data.username}, {pays:1});
        if(ans){
            await managerModule.populate(ans, {path:'pays'});
            let target = ans.pays;
            await PayModule.populate(target, {path:'payForInfo'});
            target = target.sort((a,b)=>(parseFloat(b.payForInfo.price) * Number(b.nums) - parseFloat(a.payForInfo.price) * Number(a.nums)));
            if(target.length>5) {
                target = target.slice(0,5);
            }
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'get overlist/pay success',
                data: target,
            });
            return;
        }else {
            throw 'no authority!'
        }
    }, (err)=>{
        res.json({
            code: 601,
            msg:'get overlist/pay failed',
            data: err
        });
    })
});

router.get('/brand', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        let ans = await managerModule.findOne({name: data.username}, {brands:1});
        if(ans){
            await managerModule.populate(ans, {path:'brands'});
            if(ans.length>5) {
                ans = ans.slice(0,5);
            }
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'get overlist/brand success',
                data: ans.brands,
            });
            return;
        }else {
            throw 'no authority';
        }
        
    }, (err)=>{
        res.json({
            code: 602,
            msg:'get overlist/brand failed',
            data: err
        });
    })
});

router.get('/income', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        let ans = await managerModule.findOne({name: data.username}, {pays:1});
        if(ans&&ans.pays){
            await managerModule.populate(ans, {path:'pays'});
            await PayModule.populate(ans.pays, {path:'payForInfo'});
            let sum = ans.pays.reduce((prev, item)=>{
                prev += parseFloat(item.payForInfo.price) * Number(item.nums);
                return prev;
            }, 0);
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'get overlist/income success',
                data: sum,
            });
            return;
        }else {
            throw 'no authority!';
        }
    }, (err)=>{
        res.json({
            code: 603,
            msg:'get overlist/income failed',
            data: err
        });
    })
});

module.exports = router;