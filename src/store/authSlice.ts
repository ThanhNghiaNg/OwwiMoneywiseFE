import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    accessToken: localStorage.getItem("ACCESS_TOKEN") || "",
}

type loginPayload = { token: string }

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<loginPayload>) => {
            localStorage.setItem("ACCESS_TOKEN", action.payload.token)
            state.accessToken = action.payload.token
        },
        logout: (state) => {
            localStorage.removeItem("ACCESS_TOKEN")
            state.accessToken = ""
        },
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer