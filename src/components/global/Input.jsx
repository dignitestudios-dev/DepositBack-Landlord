// src/components/Input.jsx
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  showToggle = false,
  className,
  onBlur,
  error,
  touched,
  name,
  maxLength,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-[15px] font-[500] text-gray-800 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          disabled={disabled}
          type={showToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          maxLength={maxLength}
          required
          className={`w-full px-4 py-3 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12 ${
            className || ""
          }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {error && touched && <p className="text-red-600 text-[12px]">{error}</p>}
    </div>
  );
}
