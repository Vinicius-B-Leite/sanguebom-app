import { PayloadAction, createSlice } from "@reduxjs/toolkit";



const initialState = {
    isDark: false
}

const themeSlicer = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, actions: PayloadAction<boolean>) => {


            state.isDark = actions.payload
        }
    }
})

export const { changeTheme } = themeSlicer.actions
export const themeReducer = themeSlicer.reducer