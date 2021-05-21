// This keys.js file contains logic to determine which set of credentials to return
if (process.env.NODE_ENV === 'production') { // this would mean we are in production and need those keys
    module.exports = require('./prod')
} else { // this would mean we are in development environment, return dev keys
    module.exports = require('./dev')  // import the dev keys and then export them to whichever file is asking for them
}