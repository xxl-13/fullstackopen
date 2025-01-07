import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice({
    name: 'message',
    initialState: '',
    reducers: {
        setMessage(state, action) {
        return action.payload
        },
        removeMessage() {
        return ''
        }
    }
})

export const { setMessage, removeMessage } = messageSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(removeMessage())
        }, time * 1000)
    }
}

export default messageSlice.reducer
