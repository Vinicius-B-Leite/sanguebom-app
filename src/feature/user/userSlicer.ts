import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/UserType";
import AsyncStorage from "@react-native-async-storage/async-storage";


type InitalState = {
    user: undefined | UserType
}
const initialState: InitalState = {
    user: undefined
}
const userSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType | undefined>) => {
            state.user = action.payload

        },
        logout: (state) => {
            state.user = undefined
            AsyncStorage.removeItem('@user')
        }
    }
})

export const { setUser, logout } = userSlicer.actions
export const userReducer = userSlicer.reducer