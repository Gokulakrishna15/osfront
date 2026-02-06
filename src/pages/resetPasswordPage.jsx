import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://online-assessment-backend-wnre.onrender.com/api/auth/reset-password/${token}`,
        {
          password: newPassword,
        }
      );
      console.log(res.data);
      setMessage("Password reset successful!");
      alert("Password reset! You can now login.");
      navigate("/");
    } catch (err) {
      console.error(err?.response?.data?.message || "Something went wrong");
      setMessage("Invalid or expired token.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-left mb-2 text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-red-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
