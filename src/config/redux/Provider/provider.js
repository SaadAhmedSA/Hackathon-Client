"use client"
import {Provider} from "react-redux"
import React from 'react'
import { store } from '../store'


const Reduxprovider = ({children}) => {
   
  return (
    <Provider store={store}>

        {children}
        </Provider>
  )
}

export default Reduxprovider