import { createSlice } from "@reduxjs/toolkit";

const isLoginslice=createSlice({
    name:"isLogin",
    initialState:{isLogin:false},
    reducers:{
        setislogin:(state,action)=>{
            state.isLogin=action.payload;
        },
    }
})

export const {setislogin} =isLoginslice.actions;
export default isLoginslice.reducer;