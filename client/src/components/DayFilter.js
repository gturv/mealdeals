import React from 'react';
import { Checkbox, FormGroup, FormControlLabel, Typography, Button } from '@material-ui/core';
import useStyles from './styles';

const DayFilter = props => {
    const classes = useStyles()
    return ( //(e) => props.onChange(parseInt(event.target.value))}
        <div className={classes.filterBox}>
        <Typography variant="h4" align="center">Day</Typography>
        <FormGroup row onClick={e => props.toggleDayState(e) }  >
            <FormControlLabel control={<Checkbox name={'monday'} checked={props.daysState.monday } color="secondary"/>} label="Monday" />
            <FormControlLabel control={<Checkbox name={'tuesday'} checked={props.daysState.tuesday} color="secondary"/>} label="Tuesday" />
            <FormControlLabel control={<Checkbox name={'wednesday'} checked={props.daysState.wednesday} color="secondary"/>} label="Wednesday" />
            <FormControlLabel control={<Checkbox name={'thursday'} checked={props.daysState.thursday} color="secondary"/>} label="Thursday" />
            <FormControlLabel control={<Checkbox name={'friday'} checked={props.daysState.friday} color="secondary"/>} label="Friday" />
            <FormControlLabel control={<Checkbox name={'saturday'} checked={props.daysState.saturday} color="secondary"/>} label="Saturday" />
            <FormControlLabel control={<Checkbox name={'sunday'} checked={props.daysState.sunday} color="secondary"/>} label="Sunday" />
        </FormGroup>
        <Button onClick={props.toggleAllDayState}>All/NONE</Button>
        </div>
    ) 
};

export default DayFilter;

// onClick={(e) => props.toggleState(e)}
//onClick={(e) => props.toggleState(e)}

/* checked={daystate.
    checked={daystate.
    checked={daystate.
    checked={daystate.
    checked={daystate.
    checked={daystate.
    checked={daystate. */