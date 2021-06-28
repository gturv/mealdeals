import React, {  useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CheckIcon from '@material-ui/icons/Check';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select';
import { TextField } from '@material-ui/core';
import _ from 'lodash';


const NewRestaurant = (props) => {
    const [newRestaurantData, setNewRestaurantData] = useState({ restaurant:'', logoURL: '', city: '', address: '', belgianMoon: false,
    deal: 'wings', foodURL: '', description: '', highlyRecommended: false, dayText: '',
    time: '', priceRating: 1, qualityRating: 1, valueRating: 1, allYouCanEat: false, multipleDays: false, autocompleteVal: null, 
    days: [], otherSpecify: '' })

    const [newDealData, setNewDealData] = useState({ restaurantName: newRestaurantData.restaurant, deal: 'wings', foodURL: '', description: '', highlyRecommended: false, dayText: '',
    time: '', priceRating: 1, qualityRating: 1, valueRating: 1, belgianMoon: false, allYouCanEat: false, multipleDays: false, autocompleteVal: null, 
    days: [], otherSpecify: '' })


    const [restaurantLabel, setRestaurantLabel] = useState('')

    const history = useHistory()

    const handleChange = e => setNewRestaurantData({...newRestaurantData, [e.target.name]: e.target.value})

    const handleChangeDeal = e => setNewDealData({...newDealData, [e.target.name]: e.target.value})

    //this.setState({ days: {...this.state.days,  [name]: target }})

    const handleDays = (e) => {
        const checked = e.target.checked
        const name = e.target.name // === monday
        if (checked) {
            setNewRestaurantData({ ...newRestaurantData, days: [ ...newRestaurantData.days, name] } )
        } else {
            setNewRestaurantData({ ...newRestaurantData, days: newRestaurantData.days.filter(d => d !== name) })
        }
    };


    const handleDaysDeal = (e) => {
        const checked = e.target.checked
        const name = e.target.name // === monday
        if (checked) {
            setNewDealData({ ...newDealData, days: [ ...newDealData.days, name] } )
        } else {
            setNewDealData({ ...newDealData, days: newDealData.days.filter(d => d !== name) })
        }
        setNewDealData([...newDealData.days, name] )
    };

    const handleSubmit = async (e) => {
        const res = await axios.post('/api/new', newRestaurantData )
        alert(res.data)
        history.push('/')
    }

    const handleSubmitDone = async (e) => {
        const res = await axios.post('/api/add/deal', newRestaurantData )
        console.log(res)
        history.push('/')
    }

    const handleSubmitAddAnother = async (e) => {
        const res = await axios.post('/api/new', newRestaurantData )
        console.log(res)
        setRestaurantLabel(`Add another deal for ${newRestaurantData.restaurant}`)
        alert('Deal successfully submitted. You can modify some inputs to submit another for this restaurant')
    }

    const handleSubmitAddAnotherOne = async (e) => {
        const res = await axios.post('/api/add/deal', newRestaurantData )
        console.log(res)
        setRestaurantLabel(`Add another deal for ${newRestaurantData.restaurant}`)
        alert('Deal successfully submitted. You can modify some inputs to submit another for this restaurant')
    }


    console.log(newRestaurantData)
//onSubmit={handleSubmit}
    if (!props.signedIn) {
        return (
            <div>
                <Typography variant="h5">You must be logged in</Typography>
                <Link to="/signin">Sign in</Link>
            </div>
        )}
    if (!restaurantLabel) {
        return(
            <div>
                <Typography variant="h3">Add a new restaurant to the system </Typography>
                    <form  >
                    <TextField value={newRestaurantData.restaurant} required onChange={handleChange} type="text" name='restaurant' label="Restaurant Name" ></TextField>
                    <br/>
                    <TextField value={newRestaurantData.logoURL} required type="text" onChange={handleChange} name='logoURL' label="Logo URL" ></TextField>
                    <br/>
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel htmlFor="city" >City</InputLabel>
                            <Select name='city' value={newRestaurantData.city} onChange={handleChange} >
                            <option value="DEFAULT" disabled>Choose a City</option>
                            <option value="guelph">Guelph</option>
                            <option value="kitchener">Kitchener/Waterloo</option>
                            </Select>
                    </FormControl>
                    <br/>
                    <TextField type="text" name='address' required label="Address" value={newRestaurantData.address} onChange={handleChange} ></TextField>
                    <br/>
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Beligan Moon?</InputLabel>
                        <Select inputProps={{name: "belgianMoon"}} defaultValue={newRestaurantData.belgianMoon} value={newRestaurantData.belgianMoon} onChange={handleChange}>
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <Typography variant="h4">Add their first deal to the system </Typography>
                    <br/>
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Deal Type</InputLabel>
                        <Select  inputProps={{name: "deal"}} value={newRestaurantData.deal} onChange={handleChange}>
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
                    <TextField type="text" required name="specifyOther" label="Specify if 'Other'" value={newRestaurantData.specifyOther} onChange={handleChange} disabled={newRestaurantData.deal === 'other' ? false : true} />
                    <br/>
                    <TextField type="text" required name='foodURL' label="Food URL" value={newRestaurantData.foodURL} onChange={handleChange} ></TextField>
                    <br/>
                    <FormGroup row onClick={handleDays}  >
                        <FormControlLabel control={<Checkbox name={'monday'}  color="secondary"/>} label="Monday" />
                        <FormControlLabel control={<Checkbox name={'tuesday'}  color="secondary"/>} label="Tuesday" />
                        <FormControlLabel control={<Checkbox name={'wednesday'}  color="secondary"/>} label="Wednesday" />
                        <FormControlLabel control={<Checkbox name={'thursday'}  color="secondary"/>} label="Thursday" />
                        <FormControlLabel control={<Checkbox name={'friday'}  color="secondary"/>} label="Friday" />
                        <FormControlLabel control={<Checkbox name={'saturday'}  color="secondary"/>} label="Saturday" />
                        <FormControlLabel control={<Checkbox name={'sunday'}  color="secondary"/>} label="Sunday" />
                    </FormGroup>
                    <br/>
                    <TextField required disabled={_.keys(_.pickBy(newRestaurantData.days)).length > 1 ? false : true} type="text" name='dayText' label="Day Text (ie Mon - Fri)" value={newRestaurantData.dayText} onChange={handleChange}></TextField>
                    <br/>
                    <TextField type="text" required name='time' label="Time" value={newRestaurantData.time} onChange={handleChange}></TextField>
                    <br/>
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Quality</InputLabel>
                        <Select inputProps={{name: "qualityRating"}} value={newRestaurantData.qualityRating} onChange={handleChange}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>

                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Price</InputLabel>
                        <Select inputProps={{name: "priceRating"}} value={newRestaurantData.priceRating} onChange={handleChange}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>

                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Value</InputLabel>
                        <Select inputProps={{name: "valueRating"}} value={newRestaurantData.valueRating} onChange={handleChange}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Highly Recommended?</InputLabel>
                        <Select inputProps={{name: "highlyRecommended"}} value={newRestaurantData.highlyRecommended} onChange={handleChange}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl style={{minWidth: 183}} >
                        <InputLabel >All you can eat?</InputLabel>
                        <Select inputProps={{name: "allYouCanEat"}} value={newRestaurantData.allYouCanEat} onChange={handleChange}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <TextField multiline required value={newRestaurantData.description} onChange={handleChange} type='textarea' label="Description" name="description" rows={6} style={{ paddingBottom: 20 }}/>
                    <br/>
                    <br/>
                    <Button href="/" color="default" variant="contained" startIcon={<KeyboardBackspaceIcon/>}>Back</Button>
                    <Button style={{marginLeft: '60px'}} color="primary" variant="contained" onClick={(e) => handleSubmit(e)} endIcon={<CheckIcon/>}>Submit and finish</Button>
                    <Button style={{marginLeft: '60px'}} color="primary" variant="contained" onClick={e => handleSubmitAddAnother(e)} endIcon={<CheckIcon/>}>Submit and another deal for this restaurant</Button>
                </form>
            </div>
        )
    } 
    if (restaurantLabel) {
        return (
            <div>
                <Typography variant="h3">Add a new restaurant to the system </Typography>
                <form>
                <FormControl style={{minWidth: 183}}>
                        <InputLabel >Deal Type</InputLabel>
                        <Select  inputProps={{name: "deal"}} value={newDealData.deal} onChange={handleChangeDeal}>
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
                    <TextField type="text" required name="specifyOther" label="Specify if 'Other'" value={newDealData.specifyOther} onChange={handleChangeDeal} disabled={newDealData.deal === 'other' ? false : true} />
                    <br/>
                    <TextField type="text" required name='foodURL' label="Food URL" value={newDealData.foodURL} onChange={handleChangeDeal} ></TextField>
                    <br/>
                    <FormGroup row onClick={handleDaysDeal}  >
                        <FormControlLabel control={<Checkbox name={'monday'}  color="secondary"/>} label="Monday" />
                        <FormControlLabel control={<Checkbox name={'tuesday'}  color="secondary"/>} label="Tuesday" />
                        <FormControlLabel control={<Checkbox name={'wednesday'}  color="secondary"/>} label="Wednesday" />
                        <FormControlLabel control={<Checkbox name={'thursday'}  color="secondary"/>} label="Thursday" />
                        <FormControlLabel control={<Checkbox name={'friday'}  color="secondary"/>} label="Friday" />
                        <FormControlLabel control={<Checkbox name={'saturday'}  color="secondary"/>} label="Saturday" />
                        <FormControlLabel control={<Checkbox name={'sunday'}  color="secondary"/>} label="Sunday" />
                    </FormGroup>
                    <br/>
                    <TextField required disabled={_.keys(_.pickBy(newDealData.days)).length > 1 ? false : true} type="text" name='dayText' label="Day Text (ie Mon - Fri)" value={newDealData.dayText} onChange={handleChangeDeal}></TextField>
                    <br/>
                    <TextField type="text" required name='time' label="Time" value={newDealData.time} onChange={handleChangeDeal}></TextField>
                    <br/>
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Quality</InputLabel>
                        <Select inputProps={{name: "qualityRating"}} value={newDealData.qualityRating} onChange={handleChangeDeal}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>

                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Price</InputLabel>
                        <Select inputProps={{name: "priceRating"}} value={newDealData.priceRating} onChange={handleChangeDeal}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>

                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Value</InputLabel>
                        <Select inputProps={{name: "valueRating"}} value={newDealData.valueRating} onChange={handleChangeDeal}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Highly Recommended?</InputLabel>
                        <Select inputProps={{name: "highlyRecommended"}} value={newDealData.highlyRecommended} onChange={handleChangeDeal}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl style={{minWidth: 183}} >
                        <InputLabel >All you can eat?</InputLabel>
                        <Select inputProps={{name: "allYouCanEat"}} value={newDealData.allYouCanEat} onChange={handleChangeDeal}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <TextField multiline required value={newDealData.description} onChange={handleChangeDeal} type='textarea' label="Description" name="description" rows={6} style={{ paddingBottom: 20 }}/>
                    <br/>
                    <br/>
                    <Button href="/" color="default" variant="contained" startIcon={<KeyboardBackspaceIcon/>}>Back</Button>
                    <Button style={{marginLeft: '60px'}} color="primary" variant="contained" onClick={(e) => handleSubmitDone(e)} endIcon={<CheckIcon/>}>Submit and finish</Button>
                    <Button style={{marginLeft: '60px'}} color="primary" variant="contained" onClick={e => handleSubmitAddAnotherOne(e)} endIcon={<CheckIcon/>}>Submit and another deal for this restaurant</Button>
                </form>
            </div>
        )
    }
}

export default NewRestaurant;