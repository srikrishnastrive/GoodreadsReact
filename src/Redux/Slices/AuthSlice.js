import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    userame : localStorage.getItem('username') || '',
    token : localStorage.getItem('token') || ''
 }


const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers : () => {

    }

});

export default AuthSlice.reducer;


