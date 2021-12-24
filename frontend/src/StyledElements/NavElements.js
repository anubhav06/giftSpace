import styled from "styled-components";

const colors = {
  orangeColor: "#F05454",
  darkBlueColor: "#30475E",
  blackColor: "#121212",
};

export const NavWrapper = styled.div`
  padding: 2rem 4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media only screen and (max-width: 480px) {
    gap: 20px;
    padding: 1rem;
  }
`;

export const Logo = styled.h1`
  color: ${colors.orangeColor};
  font-weight: 600;
  @media only screen and (max-width: 480px) {
    font-size: 27px;
  }
`;

export const LoginWrapper = styled.div`
  max-width: 14rem;
  min-width: 10rem;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  background-color: transparent;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.darkBlueColor};
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  padding: 0.4rem 0;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background-color: ${colors.orangeColor};
    transition: 0.5s ease-in-out;
  }
  &:hover::after {
    width: 100%;
    transition: 0.5s ease-in-out;
  }
  @media only screen and (max-width: 480px) {
    font-size: 15px;
  }
`;