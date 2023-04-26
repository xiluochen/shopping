const mongoose = require('mongoose');

const locationsSchema = new mongoose.Schema({
    target: {
        type:String,
        required:true,
    },
    loc:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    default:{
        type:Boolean,
        default:false
    }
})
const locationsModule = mongoose.model('locations', locationsSchema);

const shopCarSchema = new mongoose.Schema({
    target: {
        type:mongoose.Types.ObjectId,
        ref:"commodities",
        required:true,
    },
    num:{
        type:Number,
        default:1
    }
})
const shopCarModule = mongoose.model('shopcars', shopCarSchema);

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    avator:{
        type:String,
        default:"",
    },
    shopcars: [{
        type:mongoose.Types.ObjectId,
        ref:'shopcars'
    }],
    locations: [{
        type:mongoose.Types.ObjectId,
        ref:'locations'
    }]

})

const userModule = mongoose.model('users', userSchema);

module.exports = {
    userModule,
    shopCarModule,
    locationsModule
};