const mongoose =  require('mongoose');
const _ = require('lodash');


//const Restaurants = mongoose.model('newDeal')
const Restaurants = mongoose.model('newCombinedDeal')

module.exports = app => {
    // New restuarant + deal - WORKING
    app.post('/api/new', async (req, res) => {
        const { restaurant, logoURL, city, address, belgianMoon, deal, foodURL, description, highlyRecommended, dayText,
        time, priceRating, qualityRating, valueRating, allYouCanEat, multipleDays, autocompleteVal, 
        days, specifyOther } = req.body
        console.log(req.body)
        const addresses = address.split(',').map(add => add.trim())
        //const daysArray = _.keys(_.pickBy(days))
        // should also check if restaurant exists, if so return an error
        const existingRestaurant = await Restaurants.findOne({ restaurant: restaurant })
        console.log('existingRestaurant', existingRestaurant)
        if (existingRestaurant) {
                res.send("Error - restaurant already exists")
                return
        }
        const RestaurantInstance = new Restaurants({ 
            restaurant, 
            logoURL, 
            belgianMoon, 
            locations: [{city, address: addresses}],
            deals: [{deal, foodURL, description, highlyRecommended, dayText, days, specifyOther,
                    time, priceRating, qualityRating, valueRating, allYouCanEat, multipleDays, autocompleteVal, 
                }]
        })
        await RestaurantInstance.save()
      //      if (err) {
     //           console.err(err)
     //       } else {
        console.log('successful post new restaurant') 
        res.send('Successfully posted new restaurant + deal')
       //     }

        }    
    )

    // Add a deal to an existing restaurant - WORKING
    app.post('/api/add/deal', async (req, res) => {
        const { restaurantName, deal, foodURL, description, highlyRecommended, specifyOther, dayText,
            days, time, priceRating, qualityRating, valueRating, allYouCanEat, autocompleteVal} = req.body
           // const daysArray = _.keys(_.pickBy(days))
            //console.log('days array', daysArray)
            //const rest = await Restaurants.findOne( { restaurant: autocompleteVal })
            //console.log('rest', rest)
            /* rest.deals.push({ 
                deal, foodURL, description, highlyRecommended, specifyOther, dayText,
                days, time, priceRating, qualityRating, valueRating, allYouCanEat 
                })  */
            await Restaurants.updateOne( { restaurant: autocompleteVal || restaurantName },
            { $push: { 
                deals: { 
                deal, foodURL, description, highlyRecommended, specifyOther, dayText,
                days, time, priceRating, qualityRating, valueRating, allYouCanEat 
                }
            } }
            ) 
            res.send('recieved')
        console.log('new deal added') 
        }
        )

    // Fetch all deal - WORKING
    app.get('/api/deals', async (req, res) => {
        try {
            const deals = await Restaurants.find();
            return res.send(deals);
        } catch(error) {
            console.log(error.response)
        };
    })

    app.put('/api/add/location', async (req, res) => {
        const { city, address, id} = req.body
        const locationObject = { city, address }
        await Restaurants.findById( id, async (err, restaurant) => {
            let locationId = ''
            for (locObj of restaurant.locations) {
                if (locObj.city === city) { //locObj is from database
                    console.log('city exists, checking addresses')
                        locationId = locObj.id
                        for (ad of address) {
                            console.log('ad', ad)
                            console.log('locObj.address', locObj.address)
                            if (!locObj.address.includes(ad)){ // if the database address includes ad address element
                                console.log('new address being pushed into existing city')
                                await Restaurants.updateOne(
                                    { "locations._id": locationId},
                                   { $push: {'locations.$[].address': ad}},    
                                    {new: true, safe: true}
                                ).exec()
                                }    
                            }

                } else { //if the city is not present - append the entire location object into locations array
                    Restaurants.updateOne({ _id: id}, { $push: { 
                        locations: locationObject
                    } }, {new: true}
                    ).exec()
                console.log('new city being added')
                return
                }
        }   }
        )
            // if it is, check to see if any of the addresses are already present in address array

                //if not, concat them to the address array

                //if so, only concat the ones not already present (or just remove duplicates after adding)

            //if the city is not present, append the locationObject to the locations array

    })


    // Fetch deal to edit - WORKING
    app.get('/api/deal/:id', async (req, res) => {
        //console.log('detch data to edit', res.req.params.id)
        const id = res.req.params.id
        await Restaurants.findOne({ "deals._id": id}, (err, deal) => {
           // console.log('deal object', deal)
            if (err) {
            console.log(err)
            }
            res.send(deal)
        })

        
    })
        // deletes a deal - WORKING
    app.delete('/api/deal/:id', async (req, res) => {
        const id = res.req.params.id
        await Restaurants.updateOne(
            { "deals._id": id},
            { $pull: { deals: { _id: id}
            }}
        )
        }
    )

        //edits a deal
    app.put('/api/deal_edit', async (req, res) => { // restaurant, logoURL, city, address, belgianMoon,
        const { restaurant, deal, foodURL, description, highlyRecommended, specifyOther, dayText,
            days, time, priceRating, qualityRating, valueRating, allYouCanEat, _id} = req.body
            console.log('req.body edit',req.body)
        await Restaurants.updateOne(
            { restaurant,  "deals._id": _id},
            { $set: { deals: {foodURL, deal, description, highlyRecommended, specifyOther, dayText,
                    days, time, priceRating, qualityRating, valueRating, allYouCanEat} } },
            (err, obj) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(obj)
                }
            } )
        console.log('update successful?')
    })


};