import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'


const AddPersonPage = () => {
    let {addPerson} = useContext(AuthContext)

    return (
        <div>
            <form onSubmit={addPerson}>
                <input type="text" name="name" placeholder="Enter name of person you want to add" />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default AddPersonPage
