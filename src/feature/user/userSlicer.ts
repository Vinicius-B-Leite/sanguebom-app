import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/UserType";
import { removeStorageUser } from "../../storage/userStorage";


export type InitalState = {
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
        logoutUser: (state) => {
            removeStorageUser()
            state.user = undefined
        }
    },
})




export const { setUser,logoutUser } = userSlicer.actions
export const userReducer = userSlicer.reducer