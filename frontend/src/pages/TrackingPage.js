import React, {useState, useEffect, useContext} from 'react'
import { Link, Redirect } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router-dom'


const TrackingPage = () => {
    let [person, setPerson] = useState([])
    let [trackingData, setTrackingData] = useState([])
    let {authTokens} = useContext(AuthContext)

    const history = useHistory()
    
    useEffect(()=> {

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


        // To get the tracking data
        let getTrackingData = async() =>{
            let response = await fetch('http://127.0.0.1:8000/api/get-tracking/', {
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
                console.log('TRACKING DATA: ', data)
            }
            else{
                alert('ERROR GETTING THE TRACKING DATA: ', data)
            }
            
        }
        

       

        // Call the function every time the page loads
        getPerson()
        getTrackingData()
    }, [])




    return (
        <div>
            <p>TRACKING PAGE! </p><br/><br/>

            <Link to='/add-tracking'> Add Tracking Number </Link>
            {trackingData.map(data => (
                <div key={data.id}>
                    Company: {data.company} <br/>
                    Tracking ID: {data.trackingID} <br/>
                    Description: {data.description} <br/>
                    Recipient: {data.recipient} <br/><br/>
                </div>
            ))}
        </div>
    )
}

export default TrackingPage
