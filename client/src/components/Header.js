import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { AppBar, Button, Typography, Toolbar } from '@material-ui/core';
import { VpnKey } from '@material-ui/icons'

import useStyles from './styles'
//if signed in, change button to say log out and route it to log out

const Header = props => {
    const history = useHistory();
    const classes = useStyles();
    const handleLogout = () => {
        axios.get('/logout')
        history.push('/')
        setSignedIn('false')
    };



    const location = useLocation()

    useEffect(() => {
        axios.get('/api/current_user').then(res => {
            if (!res.data || null) {
                setSignedIn(false)
            } else {
                setSignedIn(true)
            }
        })
    }, [location])

    const [signedIn, setSignedIn] = useState(false)




    const renderContent = () => {
        console.log('signedIn in renderContent', signedIn)
        if (signedIn === true) {
            return (
                <>
                    <Link to="/best">
                        <Button>Best Deals</Button>
                    </Link>
                    <Link to="/location">
                        <Button>Add Location</Button>
                    </Link>
                    <Link to="/add">
                        <Button>Add Deal</Button>
                    </Link>
                    <Link to="/new">
                        <Button>Add Restaurant</Button>
                    </Link>
                    <Button onClick={handleLogout} fullWidth={false}>Logout</Button>
                </>
            )
        }
        if (signedIn === false) {
            return (
                <>
                    <Link to="/best">
                        <Button>Best Deals</Button>
                    </Link>
                    <Link to="/signup"><Button fullWidth={false}>Sign up</Button></Link>
                    <Link to="/signin">
                        <Button  fullWidth={false} >
                            Sign in
                            <VpnKey />
                        </Button>
                    </Link>
                </>
            )
        }
        if (signedIn === null) {
            return <div>NULLLL</div>
        
        
        }
    }

    return (
        <div style={{ flexGrow: 1}}>
        <AppBar position="static" >
            <Toolbar style={{textColor: 'white'}}>
                <Link to='/'>
                    <Typography variant="h2" align="left" color="textPrimary" className={classes.root} style={{flex: 1}} >Meal Deal$</Typography>
                </Link>
                <div style={{marginLeft: 'auto'}}>
                    {renderContent()}
                </div>
            </Toolbar>   
        </AppBar>
        </div>
    )
};

export default Header;

/* <Link to='/best'>
<Button>Best Deals<Stars /></Button>
</Link> */