/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/CRUD";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token")?.replace(/ /g, "+");
    const emailFromUrl = urlParams.get("email");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("Token is missing from the URL.");
    }

    if (emailFromUrl) {
      setEmail(emailFromUrl);
    } else {
      setError("Email is missing from the URL.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (!token || !email) {
      setError("Token and Email are required.");
      return;
    }

    try {
      await resetPassword({
        Email: email,
        NewPassword: newPassword,
        Token: token,
      });
      setSuccess("Đặt lại mật khẩu thành công.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại."
      );
    }
  };

  const handleBackToSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Reset Password
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Create your new password
        </p>
        {error && <p className="mb-4 text-center text-red-600">{error}</p>}
        {success && (
          <p className="mb-4 text-center text-green-600">{success}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="mb-2 block font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="new-password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {/* Icon toggle logic */}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="mb-2 block font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {/* Icon toggle logic */}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-500 px-4 py-2 font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            onClick={handleBackToSignIn}
            className="cursor-pointer text-sm text-gray-500 hover:text-gray-700"
          >
            &#x2190; Back to sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
