import React, {useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'
import {
  Logo,
  LoginWrapper,
  Button,
  NavWrapper,
} from "../StyledElements/NavElements";


const Navbar = () => {

    let {user, logoutUser} = useContext(AuthContext)
    return (
        <>
        <NavWrapper>
            <Link to="/" style={{ textDecoration: "none" }}>
            <Logo> GiftSpace</Logo>
            </Link>
            {/* if the user in already logged in then the log out button should show up and the resiter button should disappear  */}
            {/* when the user in not logged in then the login and register both buttons should be rendered */}
            <LoginWrapper>

            {/* If user is logged in then show logout button else show login button */}
            {user ? (
                <Link to="">
                    <Button onClick={() => logoutUser()}>Logout</Button>
                </Link>
            ): (
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
            )}          

            {user ? (
                <Link to="/gifts">
                    <Button> Mange Gifts </Button>
                </Link>
            ) : 
            (
                <Link to="/register">
                    <Button>Register</Button>
                </Link>
            )}  
            
            {user ? (
                <Link to="/tracking">
                    <Button> Track Gifts </Button>
                </Link>
            ) : (null)}  
            
            </LoginWrapper>
        </NavWrapper>
        </>
    );
};

export default Navbar;