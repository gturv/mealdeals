import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//import PrivateRoute from './PrivateRoute';
import axios from 'axios';
import Header from './Header';
import SignIn from './SignIn';
import SignUp from './SignUp'
import AddDeal from './AddDeal';
import Landing from './Landing';
import BestDeals from './BestDeals';
import EditDeal from './EditDeal';
import Copyright from './Copyright';
import DeleteDeal from './DeleteDeal';
import AddLocation from './AddLocation';
import NewRestaurant from './NewRestaurant';
//import Test from './Test';
import { Container, CssBaseline } from '@material-ui/core';
import _ from 'lodash'

//import 'fontsource-roboto';
//import useStyles from './styles'

const App = props => {
//    const classes = useStyles();
    const [signedIn, setSignedIn] = useState(false)
    const [dealsData, setDealsData] = useState([]);
    const [restaurantList, setRestaurantList] = useState([])



    const checkSignedIn = async () => {
        const user = await axios.get('/api/current_user');
        user.data ? setSignedIn(true) : setSignedIn(false)
    }
    const fetchDeals = async () => {
        const response = await axios.get('/api/deals');
        setDealsData(response.data)
        return response.data
    }
    console.log('dealsData APP', dealsData)

    useEffect(() => {
        checkSignedIn()
    }, [signedIn])

    useEffect(() => {
    fetchDeals().then(res => setRestaurantList(_.uniq(res.map(r => r.restaurant))))
    }, []) 

    const allCities = dealsData.map(restaurant => restaurant.locations.map(loc => loc.city))
    const cityList = _.uniq(allCities.flat()).filter(el => el !== undefined)

    console.log('restaurantlist app level', restaurantList)
    console.log('cityList APP', cityList)




    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Container >
                    <Header signedIn={signedIn}  />
                    <Route path='/' exact render={props => <Landing {...props} dealsData={dealsData} signedIn={signedIn} restaurantList={restaurantList} cityList={cityList} />} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/delete/:id' exact component={DeleteDeal} />
                    <Route path="/edit/:id" exact render={props => <EditDeal {...props} dealsData={dealsData} signedIn={signedIn} restaurantList={restaurantList} />} />
                    <Route path='/add' render={props => <AddDeal {...props} dealsData={dealsData} signedIn={signedIn} restaurantList={restaurantList} />}  />
                    <Route path="/new" exact render={props => <NewRestaurant {...props} dealsData={dealsData} signedIn={signedIn} />} />
                    <Route path="/location" render={props => <AddLocation {...props} dealsData={dealsData} signedIn={signedIn} restaurantList={restaurantList} />}  />
                    <Route path='/best' component={BestDeals} />
                   
                    <Copyright />
                </Container>
            </BrowserRouter>
        </>
    )
};

export default App;

/* STILL TO DO:

 <Route path='/test' component={Test} />
- New Data structure - restaurants at the root. Multiple days for happy hour - maybe for all. 
    Have a field called days (instead of day) which sometimes will contain an array of all the days
    the deal is on for. Then could render days || day - this will prevent multiple cards showing up for happy hour

- Validation on sign in/sign up forms
- Sign up
- Private Routes (/add)
- Best deals page?
- Patios?
/ */