import React, {useState, useEffect, useContext} from 'react'
import { Link, Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router-dom'


const HomePage = () => {
    let [gifts, setGifts] = useState([])
    let [budget, setBudget] = useState([])
    let [person, setPerson] = useState([])
    let {authTokens, logoutUser, addBudget} = useContext(AuthContext)

    const history = useHistory()
    
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




    return (
        <div>
            <p>You are logged to the home page!</p><br/><br/>

            <p> BUDGET: {budget.budget} </p>
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
            </ul>
        </div>
    )
}

export default HomePage
