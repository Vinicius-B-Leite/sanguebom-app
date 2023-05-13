import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlicer'
import { notificationReducer } from './notification/notificationSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
