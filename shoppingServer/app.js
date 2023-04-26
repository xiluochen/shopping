const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config/app.config');

const db = require('./db/index');
const importRoutes = require('./router/index');
const app = express();

const appendHeaders = (req, res, next)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
    next();
}

db(
    ()=>{
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(appendHeaders);
        importRoutes(app);

        app.listen(port, ()=>{
            console.log("连接已建立。。。。。");
        })
    }
);