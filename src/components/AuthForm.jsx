/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ mode }) => {
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    BirthDate: "",
    PhoneNumber: "",
    Province: "",
    City: "",
    Nation: "",
    Address: "",
    Password: "",
    ConfirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const goToForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "signup" && formData.Password !== formData.ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload =
      mode === "signup"
        ? formData
        : { email: formData.Email, password: formData.Password };

    const action =
      mode === "signup" ? registerUser(payload) : loginUser(payload);
    const result = await dispatch(action);

    if (result.meta.requestStatus === "fulfilled") {
      if (mode === "signup") {
        alert("Đăng kí thành công");
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        navigate("/"); // Redirect to home page after successful login
      }
    }
  };

  return (
    <div className="auth-form w-full mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {mode === "signup" && (
          <>
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="BirthDate"
                  className="block font-medium text-gray-700"
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  name="BirthDate"
                  value={formData.BirthDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="PhoneNumber"
                  className="block font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="PhoneNumber"
                  placeholder="Phone Number"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="Province"
                  className="block font-medium text-gray-700"
                >
                  Province
                </label>
                <input
                  type="text"
                  name="Province"
                  placeholder="Province"
                  value={formData.Province}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="City"
                  className="block font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  name="City"
                  placeholder="City"
                  value={formData.City}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="Address"
                className="block font-medium text-gray-700"
              >
                Full Address
              </label>
              <textarea
                name="Address"
                placeholder="Full Address"
                value={formData.Address}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Nation"
                className="block font-medium text-gray-700"
              >
                Nation
              </label>
              <input
                type="text"
                name="Nation"
                placeholder="Nation"
                value={formData.Nation}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {mode === "login" && (
            <a
              onClick={goToForgotPassword}
              className="cursor-pointer text-sm text-yellow-500 hover:text-yellow-700"
            >
              Forgot Password?
            </a>
          )}
        </div>
        {mode === "signup" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="ConfirmPassword"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-lime-500 text-white p-2 rounded hover:bg-lime-600"
          disabled={loading}
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
