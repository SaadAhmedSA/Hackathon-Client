"use client";

import React, { Suspense } from "react";
import QRCode from "react-qr-code";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SlipPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve user data from query parameters
  const name = searchParams.get("name") || "N/A";
  const cnic = searchParams.get("cnic") || "N/A";
  const email = searchParams.get("email") || "N/A";
  const loanAmount = searchParams.get("loanAmount") || "N/A";
  const monthlyPayment = searchParams.get("monthlyPayment") || "N/A";
  const purpose = searchParams.get("selectedCategory") || "N/A";

  const qrData = {
    name,
    cnic,
    email,
    loanAmount,
    monthlyPayment,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <Image src={"/log.png"} width={150} height={150} alt="logo" />

        <h1 className="text-2xl font-bold mb-4 text-center">Loan Slip</h1>

        {/* User Data */}
        <div className="mb-6">
          <p className="text-lg font-semibold">
            Name: <span className="font-normal">{name}</span>
          </p>
          <p className="text-lg font-semibold">
            CNIC: <span className="font-normal">{cnic}</span>
          </p>
          <p className="text-lg font-semibold">
            Email: <span className="font-normal">{email}</span>
          </p>
          <p className="text-lg font-semibold">
            Purpose: <span className="font-normal">{purpose}</span>
          </p>
          <p className="text-lg font-semibold">
            Loan Amount: <span className="font-normal">{loanAmount}</span>
          </p>
          <p className="text-lg font-semibold">
            Monthly Payment: <span className="font-normal">{monthlyPayment}</span>
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <QRCode value={JSON.stringify(qrData)} size={150} level="H" />
        </div>

        {/* Print Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              window.print();
              router.push("/auth/login");
            }}
            className="btn btn-primary px-6 py-2 text-white rounded-lg"
          >
            Save Slip
          </button>
        </div>
      </div>
    </div>
  );
};

const SlipPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SlipPage />
  </Suspense>
);

export default SlipPageWithSuspense;
