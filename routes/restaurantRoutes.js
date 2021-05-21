const mongoose =  require('mongoose');

const MealDeal = mongoose.model('newDeal')

module.exports = app => {
    app.post('/api/deals/new', async (req, res) => {
        const { restaurant, logoURL, city, address, deal, foodURL, description, highlyRecommended,
            day, time, priceRating, qualityRating, valueRating, belgianMoon, allYouCanEat} = req.body
        const Deal = new MealDeal({
            restaurant, logoURL, city, address, deal, foodURL, description, highlyRecommended,
            day, time, priceRating, qualityRating, valueRating, belgianMoon, allYouCanEat
        })
        await Deal.save()
        res.send(req.body)
    },

    app.get('/api/deals', async (req, res) => {
        try {
            const deals = await MealDeal.find();
            return res.send(deals);
        } catch(error) {
            console.log(error.response)
        };
    })
)};