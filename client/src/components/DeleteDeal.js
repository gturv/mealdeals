import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import CheckIcon from '@material-ui/icons/Check';
import { Typography } from '@material-ui/core';

const DeleteDeal = (props) => {
    // This just deletes a deal, do you want to delete the entire restaurant??
    const [deleteState, setDeleteState] = useState(null)
    const location = useLocation()

    const history = useHistory()

    const id = location.pathname.split('/').pop()

    useEffect(() => { //fetchDeal
        axios.get(`/api/deal/${id}`).then(res => {
            setDeleteState(res)
        })
    }, [id])

    function handleDelete() {
        axios.delete(`api/deal/${id}`)
        history.push('/')
    }


    if (!deleteState) {
        return "Loading"
    }
    return (
        <div>
            <Typography variant="h3">
                Are you sure you want to delete the {deleteState.data.city} {deleteState.data.restaurant} {deleteState.data.days} {deleteState.data.deal} deal?
            </Typography>
            <br/>
            <Button href="/" color="default" variant="contained" startIcon={<KeyboardBackspaceIcon/>}>Back</Button>
            <Button style={{marginLeft: '60px'}} color="primary" variant="contained" onClick={handleDelete} endIcon={<CheckIcon/>}>Delete</Button>
        </div>
    )
};

export default DeleteDeal;