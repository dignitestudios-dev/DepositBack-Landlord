import { useState } from "react";
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "../../global/Input";
import axios from "../../../axios";

const ChangePassword = () => {
  const [currentpassword, setCurrentpassword] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [error, setError] = useState("");
  const [changepassword, setChangepassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!currentpassword || !password || !newpassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== newpassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/auth/updatePass", {
        currentPassword: currentpassword,
        password: password,
        confirmPassword: newpassword,
      });

      if (res.data?.success) {
        setChangepassword(true);
        setCurrentpassword("");
        setPassword("");
        setnewPassword("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6">
        <h3 className="text-2xl font-[600] mb-6">Change Password</h3>
        <p className="-mt-4 mb-10">
          You must enter current password in order to update password.
        </p>

        <div className="space-y-1">
          <form onSubmit={handleSubmit} className="ml-[6em] mr-[6em]">
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            <div className="relative mb-2">
              <Input
                label="Current password"
                value={currentpassword}
                onChange={(e) => setCurrentpassword(e.target.value)}
                placeholder="Enter password here"
                type={showPassword ? "text" : "password"}
                className="bg-[#F3F8FF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-11 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="relative mb-2">
              <Input
                label="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password here"
                type={showPassword ? "text" : "password"}
                className="bg-[#F3F8FF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-11 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="relative mb-2">
              <Input
                label="Confirm password"
                value={newpassword}
                onChange={(e) => setnewPassword(e.target.value)}
                placeholder="Enter password here"
                type={showPassword ? "text" : "password"}
                className="bg-[#F3F8FF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-11 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="mt-[8em] flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[11.6em] py-3 rounded-full font-medium shadow hover:from-blue-600 hover:to-blue-800 transition disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Success Popup */}
      {changepassword && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setChangepassword(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">Password Updated!</h2>
            <p className="text-sm text-gray-600">
              Your password has been updated successfully.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
