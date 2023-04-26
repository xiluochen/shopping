const express = require('express');
const { handlerToken } = require('../../middleware');
const managerModule = require('../../db/modules/manager/managerModule');
const brandModule = require('../../db/modules/manager/brandModule');

const router = express.Router();

router.get('/pages', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        let ans = await managerModule.findOne({name: data.username}, {brands:1}).exec();
        if(ans){
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'req brands success',
                data: Math.ceil(ans.brands.length/5)
            });
            return;
        }else {
            res.statusCode = 403;
            res.json({
                code: 501,
                msg:'req brands page failed',
                data: 'no user' 
            });
            return;
        }
    }, (err)=>{
        res.json({
            code: 502,
            msg:'req brands page failed',
            data: err
        })
    })
});

router.get('', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const { page } = req.body;
        let ans = await managerModule.findOne({name: data.username}, {brands:1}).exec();
        if(ans){
            await managerModule.populate(ans, { path:'brands' });
            if(page>0){
                ans = ans.brands.filter((item, ind)=>Math.floor(ind/5)===page-1);
            }else {
                ans = ans.brands;
            }
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'req brands success',
                data: ans
            });
            return;
        }else {
            res.statusCode = 404;
            res.json({
                code: 503,
                msg:'req brand failed',
                data: 'no user' 
            });
            return;
        }
    }, (err)=>{
        res.json({
            code: 504,
            msg:'req brand failed',
            data: err
        })
    })
});

router.delete('/:targetId', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        let { targetId } = req.params;
        const updateAns = await managerModule.updateOne({name: data.username}, {$pull:{brands:targetId}}).exec();
        const deleteAns = await brandModule.deleteOne({_id: targetId}).exec();
        if(updateAns.modifiedCount===1&&deleteAns.deletedCount===1){
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'delete brand success',
            });
        }else {
            if(updateAns.modifiedCount!==1){1
                throw 'Update failed!';
            }
            else if(deleteAns.deletedCount !== 1){
                throw 'Delete failed!';
            }
        }
    }, (err)=>{
        res.json({
            code: 505,
            msg:'delete failed',
            data: err
        });
    })
})

router.post('', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const updateData = req.body;
        const baseData = await brandModule.findById(updateData.id);
        let nowData = {};
        Object.keys(updateData).forEach(key=>{
            if(baseData[key] !== updateData[key]){
                nowData[key] = updateData[key];
            }
        })
        const updateRes = await brandModule.updateOne({_id: updateData._id}, nowData).exec();
        if(updateRes.modifiedCount === 1){
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'update brands success',
            });
        }else {
            res.statusCode = 404;
            res.json({
                code: 506,
                msg:'update brand failed',
                data:'no brand'
            });
        }
        
    }, (err)=>{
        res.json({
            code: 507,
            msg:'update brand failed',
            data:err
        });
    });
})

module.exports = router;