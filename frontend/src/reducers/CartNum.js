
import {createSlice} from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useState } from 'react';
const cartitem=JSON.parse(localStorage.getItem('cart')); 
function init(){
    let cartnum=0;
    if(cartitem){
        cartnum=cartitem.length;
    }
    return cartnum;
}
const cartslice=createSlice({
    name:"cartnum",
    initialState:{num:init()},
    reducers:{
        setCart:(state,action)=>{
            state.num=action.payload;
        },
        rmCart:(state)=>{
            state.num-=1;
        }
    }
})

export const {setCart,rmCart} =cartslice.actions;
export default cartslice.reducer;
