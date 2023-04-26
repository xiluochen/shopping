const mongoose = require('mongoose');
const commodityModule = require('../commodityModule');

const PaySchema = new mongoose.Schema({
    payName: {
        type:String,
        require: true,
    },
    payForName: {
        type: String,
        require:false,
    },
    payForInfo: {
        type: mongoose.Types.ObjectId,
        ref:'commodities',
    },
    nums: {
        type: Number,
        require: true,
    },
    loc: {
        type: String,
        require: true
    },
});

const PayModule = mongoose.model('pays', PaySchema);

module.exports = PayModule;