import styled from "styled-components";
const colors = {
  orangeColor: "#F05454",
  darkBlueColor: "#30475E",
  blackColor: "#121212",
};

export const HeroWrapper = styled.div`
  height: 80.5vh;
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  padding: 3rem 4rem;
  /* background-color: red; */
  @media only screen and (max-width: 480px) {
    display: block;
    padding: 1rem;
    width: 100%;
    margin-top: 1.9rem;
  }
`;

export const Left = styled.div`
  max-width: 100%;
  width: 50%;
  height: 100%;
  /* background-color: blue; */
  @media only screen and (max-width: 480px) {
    width: 100%;
    height: 70%;
    text-align: center;
  }
`;

export const Right = styled.div`
  max-width: 100%;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  /* background: orange; */
  @media only screen and (max-width: 480px) {
    width: 100%;
    height: 80%;
    justify-content: start;
  }
`;

export const Img = styled.img`
  height: 90%;
  width: 90%;
`;

export const MainText = styled.h1`
  font-size: 32px;
  font-weight: 400;
  color: ${colors.blackColor};
<<<<<<< HEAD

=======
>>>>>>> 583f0f7fcf356dacd61181f46b8bdd844c7779bc
  @media only screen and (max-width: 480px) {
    font-size: 21px;
  }
`;

export const BoldText = styled.span`
  font-weight: 700;
  text-transform: uppercase;
`;

export const DescText = styled.h2`
  font-weight: 400;
  font-size: 25px;
  margin-block: 2rem;
<<<<<<< HEAD

=======
>>>>>>> 583f0f7fcf356dacd61181f46b8bdd844c7779bc
  @media only screen and (max-width: 480px) {
    font-size: 18px;
    margin-block: 1.5rem;
  }
`;

export const OrangeText = styled.span`
  color: ${colors.orangeColor};
  font-weight: 700;
`;

export const ListOfFeatures = styled.div`
  height: 240px;
  width: 80%;
  @media only screen and (max-width: 480px) {
    /* background: red; */
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
`;

export const Feat = styled.p`
  font-size: 19px;
  margin-block: 20px;
<<<<<<< HEAD

=======
>>>>>>> 583f0f7fcf356dacd61181f46b8bdd844c7779bc
  @media only screen and (max-width: 480px) {
    font-size: 16px;
    margin-block: 1.5rem;
  }
`;

export const LinkRouterButton = styled.button`
  background: #2f2e41;
  color: #fff;
  height: 50px;
  width: 250px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 19px;
  cursor: pointer;
  margin-top: -20px;
  @media only screen and (max-width: 480px) {
    font-size: 17px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    /* margin-top: -1rem; */
    height: 40px;
    width: 170px;
  }
<<<<<<< HEAD
`;
=======
`;
>>>>>>> 583f0f7fcf356dacd61181f46b8bdd844c7779bc
