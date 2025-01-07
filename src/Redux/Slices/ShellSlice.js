import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
    shelfList : []
};

export const getAllBookShelves = createAsyncThunk("shelfs/getAllBookShelves",async () =>{
    try {
        const response = axiosInstance.get('bookshelves',{headers :{
            'x-access-token':localStorage.getItem('token')
        }});
        toast.promise(response,{
            loading :'loading bookshelves data',
            success :'Successfully loaded all the bookshelves',
            error :'Something went wrong'
        });
        return await response;
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong cannot download book shelves');
    }
})

export const addBookToShelves = createAsyncThunk("shelfs/addBookToShelves",async (data) =>{
    try {
        const response = axiosInstance.patch(`/bookshelves/${data.shelfName}/add/${data.bookId}`,{},{headers :{
            'x-access-token':localStorage.getItem('token')
        }});
        toast.promise(response,{
            loading :'adding book to shelf data',
            success :'Successfully added to shelf',
            error :'Something went wrong'
        });
        return await response;
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong cannot download bookshelves');
    }
})

const ShelvesSlice = createSlice({
    name :'shelf',
    initialState,
    reducers :{},
    extraReducers : (builder) => {
        builder.addCase(getAllBookShelves.fulfilled,(state,action)=>{
            if (action?.payload?.data?.data){
                state.shelfList = action?.payload?.data?.data;
            }
        });
    }
});


export default ShelvesSlice.reducer;
