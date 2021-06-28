import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DealCard from './DealCard';
//import axios from 'axios';
import _ from 'lodash';

const DealListNEWOBJECT = ({ allYouCanEat, val, price, quality, daysState, dealsState, dealsData, signedIn, cityState, cityList, dealsDataCity }) => {
    const refArray = useRef(null)

    const searchTermDeals = _.keys(_.pickBy(dealsState)); // creates array of whats checked off ['wednesday']
    const searchTermDays = _.keys(_.pickBy(daysState)) //   ['wings', 'burgers']


    // Displays a message to the user if no deals display
    const noDealsMsg = () => {
        const daysOr =  searchTermDays.join(' or ')
        const dealsOr = searchTermDeals.join(' or ')
        if (searchTermDays < 1) {
            return 'Please select at least one day'
        }
        if (searchTermDeals < 1) {
            return 'Please select at least one deal type'
        }
        return `There aren't any good ${dealsOr} deals on ${daysOr}, please try another search`
    }

    const createInitialDealObjectStateArray = () => {
        let filteredDeals = []
        let filteredDays = []

        for (let searchTerm of searchTermDeals) { // searchTerm would be 'wings' in    ['wings', 'burgers' ]
            for (let r of dealsDataCity) {   // for each restaurant object in the datalist...
                for (let d of r.deals)  // loop through each deal object within the deals array for the restaurant
                    if (d.deal === searchTerm) {  // if the deal object deal type matches the food thats checked off
                        d.restaurant = r.restaurant
                        d.logoURL = r.logoURL
                        d.location = r.location
                        filteredDeals.push(d)}  // add it to filteredDeals
            }
        };
        for (let searchTerm of searchTermDays) { // searchTerm === monday
            for (let r of dealsDataCity) {
                for (let d of r.deals)
                    if (d.days.includes(searchTerm)) {
                        d.restaurant = r.restaurant
                        d.logoURL = r.logoURL
                        d.location = r.location
                        filteredDays.push(d)}
            }
        };
        
        const combinedUniqueDeals = _.intersection(filteredDeals, filteredDays)
        const ar = combinedUniqueDeals.filter(d => d.qualityRating >= quality)
                                .filter(d => d.priceRating >= price).filter(d => d.valueRating >= val)
        return ar
    }
    
    const initialObjectArray = createInitialDealObjectStateArray()

    // Function that takes in dealObjectArray, either adds, removes, or leaves it alone, and updates the state
    const updateObjectArray = (dealObjectArray) => {
        if (!dealObjectArray) {
        //    refArray.current = initialObjectArray
            return initialObjectArray
        }
        const entireDiplayedList = createInitialDealObjectStateArray()
        const newObjectsToAdd = _.differenceWith(entireDiplayedList, dealObjectArray, _.isEqual)
        if (newObjectsToAdd.length > 0) {
            refArray.current = newObjectsToAdd.concat(dealObjectArray)
            return newObjectsToAdd.concat(dealObjectArray)
        }
        if (newObjectsToAdd.length < 1) {
            const oldObjectsToRemove = _.differenceWith(dealObjectArray, entireDiplayedList, _.isEqual)
           // const oldObjectsRemoved = _.differenceWith(dealObjectArray, oldObjectsToRemove, _.isEqual)
            const oldObjectsRemoved = _.pullAllWith(dealObjectArray, oldObjectsToRemove, _.isEqual)
            refArray.current = oldObjectsRemoved
            return oldObjectsRemoved
        }
    };

    const updatedObjectArray = updateObjectArray(refArray.current || initialObjectArray)


    const renderList = (dealObjectArray) => {
        if (dealsData.length < 1) {
            return "Loading"
        }    
        if (allYouCanEat) {
            return dealObjectArray.filter(d => d.allYouCanEat).map(({ deal, _id, days, description, foodURL, logoURL, qualityRating, valueRating, priceRating, time, userDownVotes, dayText, userUpVotes }) => {
                return (<Grid item xs={12} md={6} key={_id}>
                            <DealCard deal={deal} description={description} foodURL={foodURL} dayText={dayText} days={days}
                            logoURL={logoURL} qualityRating={qualityRating} valueRating={valueRating} priceRating={priceRating}
                            time={time} userDownVotes={userDownVotes} userUpVotes={userUpVotes} signedIn={signedIn} id={_id} ></DealCard>
                        </Grid>
                )}
            )
        }
        if (!dealObjectArray || dealObjectArray.length < 1 ) {
            return (
                <div style={{margin: 'auto'}}>
                    <Typography align='center' variant='h4'>
                        {noDealsMsg()}
                    </Typography>
                </div>
            )
        }

        return dealObjectArray.map(({ deal, _id, days, description, foodURL, logoURL, qualityRating, valueRating, priceRating, time, userDownVotes, userUpVotes, dayText }) => {
            return (<Grid item xs={12} md={6} key={_id}>
                        <DealCard deal={deal} description={description} foodURL={foodURL} dayText={dayText} days={days}
                        logoURL={logoURL} qualityRating={qualityRating} valueRating={valueRating} priceRating={priceRating}
                        time={time} userDownVotes={userDownVotes} userUpVotes={userUpVotes} signedIn={signedIn} id={_id} ></DealCard>
                    </Grid>
        )}
            )
    }
    console.log('refArray', refArray.current)
    console.log('------------NEW RENDER-----------')
    return (
        <div style={{marginTop: 15}}>
                <Grid container spacing={3}>
                    {renderList(updatedObjectArray)} 
                </Grid>
                    
        </div>
     )
}

export default DealListNEWOBJECT;