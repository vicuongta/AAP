import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));

    const newErrors = { ...errors };

    if (name === "email") {
      if (!value) {
        newErrors.email = "";
      } else if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        newErrors.email = "";
      }
    }

    if (name === "password") {
      if (!value) {
        newErrors.password = "";
      } else if (value.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else if (value.length > 10) {
        newErrors.password = "Password must be no more than 10 characters";
      } else {
        newErrors.password = "";
      }
    }

    setErrors(newErrors);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 10) {
      newErrors.password = "Password must be no more than 10 characters";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    console.log("Form is valid:", formData);
    navigate('/homepage');
  };

  return (
    <div className="h-screen bg-[#f5f7f5] flex items-center justify-center overflow-hidden px-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-4 py-4">
        {/* Top logo + brand */}
        <Link 
          to="/"
          className="flex flex-col items-center gap-3 mb-2 no-underline cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#0b5d42] flex items-center justify-center text-white font-bold">
            A
          </div>
          <h1 className="text-xl font-bold text-black">AAP</h1>
        </Link>

        {/* Card */}
        <div className="w-full bg-white rounded-3xl shadow-lg p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <h2 className="text-2xl font-extrabold text-center mb-4">
              Sign In
            </h2>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className={`w-full px-4 py-2 text-sm border rounded-3xl focus:outline-none focus:ring-2 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#0b5d42]'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPw ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className={`w-full px-4 py-2 pr-10 text-sm border rounded-3xl focus:outline-none focus:ring-2 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-[#0b5d42]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#0b5d42] hover:bg-[#0a4e37] text-white font-bold rounded-full transition-colors"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-sm text-gray-500">or continue with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google button */}
            <button
              type="button"
              className="w-full py-3 border border-gray-300 rounded-3xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <Link
            to="/reset-password"
            className="text-[#0b5d42] font-semibold no-underline hover:underline"
          >
            Forgot password?
          </Link>

          <div className="flex gap-1">
            <span className="text-gray-600">Don't have an account?</span>
            <Link
              to="/register"
              className="text-[#0b5d42] font-semibold no-underline hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;