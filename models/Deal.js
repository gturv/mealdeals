const mongoose = require("mongoose");
const locationSchema = require("./Location");
const { Schema } = mongoose

const dealSchema = new Schema({
    restaurant: String,
    logoURL: String,
    location: [locationSchema],
    city: String,
    address: String,
    deal: String,
    foodURL: String,
    dayText: String,
    days: Array,
    time: String,
    qualityRating: Number,
    priceRating: Number,  
    valueRating: Number,
    highlyRecommended: { type: Boolean, default: false },
    belgianMoon: Boolean,
    description: String,
    allYouCanEat: Boolean,
    userUpVotes: { type: Number, default: 0},
    userDownVotes: { type: Number, default: 0}
});

mongoose.model('newDeal', dealSchema);