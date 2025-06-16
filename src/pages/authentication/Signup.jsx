import { useState } from "react";
import logomain from "../../assets/logomain.webp";
import logoback from "../../assets/backloginimage.webp";
import Input from "../../components/global/Input";
import "react-phone-input-2/lib/style.css";
import usaflag from "../../assets/usaflag.png"
import { NavLink, useNavigate } from "react-router";

export default function Signup() {
    const navigate = useNavigate("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, seterror] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        seterror("")

        if (!password || !confpassword) {
            seterror("Please fill this Both Fields.");
            return;
        }
        if (password !== confpassword) {
            seterror("Password do no match.");
            return;
        }
        alert("Sign up ...");
        navigate("/auth/signup-otp", { state: { email } })
    };

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
                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <div>
                            <Input
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email here"
                            />
                        </div>
                        <div>
                            <span className="block text-[15px] text-gray-800 font-[500]">Phone Number</span>
                            <div className="flex gap-[10px] justify-start items-center">
                                <div className="bg-white rounded-full p-3 pl-[13px] pr-[13px] flex items-center justify-center gap-3">
                                    <img src={usaflag} className="h-5 w-[2.1em]" alt="" />
                                    <p>+ 1</p>
                                </div>
                                <Input
                                    label=""
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Add phone number"
                                    className="!w-[20em]"
                                />

                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                            </div>
                            <div className="relative">
                                <Input
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password here"
                                    showToggle
                                />

                            </div>


                        </div>
                        <div>
                            <Input
                                label="Confirm Password"
                                value={confpassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                placeholder="Enter password here"
                                showToggle
                            />
                        </div>



                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full font-semibold hover:opacity-90 transition"
                            >

                                Sign Up



                            </button>
                        </div>

                        <p className="text-center text-gray-700 text-sm pt-3">
                            Already have an account?{" "}
                            <button type="button" className="text-blue-600 font-semibold hover:underline">
                                <NavLink
                                    to={"/auth/Login"}
                                >
                                    Login Now
                                </NavLink>
                            </button>
                        </p>

                        <p className="text-center text-gray-700 text-sm pt-3">
                            I accept the  {" "}
                            <button type="button" onClick={() => {
                                navigate("/app/terms-and-conditions")
                            }} className="text-blue-600 font-semibold hover:underline">
                                Terms & conditions
                            </button>
                            &nbsp;and&nbsp;
                            <button type="button" className="text-blue-600 font-semibold hover:underline" onClick={() => {
                                navigate("/app/privacy-policy")
                            }}>
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
