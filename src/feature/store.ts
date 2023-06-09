import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlicer'
import { notificationReducer } from './notification/notificationSlice'
import { themeReducer } from './theme/themeSlicer'


export const store = configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer,
        theme: themeReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
