import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemslice/itemslice.js"


export const store = configureStore({
    reducer:{
        items:itemsReducer
    }
})