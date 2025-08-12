import { useContext, useState } from "react";
import logomain from "../../assets/logomain.webp";
import logoback from "../../assets/backloginimage.webp";
import Input from "../../components/global/Input";
import { NavLink, useNavigate } from "react-router";
import { signInSchema } from "../../schema/authSchema";
import { useFormik } from "formik";
import { signInValues } from "../../init/authValues";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import SubmitButton from "../../components/global/SubmitButton";
import { AppContext } from "../../context/AppContext";

export default function LoginPage() {
  const { loginContext } = useContext(AppContext);
  // const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate("");

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: signInValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        let payload = {
          email: values.email,
          password: values.password,
          role: "landlord",
        };
        try {
          setLoading(true);
          const response = await axios.post("/auth/emailSignIn", payload);
          if (response.status === 200) {
            let data = response?.data?.data;
            console.log("user--->", data?.user);
            SuccessToast("Success");
            // if (!data?.user?.isSessionComplete) {
            //   navigate("/onboarding/personal-info");
            // } else if (!data?.user?.isSubscriptionPaid) {
            //   navigate("onboarding/subscription-plans");
            // } else {
            //   navigate("/app/Dashboard");
            // }
            loginContext(data);
          }
        } catch (error) {
          ErrorToast(error.response.data.message);
          // navigate("/auth/signup-otp", { state: { email: values.email } });
        } finally {
          setLoading(false);
        }
      },
    });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Logging in...");
  //   navigate("/app/Dashboard");
  // };

  return (
    <div className="min-h-screen flex bg-[#f4f8ff] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-0 lg:p-12">
        <div className="w-full max-w-md p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src={logomain} className="mx-auto h-[10em] object-contain" />
            <h2 className="text-3xl font-[600] text-gray-900 mt-4">
              Welcome Back!
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email here"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                maxLength={50}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-800 text-[15px] font-[500]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-[#0084FF] hover:underline text-[13px]"
                >
                  <NavLink to={"/auth/forgot-password"}>
                    Forgot Password?
                  </NavLink>
                </button>
              </div>
              <div className="relative">
                <Input
                  label=""
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
              </div>
            </div>

            <SubmitButton text="Login" loading={loading} type="submit" />

            <p className="text-center text-gray-700 text-sm">
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-blue-600 font-semibold hover:underline"
              >
                <NavLink to={"/auth/signup"}>Create One</NavLink>
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
