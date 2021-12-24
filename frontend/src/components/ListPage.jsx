import React, { useState } from "react";
import {
  ListPageWrapper,
  BudgetArea,
  BudgetLeft,
  H2EnterBudget,
  InputBudget,
  ConfirmBudgetButton,
  BudgetRight,
  Hr,
  ListArea,
  AddItemPopUp,
  Heading,
  HeadingPopUp,
  InputGift,
  InputPrice,
  InputPerson,
  InputLink,
  ActualList,
  ListObject,
  GiftName,
  GiftPrice,
  ForWhom,
  LinkToGift,
  Delete,
  AddItemButton,
  AddToListButton,
  Cross,
  ErrorIcon,
  ErrorMessage,
} from "../StyledElements/ListPageElements";
import { Chart } from "react-google-charts";
const ListPage = () => {
  const [totalBudget, setTotalBudget] = useState(100);
  const [confBudget, setConfBudget] = useState(100);
  const [addItem, setAddItem] = useState(false);
  const [items, setItems] = useState([]);
  const [nameOfGift, setNameOfGift] = useState("");
  const [priceOfGift, setPriceOfGift] = useState(0);
  const [forWhomGift, setForWhomGift] = useState("");
  const [urlOfGift, setUrlOfGift] = useState("");

  // array for graph
  const nameAndPrice = [["none", 0]];

  //pushing useState's elements in the new array
  items.forEach((e) => {
    nameAndPrice.push([e[0], Number(e[1])]);
  });

  //creating an new array for google's pie chart
  const dataForGraph = [["data", "value"], ...nameAndPrice];

  // making sure that min budget is 100
  const handleChange = (e) => {
    let value = e.target.value;
    value !== 0 ? setTotalBudget(value) : setConfBudget(100);
  };

  //   confirming the budget via button click
  const handleClick = () => {
    setConfBudget(totalBudget);
  };

  // total money spent array
  const totalMoneySpent = [0, 0];
  items.forEach((e) => totalMoneySpent.push(Number(e[1])));

  const isBudgetShort =
    totalMoneySpent.reduce((prev, curr) => prev + curr) > confBudget;
  console.log(isBudgetShort);

  return (
    <>
      <ListPageWrapper>
        <BudgetArea>
          <BudgetLeft>
            <H2EnterBudget>Enter Budget</H2EnterBudget>
            <InputBudget
              placeholder="Enter your budget here..."
              onChange={handleChange}
            />
            <ConfirmBudgetButton onClick={handleClick}>
              ✅ Confirm Budget
            </ConfirmBudgetButton>
          </BudgetLeft>
          <BudgetRight>
            <Chart
              width={"400px"}
              height={"400px"}
              style={{ padding: "0" }}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Total", "Budget"],
                ["Total Budget", confBudget],
              ]}
              options={{
                title: "Total Budget",
                is3D: true,
              }}
              rootProps={{ "data-testid": "1" }}
            />

            <Chart
              width={"400px"}
              height={"400px"}
              style={{ padding: "0" }}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={dataForGraph}
              options={{
                title: `Total Expense -> ${totalMoneySpent.reduce(
                  (prev, curr) => prev + curr
                )}`,
                is3D: true,
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </BudgetRight>
        </BudgetArea>
        <Hr></Hr>
        <ListArea>
          <Heading>Add gifts to your list</Heading>
          <AddItemPopUp show={addItem}>
            <Cross onClick={() => setAddItem(!addItem)} />
            <HeadingPopUp>ADD GIFT</HeadingPopUp>
            <InputGift
              onChange={(e) => setNameOfGift(e.target.value)}
              type="text"
              placeholder="Enter gift here..."
            />
            <InputPrice
              onChange={(e) => setPriceOfGift(Number(e.target.value))}
              type="number"
              placeholder="Enter price here..."
            />
            <InputPerson
              onChange={(e) => setForWhomGift(e.target.value)}
              type="text"
              placeholder="Enter gift for whom here..."
            />
            <InputLink
              type="url"
              placeholder="Enter url here..."
              onChange={(e) => setUrlOfGift(e.target.value)}
            />
            <AddToListButton
              onClick={() => {
                // setting the main items useState

                setItems((prev) => {
                  return [
                    ...prev,
                    [nameOfGift, priceOfGift, forWhomGift, urlOfGift],
                  ];
                });
                setAddItem(!addItem);
              }}
            >
              Add
            </AddToListButton>
          </AddItemPopUp>
          <ActualList>
            {/* error info message if the total budget is falling short of the gift's total*/}

            {isBudgetShort ? (
              <ErrorMessage>
                <ErrorIcon title="your budget is falling short..." /> your
                budget is falling short by{" "}
                {totalMoneySpent.reduce((prev, curr) => prev + curr) -
                  confBudget}
              </ErrorMessage>
            ) : (
              ""
            )}

            <ListObject>
              {/* input the username of the user from the backend instead of shreyas */}
              <GiftName>Shreyas's Gift List</GiftName>
              <GiftPrice>Price</GiftPrice>
              <ForWhom>For whom</ForWhom>
              <LinkToGift href="https://www.google.com" target="_blank">
                Link
              </LinkToGift>
              {/* <Edit />
              <Delete /> */}
            </ListObject>
            {items.map((e, id) => {
              return (
                <>
                  <ListObject key={id}>
                    <GiftName>{e[0]}</GiftName>
                    <GiftPrice>{e[1]}</GiftPrice>
                    <ForWhom>{e[2]}</ForWhom>
                    <LinkToGift href={`https://${e[3]}`} target="_blank">
                      Link
                    </LinkToGift>
                    <Delete
                      id={id}
                      onClick={() => {
                        let newArr = items.filter((id) => id[0] !== e[0]);
                        setItems(newArr);
                      }}
                      title="Delete Item"
                    />
                  </ListObject>
                </>
              );
            })}

            <AddItemButton onClick={() => setAddItem(!addItem)}>
              Add a new gift
            </AddItemButton>
          </ActualList>
        </ListArea>
      </ListPageWrapper>
    </>
  );
};

export default ListPage;
