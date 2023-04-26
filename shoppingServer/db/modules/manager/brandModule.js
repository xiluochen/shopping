const mongoose = require('mongoose');

const BrandScheme = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: false,
        default:''
    },
    description: {
        type: String,
        require: false,
        default: ''
    }
});

const BrandModule = mongoose.model('brands', BrandScheme);

module.exports = BrandModule;