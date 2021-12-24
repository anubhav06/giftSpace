import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Redirect } from 'react-router-dom'




const SetBudgetPage = () => {
    let {addBudget} = useContext(AuthContext)

    return (
        <div>
            <form onSubmit={addBudget}>
                <input type="number" step="0.01" name="budget" placeholder="Enter Budget" />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default SetBudgetPage
