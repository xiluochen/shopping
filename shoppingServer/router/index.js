const jwt = require('jsonwebtoken');

const loginRouter = require('./shopping/loginRouter.js');
const userRouter = require('./shopping/userRouter.js');
const commodityModule = require('./shopping/commodityRouter.js');
const recommendModule = require('./shopping/recommendRouter');
const payforRouter = require('./shopping/payforRouter');
const swiperRouter = require('./shopping/swiperRouter');
const { salt } = require('../config/app.config.js');

const backLoginRouter = require('./manager/loginRouter.js');
const userInfoRouter = require('./manager/userInfoRouter.js');
const paysRouter = require('./manager/paysRouter.js');
const brandRouter = require('./manager/brandRouter.js');
const overlistRouter = require('./manager/overlistRouter.js');
const controlUserRouter = require('./manager/usersRouter.js');
const rootRouter = require('./manager/rootRouter.js');

const imgRouter = require('./imgRouter.js');

module.exports = function (app){
    app.use('/login', loginRouter);
    app.use('/user', userRouter);
    app.use('/good', commodityModule);
    app.use('/recommend', recommendModule);
    app.use('/payfor', payforRouter);
    app.use('/swiper', swiperRouter);

    app.use('/back/login', backLoginRouter);
    app.use('/back/user', userInfoRouter);
    app.use('/back/pays', paysRouter);
    app.use('/back/brands', brandRouter);
    app.use('/back/overlist', overlistRouter);
    app.use('/back/control/users', controlUserRouter);
    app.use('/back/control/roots', rootRouter);

    app.use('/img', imgRouter);

    app.post('/logout', (req, res)=>{
        let token = req.get('token');

        jwt.verify(token, salt, (err, data)=>{
            if(err){
                res.statusCode = 404;
                res.json({
                    code:1008,
                    msg:'logout failed',
                    data:err
                })
                return;
            }
            res.send({
                code: 20000,
                msg:'logout success',
            });
        })
        
    })
}