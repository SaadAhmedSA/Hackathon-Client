"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [deposit, setDeposit] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const categories = {
    Wedding: ["Valima", "Furniture", "Valima Food", "Jahez"],
    "Home Construction": ["Structure", "Finishing", "Loan"],
    Business: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    Education: ["University Fees", "Child Fees Loan"],
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory("");
  };

  useEffect(() => {
    if (loanAmount && loanPeriod && deposit) {
      const P = loanAmount - deposit;
      const annualInterestRate = 10;
      const R = annualInterestRate / 12 / 100;
      const N = loanPeriod * 12;

      if (P > 0 && N > 0) {
        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        setMonthlyPayment(emi.toFixed(2));
      } else {
        setMonthlyPayment(null);
      }
    }
  }, [loanAmount, loanPeriod, deposit]);

  const validatePopupForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!password.trim()) newErrors.name = "password is required.";
    if (!cnic.trim() || !/^\d{13}$/.test(cnic)) newErrors.cnic = "Enter a valid 13-digit CNIC.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const loanData = {
      email,
      selectedCategory,
      selectedSubcategory,
      loanAmount,
      loanPeriod,
      deposit,
      monthlyPayment,
    };
    localStorage.setItem('email', email);

    try {
      const response = await axios.post('https://hackathon-project-server.vercel.app/api/v1/addloan', loanData);
      console.log(response.data);
      setIsPopupOpen(true);
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting the loan request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handlePopupSubmit = async (event) => {
    event.preventDefault();

    if (validatePopupForm()) {
      setIsLoading(true);

      const userData = {
        name,
        cnic,
        email,
        password // Make sure email is included here
      };

      const newuserData = {
        name,
        cnic,
        email,
        selectedCategory,
        selectedSubcategory,
        loanAmount,
        loanPeriod,
        deposit,
        monthlyPayment,
      };

      try {
        const response = await axios.post('https://hackathon-project-server.vercel.app/api/v1/register', userData);
        console.log(response.data);
        Swal.fire("Loan Request Submitted");
        const query = new URLSearchParams(newuserData).toString();
        router.push(`/auth/slip?${query}`);
        setIsPopupOpen(false);
      } catch (error) {
        setIsLoading(true);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        setIsLoading(true);
      }
    }
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Add Your Details for Applying Loan
      </h1>
      <form className="bg-base-300 rounded-lg p-6 md:p-10 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Loan Category</span>
            </label>
            <select className="select select-info w-full" value={selectedCategory} onChange={handleCategoryChange}>
              <option disabled value="">Select Category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div>
              <label className="label">
                <span className="label-text">Subcategory</span>
              </label>
              <select
                className="select select-info w-full"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option disabled value="">Select Subcategory</option>
                {categories[selectedCategory]?.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedCategory && (
            <div>
              <label className="label">
                <span className="label-text">Loan Amount</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter Loan Amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className={`input input-bordered w-full ${errors.email ? "border-red-500" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {selectedCategory && (
            <div>
              <label className="label">
                <span className="label-text">Loan Period (Years)</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter Loan Period"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(e.target.value)}
              />
            </div>
          )}

          {selectedCategory && (
            <div>
              <label className="label">
                <span className="label-text">Initial Deposit</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter Deposit"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
              />
            </div>
          )}
        </div>

        {monthlyPayment && (
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">
              Monthly Payment: PKR {monthlyPayment}
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary w-full max-w-sm">
            {isLoading ? "loading" : "Submit Loan Request"}
          </button>
        </div>
      </form>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
            <form onSubmit={handlePopupSubmit} className="flex flex-col gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.name ? "border-red-500" : ""}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">CNIC</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full ${errors.cnic ? "border-red-500" : ""}`}
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                />
                {errors.cnic && <p className="text-red-500 text-sm">{errors.cnic}</p>}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className={`input input-bordered w-full ${errors.email ? "border-red-500" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className={`input input-bordered w-full ${errors.password ? "border-red-500" : ""}`}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isLoading ? "loading" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
