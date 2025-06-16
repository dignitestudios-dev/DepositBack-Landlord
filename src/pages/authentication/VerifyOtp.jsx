import { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import logoback from "../../assets/backloginimage.webp";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const location = useLocation();
  const {email} = location.state || {};

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length).split("");
    const newOtp = [...otp];
    pasteData.forEach((char, idx) => {
      if (/\d/.test(char)) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);
    const nextIndex = pasteData.length < otp.length ? pasteData.length : otp.length - 1;
    inputs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      alert("Please enter complete OTP.");
      return;
    }
    const otpValue = otp.join("");
    alert(`Verifying OTP: ${otpValue}`);
    navigate("/auth/reset-password");
  };

  return (
    <div className="min-h-screen flex bg-[#f4f8ff] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-start p-0 lg:p-12">
        <div className="w-full max-w-md pt-[4em] pr-[4em]">
          <div className="text-left mb-6">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-[36px] mt-2 font-bold capitalize pt-[20px]">Verification</h2>
            <p className="text-[17px] text-[#868686] mt-2">
              Enter the OTP sent to <span className="font-semibold text-black">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => (inputs.current[index] = el)}
                  className="w-[50px] h-[55px] rounded-[12px] text-blue-600 bg-transparent outline-none text-center border border-gray-400 text-xl focus:border-blue-600"
                />
              ))}
            </div>

            <button
              type="submit"
              className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
            >
              Verify
            </button>
          </form>
        </div>
      </div>

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
