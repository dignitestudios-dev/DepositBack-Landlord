import { useState } from "react";
import logomain from "../../assets/logomain.webp";
import logoback from "../../assets/backloginimage.webp";
import Input from "../../components/global/Input";
import "react-phone-input-2/lib/style.css";
import usaflag from "../../assets/usaflag.png";
import { NavLink, useNavigate } from "react-router";
import { useFormik } from "formik";
import { signUpValues } from "../../init/authValues";
import { signupSchema } from "../../schema/authSchema";
import { phoneFormatter } from "../../lib/helpers";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import SubmitButton from "../../components/global/SubmitButton";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function Signup() {
  const navigate = useNavigate("");

  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: signUpValues,
      validationSchema: signupSchema,
      validateOnChange: true,
      validateOnBlur: true,
      initialTouched: {
        email: true,
        number: true,
        password: true,
        cPassword: true,
      },
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const newUser = await createUserWithEmailAndPassword(
            auth,
            values.email.toLocaleLowerCase(),
            values.email.toLocaleLowerCase()
          );
          const token = await getIdToken(newUser.user);
          if (token) {
            handelSignUp(values, token);
          }
        } catch (error) {
          console.log("🚀 ~ Signup ~ error:", error);
          if (error?.message?.includes("auth/email-already-in-use")) {
            // Try to sign in the
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email.toLocaleLowerCase(),
                values.email.toLocaleLowerCase()
              );
              const user = userCredential?.user;
              //   // Get the ID token
              const token = await getIdToken(user);
              if (token) {
                handelSignUp(values, token);
              } else {
                ErrorToast("Token Not Found");
                setLoading(false);
              }
            } catch (err) {
              console.log("🚀 ~ ~ firebase Two is ~ err:", err);
              ErrorToast("Email is already in use");
              setLoading(false);
            }
          }
        }
      },
    });

  const handelSignUp = async (values, idToken) => {
    let formattedPhoneNumber = values?.number.startsWith("+1")
      ? values?.number
      : `+1${values?.number}`;

    let payload = {};

    payload = {
      email: values.email.toLocaleLowerCase(),
      phoneNo: formattedPhoneNumber,
      password: values.password,
      confirmPassword: values.password,
      role: "landlord",
      idToken,
    };
    try {
      const response = await axios.post("/auth/emailSignUp", payload);
      console.log("response--> ", response);
      if (response.status === 201) {
        SuccessToast("Account created successfully");
        navigate("/auth/signup-otp", { state: { email: values.email } });
      }
    } catch (error) {
      console.log("🚀 ~ Signup ~ error:", error);
      ErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     seterror("");

  //     if (!password || !confpassword) {
  //       seterror("Please fill this Both Fields.");
  //       return;
  //     }
  //     if (password !== confpassword) {
  //       seterror("Password do no match.");
  //       return;
  //     }
  //     alert("Sign up ...");
  //     navigate("/auth/signup-otp", { state: { email } });
  //   };

  return (
    <div className="min-h-screen flex bg-[#f4f8ff] overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-0 lg:p-12">
        <div className="w-full max-w-md p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src={logomain} className="mx-auto h-[10em] object-contain" />
            <h2 className="text-3xl font-[600] text-gray-900 mt-4">Signup</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* {error && <p className="text-red-600 text-sm">{error}</p>} */}

            <div>
              <Input
                placeholder="Enter email here"
                label="Email Address"
                type="email"
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
              <span className="block text-[15px] text-gray-800 font-[500]">
                Phone Number
              </span>
              <div className="flex gap-[10px] justify-start items-center">
                <div className="bg-white rounded-full p-3 pl-[13px] pr-[13px] flex items-center justify-center gap-3">
                  <img src={usaflag} className="h-5 w-[2.1em]" alt="" />
                  <p>+ 1</p>
                </div>
                <Input
                  label=""
                  type="tel"
                  placeholder="Add phone number"
                  value={phoneFormatter(values.number)}
                  id={"number"}
                  name={"number"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.number}
                  touched={touched.number}
                  className="!w-[20em]"
                  maxLength={14}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center"></div>
              <div className="relative">
                <Input
                  label="Password"
                  placeholder="Enter password here"
                  showToggle
                  text="Password"
                  type="password"
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
            <div>
              <Input
                label="Confirm Password"
                placeholder="Enter password here"
                showToggle
                text="Confirm Password"
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
            </div>

            <div className="pt-2">
              <SubmitButton text="Sign Up" loading={loading} type="submit" />
            </div>

            <p className="text-center text-gray-700 text-sm pt-3">
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 font-semibold hover:underline"
              >
                <NavLink to={"/auth/Login"}>Login Now</NavLink>
              </button>
            </p>

            <p className="text-center text-gray-700 text-sm pt-3">
              I accept the{" "}
              <button
                type="button"
                onClick={() => {
                  navigate("/app/terms-and-conditions");
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Terms & conditions
              </button>
              &nbsp;and&nbsp;
              <button
                type="button"
                className="text-blue-600 font-semibold hover:underline"
                onClick={() => {
                  navigate("/app/privacy-policy");
                }}
              >
                Privacy policy
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={logoback}
          alt="Background"
          className="w-full h-[57em] object-cover rounded-bl-[4em] rounded-tl-[2em]"
        />
      </div>
    </div>
  );
}
