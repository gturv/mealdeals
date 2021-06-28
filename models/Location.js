const mongoose = require("mongoose");
const { Schema } = mongoose

const locationSchema = new Schema({
    city: String,
    address: [String],
});

module.exports = locationSchema;