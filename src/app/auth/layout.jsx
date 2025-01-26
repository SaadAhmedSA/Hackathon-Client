"use client"

import React from 'react'

const page = ({children}) => {
  return (
    
    <div className='flex min-h-screen w-full'>
    <div className='hidden lg:flex justify-center bg-green-600 items-center w-1/2 px-12'>
    <div className='max-w-md space-y-6 text-center text-white'>
        <h1 className='text-4xl font-extrabold tracking-tight'>Welcome to Saylani Microfinance App</h1>
    </div>
    </div>
    <div className='flex flex-1 justify-center items-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      {children}
    </div>

   
</div>
  )
}

export default page