import axios from "axios";
import { useState } from "react";

const ForgetPasswordPage = () => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forget-password", {
        email: input,
      });
      console.log(res.data);
      alert("Check your email for reset instructions");
    } catch (err) {
      console.error(err?.response?.data?.message || "Something went wrong");
      alert("Failed to send reset email");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={input}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={handleClick}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;