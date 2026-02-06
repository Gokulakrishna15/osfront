import axios from "axios";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router";

// FIXED: Define the URL here so we don't use localhost
const API_URL = "https://osback.onrender.com";

const reducer = (state, action) => {
  switch (action.type) {
    case "firstName":
      return { ...state, firstName: action.payload };
    case "lastName":
      return { ...state, lastName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "role":
      return { ...state, role: action.payload };
    case "reset":
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "student",
      };
    default:
      return state;
  }
};

function Login() {
  const [inputValues, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (isRegistering && !inputValues.firstName.trim())
      tempErrors.firstName = "First name is required";
    if (isRegistering && !inputValues.lastName.trim())
      tempErrors.lastName = "Last name is required";
    if (!inputValues.email.trim())
      tempErrors.email = "Email is required";
    if (!inputValues.password.trim())
      tempErrors.password = "Password is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      // FIXED: Switched from localhost to API_URL
      const res = await axios.post(
        `${API_URL}/api/auth/login`, 
        {
          email: inputValues.email,
          password: inputValues.password,
        },
        { withCredentials: true }
      );

      if (!res.data || !res.data.user) {
        setMessage("Login failed. Please try again.");
        return;
      }

      setMessage("Login Successful ✅");
      dispatch({ type: "reset" });
      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setMessage(errorMessage);
    }
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      // FIXED: Switched from localhost to API_URL
      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          firstName: inputValues.firstName,
          lastName: inputValues.lastName,
          email: inputValues.email,
          password: inputValues.password,
          role: inputValues.role,
        },
        { withCredentials: true }
      );

      setMessage(
        res.data.message || "User Registered Successfully ✅ Please login."
      );
      dispatch({ type: "reset" });
      setIsRegistering(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Try again.";
      setMessage(errorMessage);
    }
  };

  const handleClick = () => {
    navigate("/forget-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {isRegistering ? "Register" : "Login"}
        </h1>

        {message && <p className="text-center text-red-500 mb-2">{message}</p>}

        <form
          className="space-y-4"
          onSubmit={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Enter first name..."
                  value={inputValues.firstName}
                  onChange={(e) =>
                    dispatch({ type: "firstName", payload: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter last name..."
                  value={inputValues.lastName}
                  onChange={(e) =>
                    dispatch({ type: "lastName", payload: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </>
          )}

          <div>
            <input
              type="email"
              placeholder="Enter email..."
              value={inputValues.email}
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password..."
              value={inputValues.password}
              onChange={(e) =>
                dispatch({ type: "password", payload: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {isRegistering && (
            <select
              value={inputValues.role}
              onChange={(e) =>
                dispatch({ type: "role", payload: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="proctor">Proctor</option>
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 hover:underline"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>

        {!isRegistering && (
          <button
            onClick={handleClick}
            className="mt-4 text-blue-500 text-sm hover:underline block mx-auto"
          >
            Forgot password?
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;