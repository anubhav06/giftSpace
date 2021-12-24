import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

const LandingPage = () => {
    let {user, loginUser} = useContext(AuthContext)

    // To not allow login route to a user who is logged in. Redirect to '/'
    if(user){
        return( <Redirect to="/" /> )
    }

    return (
        <p> THIS IS THE LANGING PAGE THIS CONTAINS INTRO ETC.</p>
    )
}

export default LandingPage
