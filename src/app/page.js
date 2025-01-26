import Card from '@/components/card'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <h1 className='text-center text-3xl my-5 text-blue-800 font-semibold'>Welcome To Saylani Microfinance App (SMA)</h1>
    <div className='md:m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
      <Card title={"Wedding Loans"} src={"/wedding.jpeg"}/>
      <Card title={"Home Construction Loans"} src={"/home.jpeg"}/>
      <Card title={"Bussiness Startup Loans"} src={"/business.jpeg"}/>
      <Card title={"Education Loans"} src={"/education.jpeg"}/>

    </div>
    </>
  )
}

export default page