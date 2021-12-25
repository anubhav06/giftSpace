import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router-dom'


const AddGiftPage = () => {
    
    let [person, setPerson] = useState([])
    let {authTokens, logoutUser, addGift} = useContext(AuthContext)

    const history = useHistory()

    useEffect(()=> {

        // To get the person (list of recipients) added by the user
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
        getPerson()
    }, [])


    return (
        <div>
            <form onSubmit={addGift}>
                <input type="text" name="link" placeholder="Link of gift"/>
                <input type="number" step='0.01' name="price" placeholder="Price of gift"/>
                <input type="text" name="trackingID" placeholder="Tracking ID"/>
                <select name='person' required>
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

export default AddGiftPage
