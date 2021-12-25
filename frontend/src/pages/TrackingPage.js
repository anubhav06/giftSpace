import React, {useState, useEffect, useContext} from 'react'
import { Link, Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import {
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
  } from "../StyledElements/ListPageElements";

const TrackingPage = () => {
    let [trackingData, setTrackingData] = useState([])
    let {authTokens, user} = useContext(AuthContext)

    const history = useHistory()

    
    const [addItem, setAddItem] = useState(false);
    const [items, setItems] = useState([]);
    const [description, setNameOfGift] = useState("");
    const [trackingID, setTrackingID] = useState(0);
    const [recipient, setForWhomGift] = useState("");
    const [company, setDeliveryCompany] = useState("");


    
    useEffect(()=> {

        // To get the tracking data
        let getTrackingData = async() =>{
            let response = await fetch('https://gift-space.herokuapp.com/api/get-tracking/', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            })
            let data = await response.json()

            if(response.status === 200){
                // Store the data in useState
                setTrackingData(data)
                setItems(data)
                console.log('TRACKING DATA: ', data)
            }
            else{
                alert('ERROR GETTING THE TRACKING DATA: ', data)
            }
            
        }
          

        // Call the function every time the page loads
        getTrackingData()
    }, [])




    return (
        <div>
            <p> ------ TRACKING PAGE!------ ADD BIG HEADING/LOGO HERE ------ </p><br/><br/>


            <Heading>Add tracking data to your list</Heading>
                
                <AddItemPopUp show={addItem}>
                    <Cross onClick={() => setAddItem(!addItem)} />
                    <HeadingPopUp> ADD TRACKING DETAILS </HeadingPopUp>
                    <InputGift
                    onChange={(e) => setNameOfGift(e.target.value)}
                    type="text"
                    placeholder="Enter gift here..."
                    />
                    <InputPrice
                    onChange={(e) => setTrackingID(Number(e.target.value))}
                    type="number"
                    placeholder="Enter tracking ID here..."
                    />
                    <InputPerson
                    onChange={(e) => setForWhomGift(e.target.value)}
                    type="text"
                    placeholder="Enter gift for whom here..."
                    />
                    <InputLink
                    type="text"
                    placeholder="Enter delivery company here..."
                    onChange={(e) => setDeliveryCompany(e.target.value)}
                    />
                    <AddToListButton
                    onClick={async(e) => {
                        // setting the main items useState
                        e.preventDefault()
                        let response = await fetch('https://gift-space.herokuapp.com/api/add-tracking/', {
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json',
                                'Authorization':'Bearer ' + String(authTokens.access)
                            },
                            body:JSON.stringify({'company':company, 'trackingID':trackingID, 'description':description, 'recipient':recipient})
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
                            {id, description, trackingID, recipient, company},
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


                    <ListObject>
                    {/* input the username of the user from the backend instead of shreyas */}
                        <GiftName>{user.username}'s Gift List</GiftName>
                        <GiftPrice> Tracking ID </GiftPrice>
                        <ForWhom> Recipient </ForWhom>
                        <LinkToGift>
                            Company
                        </LinkToGift>
                    
                    </ListObject>
                    {items.map((e, id) => {
                    return (
                        <>
                        <ListObject key={id}>
                            {console.log('AFTER ITEMS: ', items)}
                            {console.log('AFTER ITEMS E: ', e)}
                            {console.log('AFTER ITEMS ID: ', id)}
                            <GiftName>{e.description}</GiftName>
                            <GiftPrice>{e.trackingID}</GiftPrice>
                            <ForWhom>{e.recipient}</ForWhom>
                            <LinkToGift>{e.company}</LinkToGift>
                            <Delete key={id}
                            id={id}
                            onClick={ async() => {
                                let response = await fetch(`https://gift-space.herokuapp.com/api/delete-gift/${e.id}/`, {
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
                    Add a tracking data
                    </AddItemButton>
                </ActualList>
        </div>
    )
}

export default TrackingPage
