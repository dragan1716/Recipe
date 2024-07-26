import React, { useEffect, useState } from "react";
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const useDebouncedValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const debouncedFirstName = useDebouncedValue(firstName, 500);
  const debouncedLastName = useDebouncedValue(lastName, 500);
  const debouncedEmail = useDebouncedValue(email, 500);
  const debouncedPassword = useDebouncedValue(password, 500);

  useEffect(() => {
    const newErrors = {};
    if (touched.firstName && debouncedFirstName.trim().length === 0) {
      newErrors.firstName = "First name is required";
    } else if (touched.firstName && debouncedFirstName.trim().length < 3) {
      newErrors.firstName = "First name must contain at least 3 characters!";
    }
    if (touched.lastName && debouncedLastName.trim().length === 0) {
      newErrors.lastName = "Last name is required";
    } else if (touched.lastName && debouncedLastName.trim().length < 3) {
      newErrors.lastName = "Last name must contain at least 3 characters!";
    }
    if (touched.email && debouncedEmail.trim().length === 0) {
      newErrors.email = "Email is required";
    } else if (
      touched.email &&
      (!debouncedEmail.includes("@") || !debouncedEmail.includes("."))
    ) {
      newErrors.email = "Email must contain '.' and '@'";
    }
    if (touched.password && debouncedPassword.trim().length === 0) {
      newErrors.password = "Password is required";
    } else if (
      touched.password &&
      (debouncedPassword.length < 8 ||
        !/[A-Z]/.test(debouncedPassword) ||
        !/[a-z]/.test(debouncedPassword) ||
        !/[0-9]/.test(debouncedPassword))
    ) {
      newErrors.password =
        "Password must contain at least 8 characters and include uppercase, lowercase, and a number!";
    }
    setErrors(newErrors);
  }, [
    debouncedFirstName,
    debouncedLastName,
    debouncedEmail,
    debouncedPassword,
    touched,
  ]);

  const { user, signUp } = UserAuth();
  console.log(user);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
    setTouched({ ...touched, firstName: true });

    console.log(firstName);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
    setTouched({ ...touched, lastName: true });

    console.log(lastName);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setTouched({ ...touched, email: true });

    console.log(email);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setTouched({ ...touched, password: true });

    console.log(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBackendError(null);
    setSuccessMessage(null);

    const newTouched = {
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    };
    setTouched(newTouched);

    const newErrors = {};
    if (firstName.trim().length === 0) {
      newErrors.firstName = "First name is required";
    } else if (firstName.trim().length < 3) {
      newErrors.firstName = "First name must contain at least 3 characters!";
    }
    if (lastName.trim().length === 0) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.trim().length < 3) {
      newErrors.lastName = "Last name must contain at least 3 characters!";
    }
    if (email.trim().length === 0) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Email must contain '.' and '@'";
    }
    if (password.trim().length === 0) {
      newErrors.password = "Password is required";
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      newErrors.password =
        "Password must contain at least 8 characters and include uppercase, lowercase, and a number!";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(email, password);
      setSuccessMessage("Account created successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setTouched({});
      console.log("test");
    } catch (error) {
      setBackendError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="px-5 py-8 h-screen sm:max-w-[600px] w-full">
        <div className="editor">
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-sm">
            Let's help you set up your account, <br />
            it won't take long
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-5" action="">
          <div className="form-group flex flex-col mb-5">
            <label htmlFor="name">First name</label>
            <input
              value={firstName}
              onChange={handleFirstName}
              className="border border-gray-400 rounded-lg px-3 py-4"
              type="text"
              id="firstname"
              placeholder="Enter First Name"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>
          <div className="form-group flex flex-col mb-5">
            <label>Last name</label>
            <input
              value={lastName}
              onChange={handleLastName}
              className="border border-gray-400 rounded-lg px-3 py-4"
              type="text"
              id="lastname"
              placeholder="Enter Last Name"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>
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
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms" className="ml-2 text-sm">
              I agree to the terms and conditions
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
        <p className="text-center text-gray-400 text-sm mt-3">
          Or sign in with
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="google p-3 rounded-xl cursor-pointer">
            <FcGoogle className="h-8 w-8" />
          </div>
          <div className="p-3 rounded-xl google cursor-pointer">
            <FaFacebookSquare className="h-8 w-8" />
          </div>
        </div>
        <p className="text-center mt-5 font-semibold text-sm">
          Already a member?{" "}
          <Link to="/login">
            <span className="text-yellow-500">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
