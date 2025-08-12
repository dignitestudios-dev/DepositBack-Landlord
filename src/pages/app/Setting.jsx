import React, { useState } from "react";
import Footer from "../../components/global/Footer";
import Header from "../../components/global/Header";
import {
  FaArrowLeft,
  FaCheck,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
  FaPen,
  FaTimes,
} from "react-icons/fa";
import {
  IoNotificationsOutline,
  IoEarthOutline,
  IoCallOutline,
} from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { CiCreditCard1 } from "react-icons/ci";
import { CgLoadbarDoc } from "react-icons/cg";
import { RiErrorWarningLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import hand from "../../assets/hand.png";
import Input from "../../components/global/Input";
import usaflag from "../../assets/usaflag.png";
import Applepay from "../../assets/ApplePay.png";
import Googlepay from "../../assets/GooglePay.png";
import Stripe from "../../assets/addproperty/Stripe.png";

const settingsMenu = [
  {
    key: "notifications",
    label: "Notification Settings",
    icon: <IoNotificationsOutline />,
  },
  { key: "languages", label: "Languages", icon: <IoEarthOutline /> },
  { key: "change_password", label: "Change Password", icon: <MdLockOutline /> },
  { key: "change_number", label: "Change Number", icon: <IoCallOutline /> },
  { key: "payment", label: "Payment Method", icon: <CiCreditCard1 /> },
  { key: "terms", label: "Terms & Conditions", icon: <CgLoadbarDoc /> },
  { key: "privacy", label: "Privacy Policy", icon: <RiErrorWarningLine /> },
  {
    key: "delete",
    label: "Delete Account",
    icon: <RxCrossCircled />,
    danger: true,
  },
];

const Setting = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [notification, setNotification] = useState(false);
  const [language, setLanguage] = useState(false);
  const [password, setPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [error, seterror] = useState("");
  const [currentpassword, setCurrentpassword] = useState("");
  const [changepassword, setChangepassword] = useState("");
  const [phone, setPhone] = useState("");
  const [changenumber, setChangenumber] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [stripeaccountupdate, setStripeaccountupdate] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]); // State for OTP input
  const [email, setEmail] = useState("david@mail.com");
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent
  const [accountdeleted, setAccountdeleted] = useState(false);

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleSubmitOtp = () => {
    console.log("OTP submitted:", otp.join(""));
    setAccountdeleted(true);
  };

  const handleSendOtp = () => {
    setIsOtpSent(true); // Set OTP sent to true
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle form submission for updating the account details
    console.log("Account updated:", {
      accountName,
      accountNumber,
      routingNumber,
    });
    setIsEditing(false); // Exit edit mode
    setStripeaccountupdate(true);
  };

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
    setChangepassword(true);
  };

  const renderSettingContent = () => {
    switch (selectedSetting) {
      case "notifications":
        return (
          <div className="p-6">
            <h3 className="text-2xl font-[600] mb-6">Notification Settings</h3>
            <div className="space-y-4">
              {[
                "Notification title",
                "Notification title",
                "Notification title",
                "Notification title",
              ].map((title, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#F9FAFA] px-4 py-3 rounded-lg shadow-sm"
                >
                  <span className="text-sm font-medium">{title}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-[10em] flex justify-center">
              <button
                onClick={() => {
                  setNotification(true);
                }}
                className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[10em] py-3 rounded-full font-medium shadow hover:from-blue-600 hover:to-blue-800 transition"
              >
                Update
              </button>
            </div>
          </div>
        );
      case "privacy":
      case "terms":
        return (
          <div className="p-6">
            <h3 className="text-2xl font-[600] mb-6">
              {selectedSetting === "privacy"
                ? "Privacy Policy"
                : "Terms & Conditions"}
            </h3>
            <div className="text-sm leading-relaxed space-y-4 max-h-[450px] overflow-y-auto pr-2 pl-3 pr-3">
              <p>
                <h1 className="text-[18px] font-[600]">
                  1. Acceptance of Terms
                </h1>
                <br />
                By accessing or using our mobile application (the "App"), you
                agree to be bound by these Terms of Service. If you do not agree
                to these Terms, please do not use the App.
              </p>
              <p>
                <h1 className="text-[18px] font-[600]">2. User Conduct</h1>
                <br />
                Use the App for any illegal or unauthorized purpose. Interfere
                with the security or functionality of the App. Attempt to gain
                unauthorized access to the App or its systems. Use the App in a
                way that could harm, disable, overburden, or impair the App or
                interfere with other users' enjoyment of the App.
              </p>
              <p>
                <h1 className="text-[18px] font-[600]">
                  3. Intellectual Property
                </h1>
                <br />
                All content and materials on the App, including but not limited
                to text, graphics, logos, images, and software, are the property
                or its licensors and are protected by copyright and other
                intellectual property laws.
              </p>
              <p>
                <h1 className="text-[18px] font-[600]">
                  4. Disclaimer of Warranties
                </h1>
                <br />
                Use the app at your own risk...
              </p>
            </div>
          </div>
        );
      case "payment":
        return (
          <div className="p-6">
            {!isEditing && ( // Only show this section when not editing
              <>
                <h3 className="text-2xl font-[600] mb-0">Payment Method</h3>
                <p className="mt-1 mb-10">Select the Payment Method.</p>

                {/* Payment Methods */}
                <div className="space-y-4 ml-[7em] mr-[7em]">
                  <button className="w-full p-3 bg-[#F0F4FF] border rounded-2xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src={Googlepay} alt="GPay" className="h-6" />
                      <span className="font-[500]">Google Pay</span>
                    </div>
                    <FaChevronRight />
                  </button>

                  <button className="w-full p-3 bg-[#F0F4FF] border rounded-2xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src={Applepay} alt="ApplePay" className="h-6" />
                      <span className="font-[500]">Apple Pay</span>
                    </div>
                    <FaChevronRight />
                  </button>

                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <h1 className="text-sm font-[500]">
                        Attached Stripe Account
                      </h1>
                      <FaPen
                        size={14}
                        onClick={() => setIsEditing(true)}
                        className="cursor-pointer"
                      />{" "}
                      {/* Edit Icon */}
                    </div>

                    {/* Show Stripe Account Details */}
                    <div className="p-3 mt-2 border rounded-2xl font-[500] bg-[#F0F4FF] flex justify-between items-center">
                      <div className="text-sm">**** **** **** 485</div>
                      <div className="flex items-center gap-2">
                        <img src={Stripe} alt="Stripe" className="h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Edit Stripe Account Form */}
            {isEditing && (
              <div className="p-0">
                <div className="flex gap-3">
                  <button type="button" onClick={() => setIsEditing(false)}>
                    <FaArrowLeft size={20} />
                  </button>
                  <h3 className="text-2xl font-semibold mb-0">
                    Edit Stripe Account
                  </h3>
                </div>
                <p className="text-sm mt-1 mb-10">
                  You can update your Stripe account to manage deposit
                  transactions.
                </p>

                <div className="ml-[7em] mr-[7em]">
                  <form onSubmit={handleUpdate}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">
                          Account Holder's Name
                        </label>
                        <input
                          type="text"
                          placeholder="Text goes here"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          className="w-full p-3 mt-2 rounded-xl border bg-[#F5F5F5] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Account Number
                        </label>
                        <input
                          type="text"
                          placeholder="Text goes here"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="w-full p-3 mt-2 rounded-xl border bg-[#F5F5F5] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Routing Number
                        </label>
                        <input
                          type="text"
                          placeholder="Text goes here"
                          value={routingNumber}
                          onChange={(e) => setRoutingNumber(e.target.value)}
                          className="w-full p-3 mt-2 rounded-xl border bg-[#F5F5F5] text-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-[7em] bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case "languages":
        return (
          <div className="p-6">
            <h3 className="text-2xl font-[600] mb-6">Language Settings</h3>

            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F5F5] text-sm focus:outline-none"
              />
              <svg
                className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                s
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </div>

            {/* Language List */}
            <div className="space-y-3 overflow-auto h-[16em]">
              {["English", "Spanish", "Portuguese", "Russian", "French"].map(
                (lang, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between bg-[#F9F9F9] px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                  >
                    <span className="text-sm">{lang}</span>
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      className="accent-blue-600 w-4 h-4"
                      defaultChecked={lang === "English"}
                    />
                  </label>
                )
              )}
            </div>

            {/* Update Button */}
            <div className="mt-[7em] flex justify-center">
              <button
                onClick={() => {
                  setNotification(true);
                }}
                className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[10em] py-3 rounded-full font-medium shadow hover:from-blue-600 hover:to-blue-800 transition"
              >
                Update
              </button>
            </div>
          </div>
        );
      case "change_password":
        return (
          <div className="p-6">
            <h3 className="text-2xl font-[600] mb-6">Change Password</h3>
            <p className="-mt-4 mb-10">
              You must enter current password in order to update password.
            </p>

            {/* Language List */}
            <div className="space-y-1">
              <form onSubmit={handleSubmit} className=" ml-[6em] mr-[6em]">
                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div>
                  <Input
                    label="Current password"
                    value={currentpassword}
                    onChange={(e) => setCurrentpassword(e.target.value)}
                    placeholder="Enter password here"
                    showToggle
                    className="bg-[#F3F8FF]"
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
                    label="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password here"
                    showToggle
                    className="bg-[#F3F8FF]"
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
                    className="bg-[#F3F8FF]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="mt-[8em] flex justify-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[11.6em] py-3 rounded-full font-medium shadow hover:from-blue-600 hover:to-blue-800 transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>

            {/* Update Button */}
          </div>
        );
      case "change_number":
        return (
          <div className="p-6">
            <h3 className="text-2xl font-[600] mb-6">Change Number</h3>
            <p className="-mt-4 mb-6">Please enter your new phone number.</p>

            {/* Language List */}
            <div className="pt-3">
              <span className="block text-[15px] text-gray-800 font-[500] ml-[7em] pb-1">
                Phone Number
              </span>
              <div className="flex gap-[10px] justify-center items-center">
                <div className="bg-[#ECECEC] rounded-full p-3 pl-[13px] pr-[13px] flex items-center justify-center gap-3">
                  <img src={usaflag} className="h-5 w-[2.1em]" alt="USA Flag" />
                  <p>+1</p>
                </div>
                <Input
                  label=""
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Add phone number"
                  className="!w-[24em] bg-[#ECECEC]"
                />
              </div>

              <div className="mt-[17em] flex justify-center">
                <button
                  onClick={() => {
                    setChangenumber(true);
                  }}
                  className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[11.4em] py-3 rounded-full font-medium shadow hover:from-blue-600 hover:to-blue-800 transition"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Update Button */}
          </div>
        );
      case "delete":
        return (
          <div className="p-6">
            {!isOtpSent ? (
              // Initial screen where user sees the message about sending the code
              <>
                <h3 className="text-2xl font-[600] mb-6">Delete Account</h3>
                <div className="text-center pt-[10em] pb-[10em]">
                  <p className="text-[16px] text-black font-[500]">
                    We will send 5 digits code to {email}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 mb-6">
                    Your data will be removed from our database permanently.
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleSendOtp}
                    className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[10em] py-3 rounded-full font-medium"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              // Second screen after OTP is sent, where the user enters the OTP
              <div className="text-center">
                <div className="flex gap-3">
                  <button type="button" onClick={() => setIsEditing(false)}>
                    <FaArrowLeft size={20} />
                  </button>
                  <h3 className="text-2xl font-semibold mb-0">Verification</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6 text-left pt-2">
                  Please enter OTP sent to {email}
                </p>

                {/* OTP Input */}
                <div className="pt-[8em] pb-[8em]">
                  <div className="flex justify-center gap-2 mb-4 ">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        className="w-12 h-12 text-center text-lg border rounded-lg"
                      />
                    ))}
                  </div>
                  {/* Resend OTP */}
                  <p
                    className="text-sm text-blue-600 cursor-pointer mb-6"
                    onClick={handleSendOtp} // Resend OTP logic
                  >
                    Didn't receive code? Resend now
                  </p>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleSubmitOtp}
                  className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[10em] py-3 rounded-full font-medium"
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="flex justify-center">
                <img src={hand} className="w-auto h-[90px]" alt="" />
              </div>

              <p className="mt-2">No setting selected to show</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-0 text-[#333]">
      <div className="flex gap-4 items-center mb-6">
        <button onClick={() => navigate("/app/Dashboard")}>
          <FaArrowLeft size={25} />
        </button>
        <h2 className="text-[28px] font-[600] leading-[48px] capitalize">
          Settings
        </h2>
      </div>

      <div className="flex gap-8 bg-[#F9FAFA] p-3 rounded-3xl">
        {/* Left Menu */}
        <div className="w-[480px] p-4 space-y-3">
          {settingsMenu.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedSetting(item.key)}
              className={`w-full flex items-center bg-white justify-between text-left px-4 py-4 rounded hover:bg-blue-50 ${
                item.danger ? "text-red-500" : ""
              } ${
                selectedSetting === item.key ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              <div className="flex items-center gap-3 text-black font-[500]">
                {item.icon}
                {item.label}
              </div>
              <FaChevronRight />
            </button>
          ))}
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white rounded-xl shadow min-h-[400px]">
          {renderSettingContent()}
        </div>
      </div>

      {/* Popup Section */}
      {notification && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setNotification(false)} // <-- make sure this is your close handler
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            {/* ✅ Success Icon */}
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">
              Notification Updated
            </h2>
            <p className="text-sm text-gray-600">
              Your Notifications settings has been updated successfully.
            </p>
          </div>
        </div>
      )}

      {language && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setLanguage(false)} // <-- make sure this is your close handler
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            {/* ✅ Success Icon */}
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">Language Updated!</h2>
            <p className="text-sm text-gray-600">
              Your language has been updated successfully.
            </p>
          </div>
        </div>
      )}

      {changepassword && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setChangepassword(false)} // <-- make sure this is your close handler
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            {/* ✅ Success Icon */}
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

      {changenumber && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setChangenumber(false)} // <-- make sure this is your close handler
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            {/* ✅ Success Icon */}
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">Number updated!</h2>
            <p className="text-sm text-gray-600">
              Your number has been updated successfully.
            </p>
          </div>
        </div>
      )}

      {stripeaccountupdate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setStripeaccountupdate(false)} // <-- make sure this is your close handler
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            {/* ✅ Success Icon */}
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">
              Stripe Account Updated
            </h2>
            <p className="text-sm text-gray-600">
              Your stripe account has been successfully updated.
            </p>
          </div>
        </div>
      )}

      {accountdeleted && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => navigate("/app/login")} // <-- make sure this is your close handler
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            {/* ✅ Success Icon */}
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">Account Deleted!</h2>
            <p className="text-sm text-gray-600">
              Your account has been deleted successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
