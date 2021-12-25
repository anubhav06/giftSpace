import styled from "styled-components";
import { FaUser, FaStarOfLife, FaEnvelope } from "react-icons/fa";
const colors = {
  orangeColor: "#F05454",
  darkBlueColor: "#30475E",
  blackColor: "#121212",
};

export const Form = styled.form`
  height: 80%;
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const RegWrapper = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserNameWrapper = styled.div`
  margin-block-start: 2rem;
  display: flex;
  /* background: red; */
  width: 80%;
  align-items: center;
  justify-content: space-between;
`;
export const MailWrapper = styled.div`
  margin-block-start: 2rem;
  display: flex;
  /* background: red; */
  width: 80%;
  align-items: center;
  justify-content: space-between;
`;
export const PasswordWrapper = styled.div`
  margin-block-start: 2rem;
  display: flex;
  /* background: red; */
  width: 80%;
  align-items: center;
  justify-content: space-between;
`;

export const InputWrapper = styled.input.attrs({ type: "text" })`
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  box-shadow: 4px 4px 20px grey;
  background: transparent;
  outline: none;
  min-width: 35%;
  width: 80%;
  height: 3rem;
`;
export const InputWrapperPass = styled.input.attrs({ type: "password" })`
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  box-shadow: 4px 4px 20px grey;
  background: transparent;
  outline: none;
  min-width: 35%;
  width: 80%;
  height: 3rem;
`;

export const UserIcon = styled(FaUser)`
  font-size: 19px;
  color: ${colors.orangeColor};
`;

export const PassIcon = styled(FaStarOfLife)`
  font-size: 19px;
  color: ${colors.orangeColor};
`;

export const SubmitButton = styled.input.attrs({ type: "submit" })`
  background: ${colors.darkBlueColor};
  font-size: 19px;
  color: white;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  width: 100px;
  margin-block: 2rem;
  cursor: pointer;
`;

export const MailIcon = styled(FaEnvelope)`
  font-size: 19px;
  color: ${colors.orangeColor};
`;
