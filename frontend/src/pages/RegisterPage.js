import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'
import {
    RegWrapper,
    Form,
    InputWrapper,
    SubmitButton,
    MailWrapper,
    UserIcon,
    MailIcon,
    UserNameWrapper,
    PasswordWrapper,
    PassIcon,
    InputWrapperPass,
  } from "../StyledElements/RegElements";

const RegisterPage = () => {

    let {user, registerUser} = useContext(AuthContext)

    // To not allow login route to a user who is logged in. Redirect to '/'
    if(user){
        return( <Redirect to="/gifts" /> )
    }

    return (
        <RegWrapper>
          <Form onSubmit={registerUser}>
            <MailWrapper>
              <MailIcon />
              <InputWrapper type="text" name="email" placeholder="Enter Email" />
            </MailWrapper>
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
              <InputWrapperPass
                type="password"
                name="password"
                placeholder="Enter Password"
              />
            </PasswordWrapper>
    
            <PasswordWrapper>
              <PassIcon />
              <InputWrapperPass
                type="password"
                name="confirmPassword"
                placeholder="Enter Password Again"
              />
            </PasswordWrapper>
    
            <SubmitButton type="submit" />
          </Form>
        </RegWrapper>
    );
}

export default RegisterPage
