import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
//import _ from 'lodash'

const AutocompleteInput = ({ handleAutocompleteSelect, autocompleteVal, restaurantList }) => {
   // const restaurantNames = _.uniq(dealsData.map(r => r.restaurant))

    return (
    <Autocomplete
        onChange={(e, v) => handleAutocompleteSelect(e, v)}
        autoComplete={false}
        id="autocompleteInput"
        autoSelect={true}
        renderInput={(params) => <TextField {...params} label='Search Restaurants' variant="outlined"/> }
        options={restaurantList}
        noOptionsText="Sorry, no deals for that restaurant"
        value={autocompleteVal}
    //    getOptionLabel={option => option.restaurant}
    // this set up would work if i changed my data structure to have resturant name at the root....
    // otherwise I will have multiple different resturant deals showing up in the autocomplete.
    />
    )
}

export default AutocompleteInput;

// getOptionLable   allows you to search based on various attributes
// renderOption