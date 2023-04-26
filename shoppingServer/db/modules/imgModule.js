const mongoose = require('mongoose');

const ImgSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    img:{
        type: String,
        require: true
    }
});

const ImgModule = mongoose.model('imgs', ImgSchema);

module.exports = ImgModule;