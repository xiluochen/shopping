const util = require('util');
const jwt = require('jsonwebtoken');
const {salt} = require('../config/app.config');


const handlerToken = (req, res, next)=>{
    req.token = req.get('token');
    req.verify = util.promisify(jwt.verify);
    req.verifyCall = (function(success, failed){
        const { token } = this;
        try{
            this.verify(token, salt)
            .then((data)=>{
                success(data).catch((err)=>{
                    res.statusCode = 404;
                    failed(err);
                });
            })
            .catch((err)=>{
                // err.name err.message
                if(err.name === 'TokenExpiredError'){
                    res.statusCode = 503;
                }else {
                    res.statusCode = 404;
                }
                failed(err);
            });
        }catch(err){
            // err.name err.message
            res.statusCode = 404;
            failed(err);
        }
    }).bind(req);
    next();
}

module.exports = {
    handlerToken
}