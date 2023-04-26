const express = require('express');
const { handlerToken } = require('../../middleware');
const managerModule = require('../../db/modules/manager/managerModule');
const rootModule = require('../../db/modules/manager/rootModule');

const router = express.Router();

// 获取base权限
router.get('/base', async(req, res)=>{
    try{
        const roots = await rootModule.find({}).exec();
        res.json({
            code: 20000,
            msg:'req basic roots success',
            data: roots
        });
    }catch(err){
        res.json({
            code: 701,
            msg:'req basic roots failed',
            data: err
        });
    }
});

// 获取某用户权限列表
router.get('/:userId', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const {userId} = req.params;
        const user = await managerModule.findOne({name:data.username}, {status:1}).exec();
        if(user.status === '0'){
            const target = await managerModule.findById(userId).exec();
            if(!target||!target.roots){
                throw 'id error!';
            }
            await managerModule.populate(target, {path:'roots'});
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'req roots success',
                data: target.roots
            });
        }else {
            res.statusCode = 403;
            res.json({
                code: 703,
                msg:'req user roots failed',
                data:'no authority!'
            });
            return;
        }
    }, (err)=>{
        console.log(err);
        res.json({
            code: 702,
            msg:'req roots failed',
            data: err
        });
    })
});

// 修改users的权限列表
router.post('', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        let user = await managerModule.findOne({name: data.username}).exec();
        if(user.status === '0'){
            const { id, roots } = req.body;
            const target = await managerModule.exists({_id:id}).exec();
            if(target!==null){
                const updateAns = await managerModule.updateOne({_id: id}, {roots}).exec();
                if(updateAns.modifiedCount === 1){
                    res.json({
                        code: 20000,
                        msg:'update target roots success',
                        data:'success'
                    });
                    return;
                }else {
                    res.statusCode = 500;
                    res.json({
                        code: 707,
                        msg:'update target roots failed',
                        data:'db error, please retry!'
                    })
                    return;
                }
            }else {
                res.statusCode = 404;
                res.json({
                    code: 706,
                    msg:'update roots failed',
                    data:'invalid id!'
                });
                return;
            }
        }else {
            res.statusCode = 403;
            res.json({
                code: 705,
                msg:'update roots failed',
                data:'no authority!'
            });
            return;
        }
    }, (err)=>{
        res.json({
            code: 704,
            msg:'update root failed',
            data: err
        })
    })
})

// 修改base权限的内容
router.post('/base', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const user = await managerModule.findOne({name: data.username}, {roots:1, status:1});
        if(user.status === '0'){
            const { roots } = req.body;
            const updateAns = await rootModule.updateOne({_id: roots.id||roots._id}, roots).exec();
            if(updateAns.modifiedCount === 1){
                res.statusCode = 200;
                res.json({
                    code: 20000,
                    msg:'update base roots success',
                    data:'success'
                });
                return;
            }else {
                res.statusCode = 404;
                res.json({
                    code: 710,
                    msg:'update base roots failed',
                    data:'data error!'
                });
                return;
            }
            
        }else {
            res.statusCode = 403;
            res.json({
                code: 709,
                msg:'update basic root failed',
                data:'no authority!',
            }); 
        }
    }, (err)=>{
        res.json({
            code: 708,
            msg:'update basic root failed',
            data:err,
        });
    })
})

// 删除base权限的内容
router.delete('/base', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const { id } = req.body;
        const user = await managerModule.findOne({name: data.username}, {roots:1, status:1});
        if(user.status === '0'){
            const deleteAns = await rootModule.deleteOne({_id: id}).exec();
            if(deleteAns.deletedCount === 1){
                res.statusCode = 200;
                res.json({
                    code: 20000,
                    msg:'delete root by id success',
                    data:'success'
                });
                return;
            }else {
                res.statusCode = 500;
                res.json({
                    code: 713,
                    msg:'delete root by id failed',
                    data:'please wait for a moment and retry!'
                });
                return;
            }
        }else {
            res.statusCode = 403;
            res.json({
                code: 712,
                msg:'delete root by id success',
                data:'no authority!'
            });
            return;
        }
    }, (err)=>{
        res.json({
            code: 711,
            msg:'delete root failed',
            data:err
        })
    })
})

// 添加base权限内容
router.post('/add', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const user = await managerModule.findOne({name: data.username}, {status:1}).exec();
        if(user.status === '0'){
            const { root } = req.body;
            const existAns = await rootModule.findOne({$and:[{title: root.title}, {path:root.path}]}).exec();
            if(existAns !== null){
                res.statusCode = 404;
                res.json({
                    code: 716,
                    msg:'append root failed',
                    data: 'root already exist!'
                });
                return;
            }
            await rootModule.create(root);
            res.statusCode = 200;
            res.json({
                code: 20000,
                msg:'append root success',
                data:'success'
            });
            return;
        }else {
            res.statusCode = 403;
            res.json({
                code: 715,
                msg:'append root failed',
                data: 'no authority!'
            });
        }
    }, (err)=>{
        res.json({
            code: 714,
            msg:'append root failed',
            data: err
        });
    });
})

router.delete('', handlerToken, (req, res)=>{
    req.verifyCall(async(data)=>{
        const user = await managerModule.findOne({name: data.username}, {status:1}).exec();
        if(user.status === '0'){
            const { id, userId } = req.body;
            const updateAns = await managerModule.updateOne({_id:userId}, {$pull:{roots:id}}).exec();
            if(updateAns.modifiedCount === 1){
                res.statusCode = 200;
                re.json({
                    code: 20000,
                    msg:'delete user root success',
                    data:'success'
                });
                return;
            } else {
                res.statusCode = 404;
                res.json({
                    code: 719,
                    msg:'delete user root failed',
                    data:'userId error'
                });
                return;
            }
        }else {
            res.statusCode = 403;
            res.json({
                code: 718,
                msg:'delete user root failed',
                data:'no authority!'
            });
            return;
        }
    }, (err)=>{
        res.json({
            code: 717,
            msg:'delete user root failed',
            data: err,
        });
    })
})

module.exports = router;