const mongoose = require('mongoose');

const { dbUrl, dbPort, dbName } = require('../config/db.config');

function db(success){
    mongoose.connect(`mongodb://${dbUrl}:${dbPort}/${dbName}`)

    mongoose.connection.once('open', ()=>{
        success();
    })

    mongoose.connection.once('error', (err)=>{
        console.log(err, 'error')
    });
    mongoose.connection.once('close', ()=>{
        console.log('close');
    })
}

module.exports = db;