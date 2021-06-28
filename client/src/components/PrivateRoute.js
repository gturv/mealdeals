/* import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { Auth } from './Auth'

export default async function PrivateRoute({children, ...rest}) {
    return ( // envoke render function everv time a route matches
        <Route {...rest} render={() => {
            Auth.authenthicate()
            return Auth.isAuthenticated === true ? children : <Redirect to='/' />
        } } />
    )
}
 */
// Here we are creating a Route to wrap