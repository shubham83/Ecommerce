import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart_Slice";

export const store= configureStore({
    reducer:{
        allCart:cartSlice
    }
})