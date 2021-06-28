import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Divider, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import DealFilter from './DealFilter';
import DayFilter from './DayFilter';
import AdvancedSearch from './AdvancedSearch';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';
import AutocompleteInput from './AutocompleteInput'
import DealList from './DealList';
import useGeolocation from './hooks/useGeolocation';

const Landing = ({ dealsData, signedIn, restaurantList, cityList }) => {
    const classes = useStyles();

    const getDate = () => {
        const now = new Date()
        return now.getDay()    
    }
   
    const [daysState, setDays ] = useState({
        monday: false || getDate() === 1,
        tuesday: false || getDate() === 2,
        wednesday: false || getDate() === 3,
        thursday: false || getDate() === 4,
        friday: false || getDate() === 5,
        saturday: false || getDate() === 6,
        sunday: false || getDate() === 0,
    })

    const [dealsState, setDeals] = useState({
        wings: true,  
        apps: false,
        booze: false,
        date: false,
        burgers: false,
        happy: false,
        other: false,
    })

        //state for advanced search
    const [quality, setQuality] = useState(0);
    const [val, setVal] = useState(0);
    const [price, setPrice] = useState(0);
    const [allYouCanEat, setAllYouCanEat] = useState(false);
    const [arrayChanged, setArrayChanged] = useState(false);
    const [autocompleteVal, setAutocompleteVal] = useState(null)
    const [cityState, setCityState] = useState('guelph')
    const [dealsDataCity, setDealsDataCity] = useState([])
    const [lastBoxClicked, setBoxDealClicked] = useState(null)

    const geolocation = useGeolocation

    const handleQualityChange = (e, v) => {
        setQuality(v)
    };

    const handlePriceChange = (e, v) => {
        setPrice(v)
    };

    const handleValChange = (e, v) => {
        setVal(v)
    };

    const toggleDayState = (e) => {
        const target = e.target.checked  // true or false
        const name = e.target.name // === monday
        setDays({ ...daysState,  [name]: target })
        setBoxDealClicked(name)
        
    };
    
    const toggleDealState = (e) => {
        const target = e.target.checked  // true or false
        const name = e.target.name // === wings
        setDeals({ ...dealsState,  [name]: target })
        setBoxDealClicked(name)
    };
    // onClick for button
    const toggleAllDealState = (e) => {
        if (Object.values(dealsState).some(el => el === false)) { // if atleast one checkbox not checked..
            setDeals({ //...dealsState,// check all the boxes
                wings: true,  
                apps: true,
                booze: true,
                date: true,
                burgers: true,
                happy: true,
                other: true,
            })
        } else { // or else if they're all checked, then uncheck them all
            setDeals({
                wings: false,  
                apps: false,
                booze: false,
                date: false,
                burgers: false,
                happy: false,
                other: false,
            })
        }
    }

    const toggleAllDayState = e => {
        if (Object.values(daysState).some(el => el === false)) { // if atleast one checkbox not checked..
            setDays({
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true
            })
        } else {
            setDays({
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            })
        }
    }

    const handleAutocompleteSelect = (e, v) => {
        setAutocompleteVal(v)
    }
    const handleAutocompleteCity = (e, v) => {
        setCityState(v)
    }


    console.log('dealsdataCITY', dealsDataCity)
    console.log('cityState', cityState)

    useEffect(() => {
        setDealsDataCity(dealsData.filter(restaurant => restaurant.locations.some(loc => loc.city === cityState)))
    },[dealsData, cityState])

    

    const adminControls = () => {
        if (signedIn) {
            return (
                <>
                    <Link to='/new'>
                        <Fab aria-label="new" style={{backgroundColor: 'red', color: 'white'}} >
                            <AddIcon />
                        </Fab>
                    </Link>
                </>
            )
        } else {
            return ""
        } 
    }

    return (
        <div className={classes.root}>
            <br/>
            <Autocomplete
                onChange={(e, v) => handleAutocompleteCity(e, v)}
                autoComplete={false}
                id="autocompleteCity"
                autoSelect={true}
                renderInput={(params) => <TextField {...params} label='Search for your city' variant="outlined"/> }
                options={cityList}
                noOptionsText="Sorry, your city is not supported yet"
                value={cityState} />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <DealFilter toggleDealState={value => toggleDealState(value)} toggleAllDealState={toggleAllDealState} dealsState={dealsState} setDeals={setDeals}  />
                </Grid>
                <Grid item xs={6}>
                    <DayFilter toggleDayState={value => toggleDayState(value)} toggleAllDayState={toggleAllDayState} daysState={daysState} setDays={setDays} />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <AdvancedSearch  setAllYouCanEat={setAllYouCanEat} 
                    handlePriceChange={handlePriceChange} handleValChange={handleValChange} price={price} val={val} 
                    quality={quality}  allYouCanEat={allYouCanEat} handleQualityChange={handleQualityChange} />
                </Grid>
                <Grid item xs={6}>
                    <AutocompleteInput dealsData={dealsData} handleAutocompleteSelect={handleAutocompleteSelect} autocompleteVal={autocompleteVal} restaurantList={restaurantList} />
                </Grid>
            </Grid>
            <Divider style={{ marginTop: '15px' }} />
            <DealList dealsState={dealsState} daysState={daysState} quality={quality} setArrayChanged={setArrayChanged}
            val={val} price={price} allYouCanEat={allYouCanEat} lastBoxClicked={lastBoxClicked} arrayChanged={arrayChanged} 
            dealsData={dealsData} autocompleteVal={autocompleteVal} signedIn={signedIn} cityState={cityState} cityList={cityList} dealsDataCity={dealsDataCity} />
            {adminControls()}
        </div>
    )
};

export default Landing; 