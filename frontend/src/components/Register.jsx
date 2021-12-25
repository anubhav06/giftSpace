import React from "react";
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
const Register = () => {
  return (
    <RegWrapper>
      <Form>
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
};

export default Register;
