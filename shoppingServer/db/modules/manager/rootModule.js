const mongoose = require('mongoose');

const rootScheme = new mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    path:{
        type: String,
        require:true,
    },
});
const rootModule = mongoose.model('roots', rootScheme);

module.exports = rootModule;