import React from 'react';

const addCheckedToState = (dayNum) => {
    setDays([...days, dayNum])
};

const removeUncheckedFromState = (dayNum) => {
    const newList = days.filter(day => day !== dayNum)
    console.log('new list', newList)
    setDays(newList)
    };


const handleChange = (e) => {
    //figure out which checkbox changed
    console.log('e in hangleChange', e)
    const dayNum = parseInt(e.target.value)
    console.log('daynum',dayNum)
    if (e.target.checked) {
        addCheckedToState(dayNum)
    } else {
        removeUncheckedFromState(dayNum)
    }
    console.log(days) 
    //figure out if it became checked === true vs false
    //if checked === true call addCheckedToState() with it
    //if not, call removedUncheckedFromState with it
}