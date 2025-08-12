import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import logoback from "../../assets/backloginimage.webp";
import Input from "../../components/global/Input";
import { useLocation, useNavigate } from "react-router";
import Modal from "../../components/global/Modal";
import { useFormik } from "formik";
import { updatePasswordValues } from "../../init/authValues";
import { updatePasswordSchema } from "../../schema/authSchema";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import SubmitButton from "../../components/global/SubmitButton";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const { resetToken, email } = location.state || {};

  const navigate = useNavigate("");

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: updatePasswordValues,
      validationSchema: updatePasswordSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async () => {
        let obj = {
          email: email,
          role: "landlord",
          password: values.password,
          confirmPassword: values.cPassword,
          resetToken: resetToken,
        };
        try {
          setLoading(true);
          const response = await axios.post("/auth/updatePassOTP", obj);
          if (response.status === 200) {
            SuccessToast("Success");
            navigate("/auth/login");
          }
        } catch (error) {
          ErrorToast(error.response.data.message);
        } finally {
          setLoading(false);
        }
      },
    });

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     seterror("");

  //     if (!password || !newpassword) {
  //         seterror("Please fill this Both Fields.");
  //         return;
  //     }
  //     if (password !== newpassword) {
  //         seterror("Password do no match.");
  //         return;
  //     }

  //     setShowModal(true);

  // };

  return (
    <div className="min-h-screen flex bg-[#f4f8ff] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-start p-0 lg:p-12">
        <div className="w-full max-w-md pt-[4em] pr-[4em]">
          {/* Logo */}
          <div className="text-left mb-6">
            <h2 className="text-[36px] mt-2 font-bold leading-[48px] tracking-normal capitalize pt-[20px]">
              Reset Password
            </h2>
            <p className="text-[17px] font-normal text-start mt-2 leading-[27px] text-[#868686]">
              Enter new password to reset.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* {error && <p className="text-red-600 text-sm">{error}</p>} */}

            <div>
              <Input
                label="New password"
                placeholder="Enter password here"
                showToggle
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                maxLength={50}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div>
              <Input
                label="Confirm password"
                placeholder="Enter password here"
                showToggle
                type="password"
                id="cPassword"
                name="cPassword"
                value={values.cPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.cPassword}
                touched={touched.cPassword}
                maxLength={50}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <SubmitButton
              text="Update Password"
              loading={loading}
              type="submit"
            />
          </form>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onAction={() => {
              setShowModal(false);
              navigate("/auth/login");
            }}
            data={{
              title: "Password Updated!",
              description: "Your password has been reset successfully",
              actionText: "Continue",
              iconBgColor: "bg-blue-600", // Optional
            }}
          />
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
