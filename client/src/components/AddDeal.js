import React from 'react';
import { Link } from 'react-router-dom';
//import AutocompleteInput from './AutocompleteInput'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
//import TextBox from './TextBox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CheckIcon from '@material-ui/icons/Check';
import { TextField, Typography } from '@material-ui/core';
import _ from 'lodash';

import axios from 'axios'


class AddDeal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurant: '', logoURL: '', city: 'guelph', address: '', deal: 'wings', foodURL: '', description: '', highlyRecommended: false, dayText: '',
            time: '', priceRating: 1, qualityRating: 1, valueRating: 1,  allYouCanEat: false, multipleDays: false, autocompleteVal: 'Fat Duck', 
            days: {monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false}, otherSpecify: '', autocompleteData: {restaurant: '', logoURL: '', address: ''}
        }
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value})

    //handleChangeAC = e => this.setState({})

    handleDays = e => {
        const target = e.target.checked  // true or false
        const name = e.target.name // === monday
        this.setState({ days: {...this.state.days,  [name]: target }})
        };    

    handleSubmit = async (e) => {
        e.preventDefault()
        if (_.keys(_.pickBy(this.state.days)).length < 1) {
            
            alert('Must check off atleast one day')
            return
        }
        console.log(this.state.restaurant)
        await axios.post('/api/add/deal', this.state)
        alert('Form successfully submitted. You can modify some inputs to submit another similar deal')
               
    }

    handleAutocompleteSelect = (e, v) => {
        this.setState({ autocompleteVal: v})
        console.log('autocomplete State AddDeal', this.state.autocompleteVal)
    };

    fetchInfo = () => {
        console.log('dealsData', this.props.dealsData)
        const info = this.props.dealsData.find(deal => deal.restaurant === this.state.autocompleteVal)
        this.setState({ autocompleteData: {address: info.address, restaurant: info.restaurant, logoURL: info.logoURL}}, () => {
            console.log('autocompleteData', this.state.autocompleteData)
        })
        
    }
    


     componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.autocompleteVal !== this.state.autocompleteVal) {
            this.fetchInfo()
           // axios.get(`/api/add_deal/${this.state.autocompleteVal}`).then(
          //      res => this.setState({autocompleteData: res.data}))
          //      console.log('pulled data for that restaurant', this.autocompleteData)
            //this.state.restaurant = this.state.autocompleteData.restaurant,
            //this.state.logoURL = this.state.autocompleteData.logoURL
            }    
        }
     
  
        
    
    // Does not work - error because its uncontrolled to controlled
    //value={this.state.autocompleteData.restaurant || restaurant}
    //value={this.state.autocompleteData.logoURL || logoURL}
    //value={this.state.autocompleteData.address || address}
    //dealsData={this.props.dealsData} handleAutocompleteSelect={this.handleAutocompleteSelect} autocompleteVal={this.state.autocompleteVal}
    render(){//autocompleteDAta

        const { city, deal, foodURL, description, highlyRecommended,
        time, priceRating, qualityRating, valueRating,  allYouCanEat, specifyOther, autocompleteVal, autocompleteData } = this.state
        if (this.props.signedIn) {
            return ( //onSubmit={this.props.handlSubmit(this.props.onSurveySubmit)}
                <div>
                    <Typography variant="h4">Add a deal for a restaurant that's already in the system</Typography>
                    <Link to="/new">Restaurant not in system</Link>
                    <Autocomplete 
                        autoComplete={false}
                        id="autocompleteInput"
                        autoSelect={false}
                        renderInput={(params) => <TextField {...params} label='Search Restaurants' variant="outlined" /> }
                        options={this.props.restaurantList}
                        noOptionsText="Restaurant not found"
                        value={autocompleteVal}
                        style={{marginTop: 15, width: '25%'}}
                        onChange={(e, v) => this.handleAutocompleteSelect(e, v)}
                    // onInputChange={(e, v) => this.setState({autocompleteInput: v}) }
                        />
                        
                    <form onSubmit={this.handleSubmit}>
                        
                        <TextField value={autocompleteData.logoURL} required type="text" onChange={this.handleChange} name='logoURL' label="Logo URL" ></TextField>
                        <br/>
                        <FormControl style={{minWidth: 183}}>
                            <InputLabel htmlFor="city" >City</InputLabel>
                                <Select name='city' value={city} onChange={this.handleChange} >
                                <option value="DEFAULT" disabled>Choose a City</option>
                                <option value="guelph">Guelph</option>
                                <option value="kitchener">Kitchener/Waterloo</option>
                                </Select>
                        </FormControl>
                        <br/>
                        <FormControl style={{minWidth: 183}}>
                            <InputLabel >Deal Type</InputLabel>
                            <Select  inputProps={{name: "deal"}} value={deal} onChange={this.handleChange}>
                                <option value="wings">Wings</option>
                                <option value="apps">Appetizers</option>
                                <option value="booze">Booze</option>
                                <option value="date">Date Night</option>
                                <option value="burgers">Burgers</option>
                                <option value="happy">Happy Hour</option>
                                <option value="other">Other</option>
                            </Select>
                        </FormControl>
                        <br/>
                        <TextField type="text" required name="specifyOther" label="Specify if 'Other'" value={specifyOther} onChange={this.handleChange} disabled={deal === 'other' ? false : true} />
                        <br/>
                        <TextField type="text" required name='foodURL' label="Food URL" value={foodURL} onChange={this.handleChange} ></TextField>
                        <br/>
                        <FormGroup row onClick={this.handleDays}  >
                            <FormControlLabel control={<Checkbox disabled={this.state.days === false ? true : false} name={'monday'} checked={this.state.days.monday ? true : false} color="secondary"/>} label="Monday" />
                            <FormControlLabel control={<Checkbox disabled={this.state.days === false ? true : false} name={'tuesday'} checked={this.state.days.tuesday ? true : false} color="secondary"/>} label="Tuesday" />
                            <FormControlLabel control={<Checkbox disabled={this.state.days === false ? true : false} name={'wednesday'} checked={this.state.days.wednesday ? true : false} color="secondary"/>} label="Wednesday" />
                            <FormControlLabel control={<Checkbox disabled={this.state.days === false ? true : false} name={'thursday'} checked={this.state.days.thursday ? true : false} color="secondary"/>} label="Thursday" />
                            <FormControlLabel control={<Checkbox disabled={this.state.days === false ? true : false} name={'friday'} checked={this.state.days.friday ? true : false} color="secondary"/>} label="Friday" />
                            <FormControlLabel control={<Checkbox disabled={this.state.days === false ? true : false} name={'saturday'} checked={this.state.days.saturday ? true : false} color="secondary"/>} label="Saturday" />
                            <FormControlLabel control={<Checkbox disabled={this.state.days === false ? true : false} name={'sunday'} checked={this.state.days.sunday ? true : false} color="secondary"/>} label="Sunday" />
                        </FormGroup>
                        <br/>
                        <TextField required disabled={_.keys(_.pickBy(this.state.days)).length > 1 ? false : true} type="text" name='dayText' label="Day Text (ie Mon - Fri)" value={this.state.dayText} onChange={this.handleChange}></TextField>
                        <br/>
                        <TextField type="text" required name='time' label="Time" value={time} onChange={this.handleChange}></TextField>
                        <br/>
                        <FormControl style={{minWidth: 183}}>
                            <InputLabel >Quality</InputLabel>
                            <Select inputProps={{name: "qualityRating"}} defaultValue={qualityRating} value={qualityRating} onChange={this.handleChange}>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 183}}>
                            <InputLabel >Price</InputLabel>
                            <Select inputProps={{name: "priceRating"}} defaultValue={priceRating} value={priceRating} onChange={this.handleChange}>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </Select>
                        </FormControl>

                        <FormControl style={{minWidth: 183}}>
                            <InputLabel >Value</InputLabel>
                            <Select inputProps={{name: "valueRating"}} value={valueRating} onChange={this.handleChange}>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </Select>
                        </FormControl>
                        <br/>
                        <FormControl style={{minWidth: 183}}>
                            <InputLabel >Highly Recommended?</InputLabel>
                            <Select inputProps={{name: "highlyRecommended"}} defaultValue={highlyRecommended} value={highlyRecommended} onChange={this.handleChange}>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </Select>
                        </FormControl>
                        <br/>
                        <FormControl style={{minWidth: 183}} >
                            <InputLabel >All you can eat?</InputLabel>
                            <Select inputProps={{name: "allYouCanEat"}} defaultValue={allYouCanEat} value={allYouCanEat} onChange={this.handleChange}>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </Select>
                        </FormControl>
                        <br/>
                        <TextField multiline required value={description} onChange={this.handleChange} type='textarea' label="Description" name="description" rows={6} style={{ paddingBottom: 20 }}/>
                        <br/>
                        <Button href="/" color="default" variant="contained" startIcon={<KeyboardBackspaceIcon/>}>Back</Button>
                        <Button style={{marginLeft: '60px'}} type="submit" color="primary" variant="contained" endIcon={<CheckIcon/>}>Submit</Button>
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <Typography variant="h5">You must be logged in</Typography>
                    <Link to="/signin">Sign in</Link>
                </div>
            )
        }      
    } 
};

export default AddDeal;

    
    /* const [restaurant, setRestaurant] = useState('')
    const [logoURL, setLogoURL] = useState('')

    const handleRestaurantChange = e => setRestaurant(e.target.value)
    const handleSetLogoURLChange = e => setLogoURL(e.target.value)
    const handleSubmit = async (e) => {
        const data = { restaurant, logoURL }
        await axios.post('/api/restaurants/new', data)

<TextField value={autocompleteData.restaurant} required onChange={this.handleChange} type="text" name='restaurant' label="Restaurant Name" ></TextField>
                        <br/>


    } */