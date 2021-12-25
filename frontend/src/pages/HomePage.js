import React, {useState, useEffect, useContext} from 'react'
import { Chart } from "react-google-charts";
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
    Edit,
    Delete,
    AddItemButton,
    AddToListButton,
    Cross,
    ErrorIcon,
    ErrorMessage,
  } from "../StyledElements/ListPageElements";
import { Link, Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router-dom'


const HomePage = () => {
    let [gifts, setGifts] = useState([])
    let [budget, setBudget] = useState([])
    let [person, setPerson] = useState([])
    let {user, authTokens, logoutUser, addBudget} = useContext(AuthContext)

    const history = useHistory()
    

    
    const [totalBudget, setTotalBudget] = useState(100);
    const [confBudget, setConfBudget] = useState(100);
    const [addItem, setAddItem] = useState(false);
    const [items, setItems] = useState([]);
    const [id, setIDofGift] = useState(0);
    const [description, setNameOfGift] = useState("");
    const [price, setPriceOfGift] = useState(0);
    const [recipient, setForWhomGift] = useState("");
    const [link, setUrlOfGift] = useState("");

    useEffect(()=> {

        // To get the gifts of a user from backend and display in frontend
        let getGifts = async() =>{
            let response = await fetch('http://127.0.0.1:8000/api/gifts/', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            let data = await response.json()
    
            if(response.status === 200){
                // Store the data useState
                setGifts(data)
                setItems(data)
            }else if(response.statusText === 'Unauthorized'){
                logoutUser()
            }
            
        }

         // To get the budget of a user
        let getBudget = async() =>{
            let response = await fetch('http://127.0.0.1:8000/api/get-budget/', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            let data = await response.json()

            if(response.status === 200){
                // Store the data in useState
                setBudget(data)
                setConfBudget(data.budget)
            }
            // If the user has not set the budget, then redirect to set-budget page
            else if(response.status === 412){
                history.push('/set-budget')
            }
            else{
                alert('ERROR GETTING THE BUDGET: ', data)
            }
            
        }

        // To get the person (list of recipient) added by the user
        let getPerson = async() =>{
            let response = await fetch('http://127.0.0.1:8000/api/get-person/', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            let data = await response.json()

            if(response.status === 200){
                // Store the data in useState
                setPerson(data)
                console.log('PERSON: ', data)
            }
            else{
                alert('ERROR GETTING THE PERSON LIST: ', data)
            }
            
        }

       

        // Call the function every time the page loads
        getGifts()
        getBudget()
        getPerson()
    }, [])


    let deleteGift = async (id) => {
        let response = await fetch(`http://127.0.0.1:8000/api/delete-gift/${id}/`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            let data = await response.json()

            if(response.status === 200){
                alert(data)
            }
            else{
                alert('ERROR DELETING GIFT: ', data)
            }
    }



  
    // array for graph
    const nameAndPrice = [["none", 0]];
  
    //pushing useState's elements in the new array
    items.forEach((e) => {
      nameAndPrice.push([e.description, Number(e.price)]);
    });
  
    //creating an new array for google's pie chart
    const dataForGraph = [["data", "value"], ...nameAndPrice];
  
    // making sure that min budget is 100
    const handleChange = (e) => {
      let value = e.target.value;
      value !== 0 ? setTotalBudget(value) : setConfBudget(100);
    };
  
    //   confirming the budget via button click
    const handleClick = async (e) => {

        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/set-budget/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({'budget':totalBudget})
        })
        let data = await response.json()
        if(response.status === 200){
            // Store the data in useState
            //setBudget(data)
            setConfBudget(totalBudget);
            alert(data)
        }
        else {
            alert('ERROR ADDING BUDGET: ', data)
        }
    };
  
    // total money spent array
    const totalMoneySpent = [0, 0];
    items.forEach((e) => totalMoneySpent.push(Number(e.price)));
  
    const isBudgetShort =
      totalMoneySpent.reduce((prev, curr) => prev + curr) > confBudget;
    console.log(isBudgetShort);


    return (
        <div>
            {/*<p>You are logged to the home page!</p><br/><br/>

            <p> BUDGET: {budget.budget} </p>
            <p> BALANCE: {budget.balance} </p>
            <Link to='/set-budget'> Edit Budget </Link> <br/><br/><br/>
                
            <p> PEOPLE: </p>
            <select name='personList'>
                {person.length === 0 ? <option key='NoPerson' disabled> No Person Added </option> : null}
                {person.map(x => (
                    <option key={x.id}> {x.name} </option>
                ))}
            </select> <br/>
            <Link to='/add-person'> Add People </Link> <br/><br/><br/> <br/><br/>


            <Link to='/add-gift'> Add Gift </Link> <br/>
            <p> GIFTS OF USER: </p>
            <ul>
                {gifts.map(gift => (
                    <li key={gift.id} >
                        LINK: {gift.link} <br/>
                        PRICE: {gift.price} <br/>
                        trackingID: {gift.trackingID} <br/>
                        Recipient: {gift.recipient} <br/>
                        <button onClick={() => deleteGift(gift.id)}> Delete </button> <br/><br/>
                    </li> 
                ))}
            </ul>*/}


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
                        title: `Total Budget: ${confBudget}`,
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
                    onClick={async(e) => {
                        // setting the main items useState
                        e.preventDefault()
                        let response = await fetch('http://127.0.0.1:8000/api/add-gift/', {
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json',
                                'Authorization':'Bearer ' + String(authTokens.access)
                            },
                            body:JSON.stringify({'link':link, 'price':price, 'description':description, 'person':recipient})
                        })
                        let data = await response.json()
                        let id = data.id
                        if(response.status === 200){
                            setIDofGift(data.id)
                        }
                        else {
                            alert('ERROR ADDING GIFT: ', data)
                        }

                        setItems((prev) => {
                        return [
                            ...prev,
                            {id, description, price, recipient, link},
                        ];
                        });
                        setAddItem(!addItem);
                        console.log('SET ITEMS: ', items)
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
                    <GiftName>{user.username}'s Gift List</GiftName>
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
                            {console.log('AFTER ITEMS: ', items)}
                            {console.log('AFTER ITEMS E: ', e)}
                            {console.log('AFTER ITEMS ID: ', id)}
                            <GiftName>{e.description}</GiftName>
                            <GiftPrice>{e.price}</GiftPrice>
                            <ForWhom>{e.recipient}</ForWhom>
                            <LinkToGift href={`https://${e.link}`} target="_blank">
                            Link
                            </LinkToGift>
                            <Delete key={id}
                            id={id}
                            onClick={ async() => {
                                let response = await fetch(`http://127.0.0.1:8000/api/delete-gift/${e.id}/`, {
                                    method:'POST',
                                    headers:{
                                        'Content-Type':'application/json',
                                        'Authorization':'Bearer ' + String(authTokens.access)
                                    }
                                })
                                let data = await response.json()

                                if(response.status === 200){
                                    alert(data)
                                }
                                else{
                                    alert('ERROR DELETING GIFT: ', data)
                                }
                                let newArr = items.filter((id) => id.id !== e.id);
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
        </div>
    )
}

export default HomePage
