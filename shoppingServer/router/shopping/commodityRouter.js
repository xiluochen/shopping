const express = require('express');

const commodityModule = require('../../db/modules/commodityModule');

const router = express.Router();

router.get('/:id', (req, res)=>{
    const {id} = req.params;

    commodityModule.findById(id).exec()
        .then((data)=>{
            if(data){
                res.json({
                    code: 20000,
                    msg:'success',
                    data,
                })
            }else {
                res.statusCode = 404;
                res.json({
                    code:4001,
                    msg:'commodity error',
                    data:'no commodity',
                })
            }
        }).catch((err)=>{
            console.log(err);
            res.statusCode = 404;
            res.json({
                code:4001,
                msg:'commodity error',
                data:'no commodity',
            })
        });
})

router.get('', (req, res)=>{
    commodityModule.find({}, {}, {limit: 5}).exec().then((ans)=>{
        if(ans&&ans.length>0){
            res.json({
                code: 20000,
                msg:'success',
                data:ans,
            })
        }else {
            res.statusCode = 500;
            res.json({
                code: 4002,
                msg:'commodity error',
                data:'no data',
            })
        }
    }).catch((err)=>{
        res.statusCode = 500;
        res.json({
            code: 4003,
            msg:'commodity error',
            data:err,
        })
    });
    
})

module.exports = router;