const mongoose = require("mongoose");
const { Schema } = mongoose

const userSchema = new Schema({
    email: String,
    password: String,
    dateRegistered: Date,
    admin: { type: Boolean, default: false },
    
})

mongoose.model('users', userSchema);