import React, { useState, useContext } from "react";
import { loginUser, signupUser } from "../api/authUser.js";
import { useToast } from "../context/ToastContext";
import UserContext from "../context/UserContext.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await loginUser(email, password);

      if (userData.success) {
        updateUser(userData);
        success("Login successful! 🎉");
        navigate("/"); // Navigate to home page after successful login
      } else {
        error(userData.message || "Login failed.");
      }
    } catch (err) {
      error(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await signupUser({ role, email, password });

      if (userData.success) {
        success("Signup successful! 🎉 Please login.");
        setIsLogin(true); // Switch to login after successful signup
      } else {
        error(userData.message || "Signup failed.");
      }
    } catch (err) {
      error(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500 px-4 sm:px-6 lg:px-8">
      <h1 className="text-6xl text-white absolute top-4">Zomato</h1>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-6">
          {isLogin ? "Welcome Back!" : "Join Us Today!"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Role
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Delivery Partner">Delivery Partner</option>
              <option value="Restaurant">Restaurant</option>
            </select>
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
        />

        <button
          className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={isLogin ? handleLogin : handleSignup}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : isLogin ? "Login" : "Signup"}
        </button>

        <p className="text-center mt-4 text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-red-500 font-semibold cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign up" : " Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
