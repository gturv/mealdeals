import React from 'react';
import TextField from '@material-ui/core/TextField'

const TextBox = props => {
    return (
        <div>
            <TextField label={props.label} placeholder={props.placeholder} />
        </div>
    )
};

export default TextBox;
// could do placeholder prop in textfield for true, false 1-3 hints etc

// <label>{props.label}</label>
// <input label="add a deal" />