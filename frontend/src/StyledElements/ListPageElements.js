import styled from "styled-components";
import {
  FaEdit,
  FaTrashAlt,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";
const colors = {
  orangeColor: "#F05454",
  darkBlueColor: "#30475E",
  blackColor: "#121212",
};

export const ListPageWrapper = styled.div`
  width: 100%;
  padding: 0rem 4rem;
  overflow-x: hidden;
  /* background-color: red; */
  @media only screen and (max-width: 480px) {
    padding: 0.5rem;
  }
`;
export const BudgetArea = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 1rem;
  flex-wrap: wrap;
  /* background: blue; */

  @media only screen and (max-width: 480px) {
    width: 100%;
    height: auto;
    margin-block: 1rem;
  }
`;

export const BudgetLeft = styled.div`
  min-width: 40%;
  max-width: 100%;
  height: 100%;
  /* background: purple; */

  @media only screen and (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

export const H2EnterBudget = styled.h2`
  color: ${colors.darkBlueColor};
`;
export const InputBudget = styled.input.attrs({ type: "number" })`
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  box-shadow: 4px 4px 20px grey;
  background: transparent;
  outline: none;
  margin-block: 2rem;
  min-width: 35%;
  width: 10rem;
  height: 3rem;
  @media only screen and (max-width: 480px) {
    display: flex;
    width: 60%;
    margin: 2rem auto;
    text-align: center;
  }
`;
export const ConfirmBudgetButton = styled.button`
  background: #2f2e41;
  color: #fff;
  height: 35px;
  width: 170px;
  padding: 4px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 17px;
  cursor: pointer;
`;
export const BudgetRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 60%;
  flex-wrap: wrap;
  /* background: orange; */
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;
export const Hr = styled.hr`
  margin-block: 2rem;
  background: #3a506652;
  color: #3a506652;
  border: 1px solid #3a506652;

  @media only screen and (max-width: 480px) {
    width: 80%;
    margin: 2rem auto;
  }
`;

export const ListArea = styled.div`
  width: 100%;
  /* background: red; */
  height: auto;
  position: relative;
`;
export const Heading = styled.h1`
  text-align: center;
  margin-block-end: 1.2rem;
`;
export const AddItemPopUp = styled.div`
  position: absolute;
  left: 50%;
  bottom: 7rem;
  transform: translateX(-50%);
  border-radius: 10px;
  background: #f5f5f5;
  box-shadow: 2px 4px 6px rgba(117, 117, 117, 0.65);
  width: 600px;
  height: 320px;
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  padding: 1rem;

  @media only screen and (max-width: 480px) {
    width: 95%;
    margin: auto;
  }
`;
export const HeadingPopUp = styled.h1`
  text-align: center;
  margin-block: 0.5rem;
  color: ${colors.orangeColor};
`;

export const InputGift = styled.input`
  width: 50%;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 15px;
  box-shadow: 2px 4px 6px rgba(117, 117, 117, 0.25);
  margin: 0.2rem auto;
`;

export const InputPrice = styled.input.attrs({ type: "number" })`
  width: 50%;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 15px;
  box-shadow: 2px 4px 6px rgba(117, 117, 117, 0.25);
  margin: 0.2rem auto;
`;

export const InputPerson = styled.input`
  width: 50%;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 15px;
  box-shadow: 2px 4px 6px rgba(117, 117, 117, 0.25);
  margin: 0.2rem auto;
`;

export const InputLink = styled.input`
  width: 50%;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 15px;
  box-shadow: 2px 4px 6px rgba(117, 117, 117, 0.25);
  margin: 0.2rem auto;
`;
export const AddToListButton = styled.button`
  background: #2f2e41;
  color: #fff;
  height: 35px;
  width: 170px;
  padding: 4px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 17px;
  cursor: pointer;
  margin: 0.5rem auto;
`;

export const Cross = styled(FaTimesCircle)`
  color: ${colors.darkBlueColor};
  /* height: 20px; */
  /* width: 10px; */
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  cursor: pointer;

  font-size: 31px;
`;

export const ActualList = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  align-items: center;
`;
export const ListObject = styled.div`
  width: 95%;
  margin: 1.5rem auto;
  background: #f5f5f5;
  box-shadow: 2px 4px 6px rgba(117, 117, 117, 0.25);
  border-radius: 9px;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  flex-wrap: wrap;
  @media only screen and (max-width: 480px) {
    width: 100%;
    height: 200px;
  }
`;
export const GiftName = styled.h2`
  max-width: 400px;
  min-width: 300px;
  width: 390px;
  font-size: 18px;
`;
export const GiftPrice = styled.h2`
  max-width: 170px;
  min-width: 100px;
  width: 150px;
  font-size: 18px;
`;
export const ForWhom = styled.h2`
  max-width: 210px;
  min-width: 150px;
  width: 190px;
  font-size: 18px;
`;
export const LinkToGift = styled.a`
  max-width: 210px;
  min-width: 150px;
  width: 190px;
  font-size: 18px;
`;

export const Edit = styled(FaEdit)`
  color: green;
  /* font-size: 20px; */
  cursor: pointer;
`;

export const Delete = styled(FaTrashAlt)`
  color: red;
  font-size: 18px;
  margin-inline-start: 3.4rem;
  cursor: pointer;
`;

export const AddItemButton = styled.button`
  background: #2f2e41;
  color: #fff;
  height: 35px;
  width: 170px;
  padding: 4px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 17px;
  cursor: pointer;
  /* margin-left: 4.3rem; */
  margin-block: 3rem;
`;

export const ErrorIcon = styled(FaInfoCircle)`
  color: #f05454;
  font-size: 22px;
  margin-inline-end: 1rem;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: #f05454;
  font-size: 18px;
  font-weight: bolder;
`;
