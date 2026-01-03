import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { createPageUrl } from "@/utils";
import axios from "axios";
import logo from '../assets/QBtron.png';

function RegisterPage() {
  const [formValue, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));

    const newErrors = { ...errors };

    if (name === "firstName") newErrors.firstName = "";
    if (name === "lastName") newErrors.lastName = "";

    if (name === "email") {
      if (!value) newErrors.email = "";
      else if (!validateEmail(value)) newErrors.email = "Please enter a valid email address";
      else newErrors.email = "";
    }

    if (name === "password") {
      if (!value) newErrors.password = "";
      else if (value.length < 6) newErrors.password = "Password must be at least 6 characters";
      else if (value.length > 10) newErrors.password = "Password must be no more than 10 characters";
      else newErrors.password = "";

      if (formValue.confirmPassword && value !== formValue.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else if (formValue.confirmPassword && value === formValue.confirmPassword) {
        newErrors.confirmPassword = "";
      }
    }

    if (name === "confirmPassword") {
      if (!value) newErrors.confirmPassword = "";
      else if (value !== formValue.password) newErrors.confirmPassword = "Passwords do not match";
      else newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formValue.firstName) newErrors.firstName = "First Name is required";
    if (!formValue.lastName) newErrors.lastName = "Last Name is required";

    if (!formValue.email) newErrors.email = "Email is required";
    else if (!validateEmail(formValue.email)) newErrors.email = "Please enter a valid email address";

    if (!formValue.password) newErrors.password = "Password is required";
    else if (formValue.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    else if (formValue.password.length > 10) newErrors.password = "Password must be no more than 10 characters";

    if (!formValue.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formValue.password !== formValue.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    console.log("Form is valid:", formValue);

    try {
      await axios.post("/api/auth/register", {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
      });

      // optional: reset form after success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      alert("Registration successful! Please log in.");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(245,247,245)] flex overflow-hidden">
      <div className="flex-1 bg-[#0b5d42]">
          {/* Put some text here */}
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md py-4">
          {/* Logo & Brand */}
          <Link
            to={createPageUrl("Landing")}
            className="flex items-center justify-center gap-3 cursor-pointer mb-8">
            <div className="w-14 h-14 overflow-hidden">
              <img src={logo} alt="logo-img" />
            </div>
            {/* <h1 className="text-4xl font-bold text-black">AAP</h1> */}
          </Link>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="text-center mb-10">
                <h2 className="text-2xl font-extrabold mb-1">Create Your Account</h2>
                <p className="text-sm text-gray-600">Sign up to start building your personalized study schedule.</p>
              </div>

              {/* First Name and Last Name */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formValue.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className={`w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#0b5d42] ${errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>

                <div className="flex-1">
                  <label className="block text-sm mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formValue.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className={`w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#0b5d42] ${errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-1">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formValue.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#0b5d42] ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    name="password"
                    value={formValue.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className={`w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#0b5d42] pr-10 ${errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm mb-1">Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirmPw ? "text" : "password"}
                    name="confirmPassword"
                    value={formValue.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className={`w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#0b5d42] pr-10 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showConfirmPw ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#0b5d42] hover:bg-[#0a4e37] text-white font-bold rounded-full transition-colors cursor-pointer"
              >
                Create Account
              </button>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-sm text-gray-500">or continue with</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                className="w-full py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <span className="text-gray-600">Already have an account? </span>
            <Link to={createPageUrl("Login")} className="text-[#0b5d42] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default RegisterPage;