const mongoose = require("mongoose");
const { Schema } = mongoose
const locationSchema = require('./Location')
const dealSchema = require('./Deal')

// not using this set up, but for scaling this will make it more conveniant. Have the 
// restaurant at the root of the data structure, array of cities its in (maybe object with hours and address)
// but that extra info is probably not necessary. DealSchema will be an array of deal objects for each 
// different type 
const restaurantSchema = new Schema({
    city: [String], // city, address, hours
    dealType: [dealSchema], 
    logo: String,
    belgianMoon: Boolean
})

mongoose.model('restaurants', restaurantSchema);