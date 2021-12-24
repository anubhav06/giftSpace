import React from "react";
import {
  Logo,
  LoginWrapper,
  Button,
  NavWrapper,
} from "../StyledElements/NavElements";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <NavWrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo> GiftSpace</Logo>
        </Link>
        {/* if the user in already logged in then the log out button should show up and the resiter button should disappear  */}
        {/* when the user in not logged in then the login and register both buttons should be rendered */}
        <LoginWrapper>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </LoginWrapper>
      </NavWrapper>
    </>
  );
};

export default Navbar;
