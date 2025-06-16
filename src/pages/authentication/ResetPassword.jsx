import { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import logomain from "../../assets/logomain.webp";
import logoback from "../../assets/backloginimage.webp";
import Input from "../../components/global/Input";
import { NavLink, useNavigate } from "react-router";
import Button from "../../components/global/Button";
import Modal from "../../components/global/Modal";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [newpassword, setnewPassword] = useState("");
    const [error, seterror] = useState("");
    const [showModal, setShowModal] = useState(false);


    const [email, setEmail] = useState("");
    const navigate = useNavigate("");
    const handleSubmit = (e) => {
        e.preventDefault();
        seterror("");

        if (!password || !newpassword) {
            seterror("Please fill this Both Fields.");
            return;
        }
        if (password !== newpassword) {
            seterror("Password do no match.");
            return;
        }
        setShowModal(true);

    };

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

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <div>
                            <Input
                                label="New password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password here"
                                showToggle
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
                                value={newpassword}
                                onChange={(e) => setnewPassword(e.target.value)}
                                placeholder="Enter password here"
                                showToggle
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>


                        <button
                            type="submit"
                            className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
                        >
                            <span>Update Password</span>
                        </button>



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
