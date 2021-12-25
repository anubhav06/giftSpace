import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {
    BudgetLeft,
    BudgetCenter,
    H2EnterBudget,
    InputSetBudget,
} from "../StyledElements/ListPageElements";
import {
    Form,
    SubmitButton,
} from "../StyledElements/RegElements";


const SetBudgetPage = () => {
    let {addBudget} = useContext(AuthContext)

    return (
        <div>
            <BudgetCenter>
                <Form onSubmit={addBudget}>
                    <H2EnterBudget>Enter Budget</H2EnterBudget>
                    <InputSetBudget
                    placeholder="Enter your budget here..."
                    type="number" name="budget"
                    />
                    <SubmitButton type="submit" />
                </Form>
            </BudgetCenter>
        </div>
    )
}

export default SetBudgetPage
