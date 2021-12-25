import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router-dom'


const AddTrackingPage = () => {
    
    let [person, setPerson] = useState([])
    let {authTokens, logoutUser, addGift} = useContext(AuthContext)

    const history = useHistory()

    useEffect(()=> {

        // To get the person (list of recipients) added by the user
        let getPerson = async() =>{
            let response = await fetch('https://gift-space.herokuapp.com/api/get-person/', {
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
        getPerson()
    }, [])

    // To add tracking data
    let addTrackingData = async(e) =>{
        e.preventDefault()
        let response = await fetch('https://gift-space.herokuapp.com/api/add-tracking/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({'company':e.target.company.value, 'trackingID':e.target.trackingID.value, 'description':e.target.description.value, 'recipient':e.target.recipient.value})
        })
        let data = await response.json()
        if(response.status === 200){
            alert(data)
            history.push('/gifts')
        }
        else {
            alert('ERROR ADDING GIFT: ', data)
        }
        
    }

    return (
        <div>
            <form onSubmit={addTrackingData}>
                <select name="company">
                    <option> FedEx </option>
                    <option> DHL </option>
                    <option> BlueDart </option>
                    <option> DTDC </option>
                </select>
                <input type="text" name="trackingID" placeholder="Tracking ID"/>
                <input type="text" name="description" placeholder='Description' />
                <select name='recipient' required>
                    {person.length === 0 ? <option key='NoPerson' disabled> No Person Added </option> : null}
                    {person.map(x => (
                        <option key={x.id}> {x.name} </option>
                    ))}
                </select>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default AddTrackingPage
