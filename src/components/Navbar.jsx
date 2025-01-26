"use client"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  // const [products, setProducts] = useState('');
 
  useEffect(() => {
      setLoggedInUser(localStorage.getItem('user'))
  }, [])
  const [isOpen, setIsOpen] = useState(false);
  const Router = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // console.log(cookie);
  
  const handleLogout = async(e) => {
    try {
      const response = await axios.get("https://hackathon-project-server.vercel.app/api/v1/logout")
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setLoggedInUser(null)
      Swal.fire("logout Successfully")
      setTimeout(() => {
          Router.push('/auth/login');
      }, 1000)
    } catch (error) {
      Swal.fire(error)
      
    }

   
}

  return (
    <nav className=" p-2 border-b-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white flex items-center gap-5 font-bold text-xl">
        <Image src={"/log.png"} width={200} height={200} alt='logo'/>
        </div>

        <div className='flex gap-5'>
          <Link href={"/"}>Add request</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/home"}>list</Link>
        </div>
        <div>
          <button className='btn btn-success' ><Link href={"/auth/login"}>login</Link></button>

        </div>

    </div>
    </nav>
  );
};

export default Navbar;