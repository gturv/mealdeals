const mongoose =  require('mongoose');
//const bcrypt = require('bcrypt');
const passport = require('passport')

const Users = mongoose.model('users')

const checkAuthenticated = (req, res, next) => { //middleware i made to check login status
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/signin')
}

const checkNotAuthenticated = (req, res, next) => { //middleware i made to make sure user is not logged in
    if (req.isAuthenticated()) { // if they aren't signed in they can go to a route, but if they are we redirect them
        return res.redirect('/alreadysignedin')   // good way to redirect someone whos signed in away from a login or register page. 
    }
    
    return next()
}

module.exports = app => {
    app.post('/signup', async (req, res) => {
/*             const user = await Users.find({ email: req.body.email })
            console.log('user', user)
            if (!user) {
                console.log("Already an account")

            } */
            console.log(req.body)
            const hashed = await bcrypt.hash(req.body.password, 10)
            
            const newUser = new Users({
                email: req.body.email,
                password: hashed,
                dateRegistered: Date.now()
            });
            await newUser.save()
            res.redirect('/signinsuccess')
        });
            

    app.post('/signin', passport.authenticate('local'), (req, res) => {
        res.redirect('/')
    });//


    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

    app.get('/logout', (req, res) => { 
        req.logout(); // passport attached logout() automatically to the request object. logout() just kills the cookie
        res.redirect('/')});
};