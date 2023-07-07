import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/UserType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeStorageUser } from "../../storage/userStorage";


export type InitalState = {
    user: undefined | UserType
}
const initialState: InitalState = {
    user: undefined
}


export const logoutUser = createAsyncThunk(
    'user/logout',
    () => {
        removeStorageUser()
    }
)

const userSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType | undefined>) => {
            state.user = action.payload

        },
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = undefined
        })
    }
})




export const { setUser } = userSlicer.actions
export const userReducer = userSlicer.reducer