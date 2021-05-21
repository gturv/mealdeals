const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const Users = mongoose.model('users')

//const initialize = (passport) => {
//const authenticateUser = 
//        try {
//            if (await bcrypt.compare(password, user.password)) {

 //           } else {
//                return done(null, false, {message: 'Incorrect Password'})
   //         }
 //       } catch(error) {
 //           return done(error)
  //      }
//        return done(null, user)
  //  })




//module.export = authenticateUser
//};
//module.exports = initialize