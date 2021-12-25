import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {
    BudgetLeft,
    H2EnterBudget,
    InputBudget,
} from "../StyledElements/ListPageElements";
import {
    Form,
    SubmitButton,
} from "../StyledElements/RegElements";


const SetBudgetPage = () => {
    let {addBudget} = useContext(AuthContext)

    return (
        <div>
            <BudgetLeft>
                <Form onSubmit={addBudget}>
                    <H2EnterBudget>Enter Budget</H2EnterBudget>
                    <InputBudget
                    placeholder="Enter your budget here..."
                    type="number" name="budget"
                    />
                    <SubmitButton type="submit" />
                </Form>
            </BudgetLeft>
        </div>
    )
}

export default SetBudgetPage
