import { PayloadAction, createSlice } from "@reduxjs/toolkit";



const initialState = {
    length: 0
}

const notificationSlicer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationLength: (state, action: PayloadAction<number>) => {
            state.length = action.payload
        }
    }
})

export const { setNotificationLength } = notificationSlicer.actions
export const notificationReducer = notificationSlicer.reducer