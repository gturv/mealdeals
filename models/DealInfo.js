const mongoose = require("mongoose");
//const locationSchema = require("./Location");
const { Schema } = mongoose

const dealInfoSchema = new Schema({
    deal: String,    
    foodURL: String,
    dayText: String,
    days: Array,
    time: String,
    qualityRating: Number,
    priceRating: Number,  
    valueRating: Number,
    highlyRecommended: { type: Boolean, default: false },
    description: String,
    allYouCanEat: Boolean,
    userUpVotes: { type: Number, default: 0},
    userDownVotes: { type: Number, default: 0}
});
module.exports = dealInfoSchema;