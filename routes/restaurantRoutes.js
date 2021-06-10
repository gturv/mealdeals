const mongoose =  require('mongoose');
const _ = require('lodash');
const { get } = require('lodash');

const MealDeal = mongoose.model('newDeal')

module.exports = app => {

  /*   function handleErrors(err, obj) {
        if (err) {
            console.log('api error:', err)
        } else {
            res.send(obj)
            console.log('Success:', obj)
        }
    } */

    app.post('/api/deals/new', async (req, res) => {
        const { restaurant, logoURL, city, address, deal, foodURL, description, highlyRecommended, specifyOther, dayText,
            day, days, time, priceRating, qualityRating, valueRating, belgianMoon, allYouCanEat} = req.body
            // run a check on whether or not days has any actual values
            if (_.keys(_.pickBy(days)).length > 0) {
         //   if (daysArray.length > 0) {
                const Deal = new MealDeal({
                    restaurant, logoURL, city, address, deal, foodURL, description, highlyRecommended, specifyOther, dayText,
                    day, days: _.keys(_.pickBy(days)), time, priceRating, qualityRating, valueRating, belgianMoon, allYouCanEat
                })
                await Deal.save()
                res.send(req.body)
            } else {
                const Deal = new MealDeal({
                    restaurant, logoURL, city, address, deal, foodURL, description, highlyRecommended, dayText,
                    day, time, priceRating, qualityRating, valueRating, belgianMoon, allYouCanEat, specifyOther
                })
                await Deal.save()
                res.send(req.body)
            }
            // if not, assign null
            // create array of true values for days
    }),

    app.get('/api/deals', async (req, res) => {
        try {
            const deals = await MealDeal.find();
            return res.send(deals);
        } catch(error) {
            console.log(error.response)
        };
    })

    app.get('/api/deal/:id', async (req, res) => {
     //   console.log('res delete id', res.req.params.id)
        await MealDeal.findOne({ _id: res.req.params.id}, (err, deal) => {
            if (err) {
            console.log(err)
            }
            res.send(deal)
        })
        
    })
        // deletes a deal
    app.delete('/api/deal/:id', async (req, res) => {
        await MealDeal.findByIdAndDelete(res.req.params.id)
        }
    )
        // pulls data from a restaurant so new deals can be added for that restaurant
    app.get('/api/add_deal/:restaurant', async (req, res) => {
        console.log('add_deal', req)
        await MealDeal.findOne({ restaurant: res.req.params.restaurant }, (err, restaurant) => {
            if (err){
                console.log(err)
            }
            res.send(restaurant)   
        })
    })
        //edits a deal
    app.put('api/deal_edit', async (req, res) => {
        const { restaurant, logoURL, city, address, deal, foodURL, description, highlyRecommended, specifyOther, dayText,
            day, days, time, priceRating, qualityRating, valueRating, belgianMoon, allYouCanEat, _id} = req.body
            console.log('req.body edit',req.body)
        await MealDeal.findByIdAndUpdate(_id, { restaurant, logoURL, city, address, deal, foodURL, description, highlyRecommended, specifyOther, dayText,
            day, days, time, priceRating, qualityRating, valueRating, belgianMoon, allYouCanEat },
            (err, obj) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(obj)
                }
            } )
    })

};