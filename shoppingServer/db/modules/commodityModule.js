const mongoose = require('mongoose');

const commoditySchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    imgUrl: {
        type:mongoose.Types.ObjectId,
    },
    price: {
        type:Number,
        default: 0,
    }
});

const commodityModule = mongoose.model('commodities', commoditySchema);

module.exports = commodityModule;