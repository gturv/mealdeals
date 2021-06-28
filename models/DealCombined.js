const mongoose = require("mongoose");
const locationSchema = require("./Location");
const dealInfoSchema = require("./DealInfo")
const { Schema } = mongoose

const dealCombinedSchema = new Schema({
    restaurant: String,
    logoURL: String,
    locations: [locationSchema],
    deals: [dealInfoSchema],
    belgianMoon: Boolean,
});

mongoose.model('newCombinedDeal', dealCombinedSchema);