import React from 'react'
import { connect } from 'react-redux'
import { addTransaction } from '../actions'

let AddTransaction = ({ dispatch }) => {
    let whoInput, howManyInput, howMuchInput, createdAt

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                let who = whoInput.value.trim()
                let howMany = howManyInput.value.trim()
                let howMuch = howMuchInput.value.trim()
                if (!who && !howMany && !howMuch)
                    return
                createdAt = new Date()
                dispatch(addTransaction({ createdAt, who, howMany, howMuch }))
                whoInput.value = howManyInput.value = howMuchInput.value = ''
            }}>
                <input type="text" placeholder="Who?"
                    ref={node => { whoInput = node }}/>
                <input type="text" placeholder="How many?"
                    ref={node => { howManyInput = node }}/>
                <input type="text" placeholder="How much?"
                    ref={node => { howMuchInput = node }}/>
                <input type="submit" value="Add" />
            </form>
        </div>
    )
}
AddTransaction = connect()(AddTransaction)

export default AddTransaction
