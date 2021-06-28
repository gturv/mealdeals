import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CheckIcon from '@material-ui/icons/Check';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import { TextField } from '@material-ui/core';
import _ from 'lodash';

const EditDeal = (props) => {
    const [editState, setEditState] = useState(null)
    const location = useLocation()
    const [dateMsg, setDateMsg] = useState('')

    const history = useHistory()

    const id = location.pathname.split('/').pop()

    

    const handleChange = e => setEditState({...editState, [e.target.name]: e.target.value})

/*     const handleSubmit = e => {
        e.preventDefault
    } */

    useEffect(() => { //fetchDeal
        axios.get(`/api/deal/${id}`).then((res) => {
            let specifiedDeal 
            console.log('res.dataaa', res.data)
            console.log('dealzzzz', res.data.deals)
            for (let d of res.data.deals) {
                if (d._id === id) {
                    specifiedDeal = d
                }
            }
            console.log('specified deal', specifiedDeal)
            const responseObjext = {...specifiedDeal, restaurant: res.data.restaurant, belgianMoon: res.data.belgianMoon, logoURL: res.data.logoURL}
            console.log(responseObjext) 
            setEditState(responseObjext)
            setDateMsg(responseObjext.days)
//            dateRef.current = responseObjext
            
        })
    }, [id])

    console.log('editState', editState)

    const handleSubmit = () => {
        axios.put(`/api/deal_edit`, editState)
        history.push('/')
    }

    
    const handleDays = (e) => {
        console.log('e.target', e.target)
        const name = e.target.name // === monday
        if (e.target.checked === true) {
            setEditState({ ...editState, days: [ ...editState.days, name] } )
        } else {
            setEditState({ ...editState, days: editState.days.filter(d => d !== name) })
        }
        
        };  
        
    

    if (!editState) {
        return "Loading"
    }


//onSubmit={handleSubmit}
    if (props.signedIn) {
        return(
            <div>
                <Typography variant="h3">Editing {editState.restaurant} {dateMsg} {editState.deal} deal </Typography>
                    <form >
                    <br/>
                    <TextField type="text" required name='foodURL' label="Food URL" value={editState.foodURL} onChange={handleChange} ></TextField>
                    <br/>
                    <FormGroup row onClick={handleDays}  >
                        <FormControlLabel control={<Checkbox name={'monday'} defaultChecked={editState.days.includes('monday') ? true : false} color="secondary"/>} label="Monday" />
                        <FormControlLabel control={<Checkbox name={'tuesday'} defaultChecked={editState.days.includes('tuesday') ? true : false} color="secondary"/>} label="Tuesday" />
                        <FormControlLabel control={<Checkbox name={'wednesday'} defaultChecked={editState.days.includes('wednesday') ? true : false} color="secondary"/>} label="Wednesday" />
                        <FormControlLabel control={<Checkbox name={'thursday'} defaultChecked={editState.days.includes('thursday') ? true : false} color="secondary"/>} label="Thursday" />
                        <FormControlLabel control={<Checkbox name={'friday'} defaultChecked={editState.days.includes('friday') ? true : false} color="secondary"/>} label="Friday" />
                        <FormControlLabel control={<Checkbox name={'saturday'} defaultChecked={editState.days.includes('saturday') ? true : false} color="secondary"/>} label="Saturday" />
                        <FormControlLabel control={<Checkbox name={'sunday'} defaultChecked={editState.days.includes('sunday') ? true : false} color="secondary"/>} label="Sunday" />
                    </FormGroup>
                    <br/>
                    <TextField required disabled={_.keys(_.pickBy(editState.days)).length > 1 ? false : true} type="text" name='dayText' label="Day Text (ie Mon - Fri)" value={editState.dayText} onChange={handleChange}></TextField>
                    <br/>
                    <TextField type="text" required name='time' label="Time" value={editState.time} onChange={handleChange}></TextField>
                    <br/>
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Quality</InputLabel>
                        <Select inputProps={{name: "qualityRating"}} value={editState.qualityRating} onChange={handleChange}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>

                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Price</InputLabel>
                        <Select inputProps={{name: "priceRating"}} value={editState.priceRating} onChange={handleChange}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>

                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Value</InputLabel>
                        <Select inputProps={{name: "valueRating"}} value={editState.valueRating} onChange={handleChange}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Highly Recommended?</InputLabel>
                        <Select inputProps={{name: "highlyRecommended"}} value={editState.highlyRecommended} onChange={handleChange}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl style={{minWidth: 183}} >
                        <InputLabel >All you can eat?</InputLabel>
                        <Select inputProps={{name: "allYouCanEat"}} value={editState.allYouCanEat} onChange={handleChange}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Select>
                    </FormControl>
                    <br/>
                    <TextField multiline required value={editState.description} onChange={handleChange} type='textarea' label="Description" name="description" rows={6} style={{ paddingBottom: 20 }}/>
                    <br/>
                    <br/>
                    <Button href="/" color="default" variant="contained" startIcon={<KeyboardBackspaceIcon/>}>Back</Button>
                    <Button style={{marginLeft: '60px'}} onClick={handleSubmit} color="primary" variant="contained" endIcon={<CheckIcon/>}>Submit</Button>
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

export default EditDeal;

/* <TextField value={editState.restaurant} required onChange={handleChange} type="text" name='restaurant' label="Restaurant Name" ></TextField>
<br/>
<TextField value={editState.logoURL} required type="text" onChange={handleChange} name='logoURL' label="Logo URL" ></TextField>
<br/>
<FormControl style={{minWidth: 183}}>
    <InputLabel htmlFor="city" >City</InputLabel>
        <Select name='city' value={editState.city} onChange={handleChange} >
        <option value="DEFAULT" disabled>Choose a City</option>
        <option value="guelph">Guelph</option>
        <option value="kitchener">Kitchener/Waterloo</option>
        </Select>
</FormControl>
<br/>
<TextField type="text" name='address' required label="Address" value={editState.address} onChange={handleChange} ></TextField>
<br/> 
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Beligan Moon?</InputLabel>
                        <Select inputProps={{name: "belgianMoon"}} value={editState.belgianMoon} onChange={handleChange}>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Select>
                    </FormControl>
                                  
                    <FormControl style={{minWidth: 183}}>
                        <InputLabel >Deal Type</InputLabel>
                        <Select  inputProps={{name: "deal"}} value={editState.deal} onChange={handleChange}>
                            <option value="wings">Wings</option>
                            <option value="apps">Appetizers</option>
                            <option value="booze">Booze</option>
                            <option value="date">Date Night</option>
                            <option value="burgers">Burgers</option>
                            <option value="happy">Happy Hour</option>
                            <option value="other">Other</option>
                        </Select>
                    </FormControl>
                */