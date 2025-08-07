import { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import logomain from "../../assets/logomain.webp";
import logoback from "../../assets/backloginimage.webp";
import Input from "../../components/global/Input";
import { NavLink, useNavigate } from "react-router";
import Button from "../../components/global/Button";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import SubmitButton from "../../components/global/SubmitButton";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      navigate("/auth/verify-otp", { state: { email } });

      const response = await axios.post("/auth/sendPassOTP", {
        email: email,
        role: "landlord",
      });
      if (response.status === 200) {
        SuccessToast("Otp Verified");

        navigate("/auth/verify-otp", { state: { email } });
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f4f8ff] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-start p-0 lg:p-12">
        <div className="w-full max-w-md pt-[4em] pr-[4em]">
          {/* Logo */}
          <div className="text-left mb-6">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-[36px] mt-2 font-[600] leading-[48px] tracking-normal capitalize pt-[20px]">
              forgot password
            </h2>
            <p className="text-[17px] font-normal text-start mt-2 leading-[27px] text-[#868686]">
              Please enter your registered email to recover your password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email here"
              />
            </div>

            <SubmitButton text="Send OTP" loading={loading} type="submit" />
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
