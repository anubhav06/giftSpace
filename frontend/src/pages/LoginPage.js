import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

const LoginPage = () => {
    let {user, loginUser} = useContext(AuthContext)

    // To not allow login route to a user who is logged in. Redirect to '/'
    if(user){
        return( <Redirect to="/" /> )
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage
