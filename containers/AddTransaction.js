import React from 'react'
import { connect } from 'react-redux'
import { addTransaction } from '../actions'

let AddTransaction = ({ dispatch }) => {
    let who, howMany, howMuch, createdAt

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!who.value.trim() && !howMany.value.trim() && !howMuch.value.trim())
                    return
                createdAt = new Date()
                dispatch(addTransaction({ createdAt, who, howMany, howMuch }))
                who.value = howMany.value = howMuch.value = ''
            }}>
                <input type="text" placeholder="Who?"
                    ref={node => { who = node }}/>
                <input type="text" placeholder="How many?"
                    ref={node => { howMany = node }}/>
                <input type="text" placeholder="How much?"
                    ref={node => { howMuch = node }}/>
                <input type="submit" value="Add" />
            </form>
        </div>
    )
}
AddTransaction = connect()(AddTransaction)

export default AddTransaction
