import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .test("no-leading-space", "Email cannot start with a space.", (value) =>
      value ? value[0] !== " " : false
    )
    .test(
      "no-internal-or-trailing-space",
      "Email cannot contain spaces.",
      (value) => (value ? value.trim() === value && !/\s/.test(value) : false)
    )
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format."),

  number: Yup.string()
    .transform((value) => value.replace(/\D/g, "")) // Remove all non-numeric chars
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Please enter your phone number"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password must not exceed 50 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one @ special character."
    )
    .matches(/^[^\s]*$/, "Password should not contain spaces.")
    .trim()
    .required("Please enter your password"),
  cPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .test("no-leading-space", "Email cannot start with a space.", (value) =>
      value ? value[0] !== " " : false
    )
    .test(
      "no-internal-or-trailing-space",
      "Email cannot contain spaces.",
      (value) => (value ? value.trim() === value && !/\s/.test(value) : false)
    )
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format."),

  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain atleast 6 alphanumeric characters.")
    .required("Please enter your password"),
});

export const updatePasswordSchema = Yup.object({
  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain at least 6 alphanumeric characters.")
    .required("Please enter your password"),

  cPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});
