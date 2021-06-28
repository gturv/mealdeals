import React, {  useState } from 'react';
import {  Link } from 'react-router-dom';
import AutocompleteInput from './AutocompleteInput'

import Button from '@material-ui/core/Button'
//import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
//import CheckIcon from '@material-ui/icons/Check';
import { Typography } from '@material-ui/core';
/* import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox' */
import { TextField } from '@material-ui/core';
import axios from 'axios';


const AddLocation = ({dealsData, signedIn, restaurantList }) => {

    const [autocompleteVal, setAutocompleteVal] = useState(null)
    const [newCity, setNewCity] = useState('')
    const [newAddress, setNewAddress] = useState('')

    const restaurantObject = dealsData.filter(r => r.restaurant === autocompleteVal)[0]
    console.log(restaurantObject)



    async function handleClick(e) {
        const addressArray = newAddress.split(',').map(address => address.toLowerCase().trim())
        const newLocationObject = { city: newCity.toLowerCase(), address: addressArray, id: restaurantObject._id }
        await axios.put('/api/add/location', newLocationObject)

/*         for (let loc of allDealsForChosenRestaurant[0].location) {
            if (loc.city === newCity) {
                loc.address.push(newAddress)
                console.log('updated allDeals - city already exists', allDealsForChosenRestaurant)
                return
            }
        } */
        //const updatedLocationArray = [...allDealsForChosenRestaurant[0].location, newLocationObject]
       // allDealsForChosenRestaurant.location = updatedLocationArray
       // console.log(newLocationObject)
        //console.log('updated', updatedLocationArray)
       // console.log('updated allDeals new city', allDealsForChosenRestaurant)
    }

    const renderLocationInput = () => {
        return (
            <div>
                <TextField value={newCity} name="city" onChange={e => setNewCity(e.target.value)} required label="City" />
                <br/>
                <TextField value={newAddress} name="address" onChange={e => setNewAddress(e.target.value)} required label="Address (sep multiple with commas)" />
                <br/>
                <Button onClick={handleClick} >Submit</Button>
            </div>
        )
        
    }

    if (!signedIn) {
        return (
            <div>
                <Typography variant="h5">You must be logged in</Typography>
                <Link to="/signin">Sign in</Link>
            </div>

        )
    }
    return (
        //pick a restaurant from autocomplete
        // return an array of all of the deal objects for that restaurant
        // take input of city and address of new city that is being added
        // turn this into state, and once that state exists
        // turn this input into an object {city: kitchener, address: 123 Fake St}
        // iterate through them and push the new object into the locations array on each deal object
        // we have now updated the dealData and need to send it back to the api to update the database
        // in back end - iterate through each item and findByIdAndUpdate() the old data in the database. 
        <div>
            <Typography variant="h4">Add additional locations to restuarants already in the system</Typography>
            <br/>
            <AutocompleteInput restaurantList={restaurantList} autocompleteVal={autocompleteVal} handleAutocompleteSelect={(e, v) => setAutocompleteVal(v)} />
            <br/>
            {autocompleteVal ? renderLocationInput() : ''}
        </div>
    )
};

export default AddLocation;