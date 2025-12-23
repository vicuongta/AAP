import { useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";

function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));

    const newErrors = { ...errors };

    if (name === "newPassword") {
      if (!value) {
        newErrors.newPassword = "";
      } else if (value.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      } else if (value.length > 10) {
        newErrors.newPassword = "Password must be no more than 10 characters";
      } else {
        newErrors.newPassword = "";
      }

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else if (formData.confirmPassword && value === formData.confirmPassword) {
        newErrors.confirmPassword = "";
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        newErrors.confirmPassword = "";
      } else if (value !== formData.newPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        newErrors.confirmPassword = "";
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (formData.newPassword.length > 10) {
      newErrors.newPassword = "Password must be no more than 10 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (newErrors.newPassword || newErrors.confirmPassword) {
      setErrors(newErrors);
      return;
    }

    console.log("Form is valid:", formData);
    alert("Password reset successful! In production, this would call the API.");
  };

  return (
    <div className="min-h-screen bg-[rgb(245,247,245)] flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-md py-4">
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <div className="flex flex-col items-center mb-4">
            <div className="w-12 h-12 bg-[#0b5d42] rounded-full flex items-center justify-center mb-3">
              <LockKeyhole className="w-6 h-6 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-center mb-1">
            Reset your password
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Choose a new password to regain access to your account.
          </p>

          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#0b5d42] pr-10 ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPw ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#0b5d42] pr-10 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Reset Password Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#0b5d42] hover:bg-[#0a4e37] text-white font-bold rounded-full transition-colors mt-6"
            >
              Reset password
            </button>

            {/* Back to Sign In Link */}
            <div className="text-center mt-4">
              <Link to="/login" className="text-[#0b5d42] font-semibold hover:underline">
                Back to sign in
              </Link>
            </div>

            {/* Security Notice */}
            <p className="text-xs text-gray-500 text-center mt-4">
              For your security, never share your password with anyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;