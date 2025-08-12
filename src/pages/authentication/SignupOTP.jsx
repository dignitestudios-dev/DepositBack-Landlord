import { useState, useRef, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import logoback from "../../assets/backloginimage.webp";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import Modal from "../../components/global/Modal";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import SubmitButton from "../../components/global/SubmitButton";
import CountDown from "./CountDown";
import { AppContext } from "../../context/AppContext";

export default function SignupOTP() {
  const { loginContext } = useContext(AppContext);

  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [showModal, setShowModal] = useState(false);
  const inputs = useRef([]);
  const location = useLocation();
  const { email } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(200);

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
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, otp.length)
      .split("");
    const newOtp = [...otp];
    pasteData.forEach((char, idx) => {
      if (/\d/.test(char)) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);
    const nextIndex =
      pasteData.length < otp.length ? pasteData.length : otp.length - 1;
    inputs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      ErrorToast("Please enter complete OTP.");
      return;
    }
    const otpValue = otp.join("");

    try {
      setLoading(true);
      const response = await axios.post("/auth/validateOTP", {
        code: otpValue,
        email: email,
        role: "landlord",
      });
      if (response.status === 200) {
        let data = response?.data?.data;
        // SuccessToast("Otp Verified");
        loginContext(data);

        setShowModal(true);
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      let obj = {
        email: email,
        role: "landlord",
      };

      const response = await axios.post("/auth/sendOTP", obj);

      if (response.status === 201) {
        SuccessToast(response?.data?.message);
        setResendLoading(false);
        setOtp(Array(5).fill("")); // Reset OTP fields
        handleRestart();
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleRestart = () => {
    setSeconds(200);
    setIsActive(true);
  };

  return (
    <div className="min-h-screen flex bg-[#f4f8ff] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-start p-0 lg:p-12">
        <div className="w-full max-w-md pt-[4em] pr-[3em]">
          <div className="text-left mb-6">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-[36px] mt-2 font-[600] capitalize pt-[20px]">
              Verification
            </h2>
            <p className="text-[17px] text-[#868686] mt-2">
              Enter the OTP sent to{" "}
              <span className="font-semibold text-blue-600">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-6">
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

            <div className="flex items-center justify-start gap-2 relative z-10">
              <p className=" text-[16px] leading-[21.6px] text-[#565656]">
                Didn&apos;t receive the code yet?
                {isActive ? (
                  <span className="inline-block ml-1 align-middle">
                    <CountDown
                      isActive={isActive}
                      setIsActive={setIsActive}
                      seconds={seconds}
                      setSeconds={setSeconds}
                    />
                  </span>
                ) : (
                  <span
                    type="button"
                    disabled={resendLoading}
                    onClick={handleResendOtp}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-medium pl-1 cursor-pointer"
                  >
                    {resendLoading ? "Resending..." : "Resend"}
                  </span>
                )}
              </p>
            </div>

            <div className="pt-0">
              <SubmitButton text="Verify" loading={loading} type="submit" />
            </div>
            {/* <button
              type="submit"
              className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
            >
              Verify
            </button> */}
          </form>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onAction={() => {
              setShowModal(false);
              navigate("/onboarding/personal-info");
            }}
            data={{
              title: "Email Verified!",
              description: "Your Email has been verified.",
              actionText: "ok",
              iconBgColor: "bg-blue-600", // Optional
            }}
          />
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
