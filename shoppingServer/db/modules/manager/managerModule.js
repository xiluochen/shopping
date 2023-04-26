const mongoose = require('mongoose');
const PayModule = require('./payModule');
const BrandModule = require('./brandModule');

const ManagerScheme = new mongoose.Schema({
    name: {
        type: String,
        require:true,
    },
    pwd: {
        type: String,
        require: true,
    },
    avator: {
        type: String,
        default: "",
        require: false
    },
    phone: {
        type: String,
        default:'',
        require: false
    },
    email:{
        type: String,
        default: '',
        require: false
    },
    loc:{
        type: String,
        default: '',
        require: false
    },
    pays:[{
        type: mongoose.Types.ObjectId,
        ref:'pays'
    }],
    commodities: [{
        type: mongoose.Types.ObjectId,
        ref:'commodities'
    }],
    brands: [{
        type:mongoose.Types.ObjectId,
        ref:'brands'
    }],
    roots:{
        type: [mongoose.Types.ObjectId],
        ref:'roots'
    },
    users: {
        type: [mongoose.Types.ObjectId],
        ref:'managers'
    },
    status:{
        type: String,
        default:'1'
    },
});

const managerModule = mongoose.model('managers', ManagerScheme);

module.exports = managerModule