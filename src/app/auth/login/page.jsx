"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter()

  const submit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("https://hackathon-project-server.vercel.app/api/v1/login", {
        email,
        password,
      });
      
    console.log(response.data);
   
    

     
      Swal.fire("login Successfully");
      router.push("/home")
    } catch (error) {
      console.log("Login failed:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:error.response.data.mesaage,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your Account
        </h1>
      </div>
      <form onSubmit={submit}>
        <div className="mb-4">
          <p>Email</p>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Enter your Email"
              ref={emailRef}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <p>Password</p>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Enter your password"
              ref={passwordRef}
              required
            />
          </label>
        </div>
        <div className="mb-6">
          <button type="submit" className="btn btn-success w-full">
            Sign In
          </button>
        </div>
      </form>
      <div className="text-center">
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            href={"/auth/Register"}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
