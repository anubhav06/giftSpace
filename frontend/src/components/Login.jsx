import React from "react";
import {
  LoginWrapper,
  Form,
  UserNameWrapper,
  PasswordWrapper,
  InputWrapper,
  InputWrapperPass,
  UserIcon,
  PassIcon,
  SubmitButton,
} from "../StyledElements/LoginElements";
import { Logo } from "../StyledElements/NavElements";
const Login = () => {
  return (
    <LoginWrapper>
      {/* add loginUser in OnSubmit of the Form... I have removed it due to the error */}
      <Form>
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
          <InputWrapperPass
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </PasswordWrapper>
        <SubmitButton type="submit" />
      </Form>
    </LoginWrapper>
  );
};

export default Login;
