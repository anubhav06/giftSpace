import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Redirect } from 'react-router-dom'
import {
    LoginWrapper,
    Form,
    UserNameWrapper,
    PasswordWrapper,
    InputWrapper,
    UserIcon,
    PassIcon,
    SubmitButton,
  } from "../StyledElements/LoginElements";
  import { Logo } from "../StyledElements/NavElements";

const LoginPage = () => {
    let {user, loginUser} = useContext(AuthContext)

    // To not allow login route to a user who is logged in. Redirect to '/'
    if(user){
        return( <Redirect to="/gifts" /> )
    }

    return (
        <LoginWrapper>
          {/* add loginUser in OnSubmit of the Form... I have removed it due to the error */}
          <Form onSubmit={loginUser}>
            {/* <Logo> GiftSpace</Logo> */}
            <UserNameWrapper>
              <UserIcon />
              <InputWrapper
                type="text"
                name="username"
                placeholder="Enter Username"
              />
            </UserNameWrapper>
            <PasswordWrapper>
              <PassIcon />
              <InputWrapper
                type="password"
                name="password"
                placeholder="Enter Password"
              />
            </PasswordWrapper>
            <SubmitButton type="submit" />
          </Form>
        </LoginWrapper>
      );
}

export default LoginPage
