import React, { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (email.trim() === "") {
      newErrors.email = "Email is required";
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError(null);
    setSuccessMessage(null);

    if (!validateInputs()) {
      return;
    }

    try {
      await logIn(email, password);
      setSuccessMessage("Logged in successfully");
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setBackendError("Invalid email address");
          break;
        case "auth/user-disabled":
          setBackendError("User account is disabled");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          setBackendError("Incorrect email or password");
          break;
        default:
          setBackendError("An error occurred. Please try again");
          break;
      }
      console.log(error.message);
      console.log("Error logging in");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="px-5 py-8 h-screen sm:max-w-[600px] w-full">
        <div className="editor mt-12">
          <h1 className="text-3xl font-bold mb-2">Hello,</h1>
          <p className="text-lg">Welcome Back!</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-14" action="">
          <div className="form-group flex flex-col mb-5">
            <label>Email</label>
            <input
              value={email}
              onChange={handleEmail}
              className="border border-gray-400 rounded-lg px-3 py-4"
              type="email"
              id="email"
              placeholder="Enter Email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="form-group flex flex-col mb-5">
            <label>Password</label>
            <input
              value={password}
              onChange={handlePassword}
              className="border border-gray-400 rounded-lg px-3 py-4"
              type="password"
              id="password"
              placeholder="Enter Password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="terms"
              className="ml-2 text-sm text-yellow-500 cursor-pointer"
            >
              Forgot Password?
            </label>
          </div>
          {backendError && (
            <div className="text-red-500 text-sm mt-3">{backendError}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-lg font-semibold mt-3">
              {successMessage}
            </div>
          )}
          <div className="form-group">
            <button className="custom-button w-full rounded-xl mt-8 font-medium text-md text-white cursor-pointer justify-center items-center inline-flex py-4 px-6 bg-red-500 hover:bg-red-700">
              Sign up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400 text-sm mt-10">
          Or sign in with
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="google p-3 rounded-xl cursor-pointer">
            <FcGoogle className="h-8 w-8" />
          </div>
          <div className="p-3 rounded-xl google cursor-pointer">
            <FaFacebookSquare className="h-8 w-8" />
          </div>
        </div>
        <p className="text-center mt-14 font-semibold text-sm">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-yellow-500">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
