"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const LoanTable = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch loan data
  const fetchLoans = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Retrieve email from localStorage
      const email = localStorage.getItem("email");
      if (!email) throw new Error("Email not found in local storage.");

      // Send POST request with email
      const response = await axios.post("http://localhost:5000/api/v1/getemail", {
        email,
      });

      // Assuming response contains a `loans` array
      setLoans(response.data.loans);
    } catch (err) {
      setError(err.message || "Failed to fetch loans.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch loans when the component mounts
  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Loan Requests
      </h1>

      {isLoading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Subcategory</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Period</th>
                <th className="border border-gray-300 px-4 py-2">Deposit</th>
                <th className="border border-gray-300 px-4 py-2">Monthly payment</th>
              </tr>
            </thead>
            <tbody>
              {loans.length > 0 ? (
                loans.map((loan, index) => (
                  <tr key={loan._id}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{loan.selectedCategory}</td>
                    <td className="border border-gray-300 px-4 py-2">{loan.selectedSubcategory}</td>
                    <td className="border border-gray-300 px-4 py-2">Rs:{loan.loanAmount}</td>
                    <td className="border border-gray-300 px-4 py-2">{loan.loanPeriod}/years</td>
                    <td className="border border-gray-300 px-4 py-2">Rs:{loan.deposit}</td>
                    <td className="border border-gray-300 px-4 py-2">Rs:{loan.monthlyPayment}/mon</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No loans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoanTable;
