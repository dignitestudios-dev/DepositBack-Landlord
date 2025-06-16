import ForgetPassword from "../../pages/authentication/ForgetPassword";
import Login from "../../pages/authentication/Login";
import ResetPassword from "../../pages/authentication/ResetPassword";
import Signup from "../../pages/authentication/Signup";
import SignupOTP from "../../pages/authentication/SignupOTP";
import VerifyOtp from "../../pages/authentication/VerifyOtp";

export const AuthRoute = [
  {
    url: "login",
    page: <Login />,
    name: "Login",
    isPublic: true,
  },
  {
    url: "forgot-password",
    page: <ForgetPassword />,
    name: "Forgot Password",
    isPublic: true,
  },
  {
    url: "verify-otp",
    page: <VerifyOtp />,
    name: "Verify OTP",
    isPublic: true,
  },
  {
    url: "reset-password",
    page: <ResetPassword />,
    name: "Reset Password",
    isPublic: true,
  },
  {
    url: "signup",
    page: <Signup />,
    name: "Sign Up",
    isPublic: true,
  },
  {
    url: "signup-otp",
    page: <SignupOTP />,
    name: "Signup-otp",
    isPublic: true,
  },

]