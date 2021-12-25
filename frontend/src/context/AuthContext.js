import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    // Get the value of authToken from local storage. If the local storage contains authTokens, then parse the token(get the value back) , else set that to null
    // Callback function sets the value only once on inital load 
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // If the local storage contains authTokens, then decode the token, else set that to null
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    
    let [budget, setBudget] = useState([])



    const history = useHistory()


    // Login user method
    let loginUser = async (e )=> {
        e.preventDefault()
        // Make a post request to the api with the user's credentials.
        let response = await fetch('https://gift-space.herokuapp.com/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        // Get the access and refresh tokens
        let data = await response.json()

        if(response.status === 200){
            // Update the state with the logged in tokens
            setAuthTokens(data)
            // Decode the access token and store the information
            setUser(jwt_decode(data.access))
            // Set the authTokens in the local storage
            localStorage.setItem('authTokens', JSON.stringify(data))
            // Redirect user to home page
            history.push('/gifts')
        }else{
            alert('Something went wrong!')
        }
    }

    // Logout user method
    let logoutUser = () => {
        // To logout, set 'setAuthTokens' and 'setUser' to null and remove the 'authTokens' from local storage
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }


    // To register a user
    let registerUser = async (e) => {
        e.preventDefault()

        // Make a post request to the api with the user's credentials.
        let response = await fetch('https://gift-space.herokuapp.com/api/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value, 'confirmPassword':e.target.confirmPassword.value, 'email':e.target.email.value})
        })
        // Get the access and refresh tokens
        let data = await response.json()

        if(response.status === 200){
            console.log('Registered Successfully')
            alert(data)
            history.push('/gifts')
        }else{
            console.log(data)
            alert(data)
        }
    }

        
    // To set the budget of the logged in user
    let addBudget = async(e) =>{
        e.preventDefault()
        let response = await fetch('https://gift-space.herokuapp.com/api/set-budget/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({'budget':e.target.budget.value})
        })
        let data = await response.json()
        if(response.status === 200){
            // Store the data in useState
            setBudget(data)
            alert(data)
            history.push('/gifts')
        }
        else {
            alert('ERROR GETTING BUDGET: ', data)
        }
        
    }


    // To add a person to the user's recipient's list
    let addPerson = async(e) =>{
        e.preventDefault()
        let response = await fetch('https://gift-space.herokuapp.com/api/add-person/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({'name':e.target.name.value})
        })
        let data = await response.json()
        if(response.status === 200){
            alert(data)
            history.push('/gifts')
        }
        else {
            alert('ERROR ADDING PERSON: ', data)
        }
        
    }

    // To add a gift
    let addGift = async(e) =>{
        e.preventDefault()
        let response = await fetch('https://gift-space.herokuapp.com/api/add-gift/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({'link':e.target.link.value, 'price':e.target.price.value, 'trackingID':e.target.trackingID.value, 'person':e.target.person.value})
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
    



    // Context data for AuthContext so that it can be used in other pages
    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser,

        budget:budget,
        addBudget:addBudget,
        addPerson:addPerson,
        addGift:addGift,
    }
    

    // To update the access tokens after every few time interval
    useEffect(()=> {

        // To update the access token
        let updateToken = async ()=> {

            // If no authToken exists i.e. user is not logged in then return
            if(!authTokens){
                setLoading(false)
                return
            }
            // Make a post request to the api with the refresh token to update the access token
            let response = await fetch('https://gift-space.herokuapp.com/api/token/refresh/', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                // Send the refresh token
                body:JSON.stringify({'refresh':authTokens?.refresh})
            })
            let data = await response.json()
            
            if (response.status === 200){   
                // Update the data as done similarly in the login user method
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            }else{
                logoutUser()
            }

            if(loading){
                setLoading(false)
            }
        }



        
        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        // Clear the interval after firing preventing re-initializing every time, refer to docs for more details
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {/* Render children components only after AuthContext loading is complete */}
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
