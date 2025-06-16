import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logomain from "../../assets/logomain.webp";
import logoback from "../../assets/backloginimage.webp";
import Input from "../../components/global/Input";
import { NavLink, useNavigate } from "react-router";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Logging in...");
    navigate("/app/Dashboard");
  };

  return (
    <div className="min-h-screen flex bg-[#f4f8ff] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-0 lg:p-12">
        <div className="w-full max-w-md p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src={logomain} className="mx-auto h-[10em] object-contain" />
            <h2 className="text-3xl font-[600] text-gray-900 mt-4">Welcome Back!</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email here"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-800 text-[15px] font-[500]">Password</label>
                <button type="button" className="text-sm text-[#0084FF] hover:underline text-[13px]">
                  <NavLink
                    to={"/auth/forgot-password"}
                  >
                    Forgot Password?
                  </NavLink>
                </button>
              </div>
              <div className="relative">
                <Input
                  label=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password here"
                  showToggle
                />
               
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full font-semibold hover:opacity-90 transition"
            >
              Log In
            </button>

            <p className="text-center text-gray-700 text-sm">
              Don’t have an account?{" "}
              <button type="button" className="text-blue-600 font-semibold hover:underline">
                
                <NavLink
                    to={"/auth/signup"}
                  >
                    Create One
                  </NavLink>
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="hidden lg:block lg:w-1/2 h-screen">
        <img
          src={logoback}
          alt="Background"
          className="w-full h-full object-cover rounded-bl-[4em] rounded-tl-[2em]"
        />
      </div>
    </div>
  );
}
