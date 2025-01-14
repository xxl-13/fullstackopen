import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: null, success: true },
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage() {
      return { content: null, success: true }
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(setMessage(notification))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
