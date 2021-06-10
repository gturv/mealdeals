//require('dotenv').config
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys')
const flash = require('express-flash');
const session = require('express-session');
require('./models/Deal');
require('./models/Users');
const Users = mongoose.model('users')

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const app = express(); // create an instance of an express server

app.use(express.json());
app.use(express.urlencoded({extended: false}))
//app.use(flash());
app.use(session({
    secret: 'fffffeeetrrrrtt',
    resave: false, // should we resave our session vars if nothing changed?
    saveUninitialized: false // should we save an empty value if there is no value?
}));
app.use(passport.initialize()) // initializes using data from initializePassport call
app.use(passport.session()); // sicne we want to store cookie throughout the whole session

passport.use(new LocalStrategy(async (username, password, done) => {
    await Users.findOne({ username: username }, (err, user) => {
       console.log('1userobject', user)
       console.log('2password', password)
       console.log('3user.password', user.password)
       if (err) {
           console.log('1err', err)
           return done(err)
       }
       if (!user) { // if user isn't found, we call done with null, false because that should be the user, and an error message
           console.log('2err', user)
           return done(null, false, {message: "No user found"})
       }
       if (password !== user.password) {
           console.log('pass getting passed to passport', password)
           return done(null, false, {message: "wrong password"});
       }
       console.log('done')
       return done(null, user)
       })}))
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
   Users.findById(id).then(user => {
       done(null, user)
   });
});

require('./routes/restaurantRoutes')(app)
require('./routes/loginRoutes')(app)


if (process.env.NODE_ENV == 'production') { // this ensures  Express behaves correctly in production when we no longer have the create react app server
    app.use(express.static('client/build'))// Express will serve up production assets like main.js or main.css (specific paths). This request needs to be first in line
    
    const path = require('path'); // Express will serve up the index.html file if it doesn't know the route 
    app.get('*', (req, res) => {  // this is the final check (comes last), so if none of the prev attempts to match up request are correct, we default to serving index.html
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 5000 // This allows Heroku to dynamically assign a port, but default is 5000 for development
app.listen(PORT) 