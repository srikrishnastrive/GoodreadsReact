import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
    bookList : []
 }

 export const getAllBooks = createAsyncThunk("book/getAllBooks",async (data)=>{
    try {
        const response = axiosInstance.get("books");
        toast.promise(response,{
            loading:'loading books data',
            success:'Sucessfully loaded all the books',
            error :'something went wrong'
        });
        return await response;
       
    } catch (error) {
        console.log(error);
        toast.error('something went wrong, cannot ');
    }
 });
 
 
const BookSlice = createSlice({
    name:'book',
    initialState,
    reducers:{
       
    },
    extraReducers : (builder) => {
        builder.addCase(getAllBooks.fulfilled,(state,action)=>{
            if (action?.payload?.data?.data){
                state.bookList = action?.payload?.data?.data;
            }
        })
    }

});



export default BookSlice.reducer;


