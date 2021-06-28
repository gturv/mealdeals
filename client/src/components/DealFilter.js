import React from 'react';
import {  Checkbox, FormGroup, FormControlLabel, Typography, Button } from '@material-ui/core'
import useStyles from './styles';

const DealFilter = props => {
    const classes = useStyles()
    return (
        <div  className={classes.filterBox}>
            <Typography variant="h4" align="center">Deal</Typography>
            <FormGroup row  onClick={e => props.toggleDealState(e)} >
                <FormControlLabel control={<Checkbox name="wings" color="primary" checked={props.dealsState.wings}/>} label="Wings" />
                <FormControlLabel control={<Checkbox name="apps" color="primary" checked={props.dealsState.apps} />} label="Appetizers"  />
                <FormControlLabel control={<Checkbox name="booze" color="primary" checked={props.dealsState.booze} />} label="Booze" />
                <FormControlLabel control={<Checkbox name="date" color="primary" checked={props.dealsState.date} />} label="Date Night" />
                <FormControlLabel control={<Checkbox name="burgers" color="primary" checked={props.dealsState.burgers} />} label="Burgers" />
                <FormControlLabel control={<Checkbox name="happy" color="primary" checked={props.dealsState.happy} />} label="Happy Hour" />
                <FormControlLabel control={<Checkbox  name="other" color="primary" checked={props.dealsState.other} />} label="Other" />
            </FormGroup>
            <Button onClick={props.toggleAllDealState} >All/NONE</Button>
        </div>
    )
};

export default DealFilter;

// checked={state.checkedB} as prop to Checkbox