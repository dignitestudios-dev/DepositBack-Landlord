import React, { useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

const ChangeNumber = () => {
  const [phone, setPhone] = useState(""); // State to hold the phone number
  const [changenumber, setChangenumber] = useState(false); // State to control the popup visibility

  return (
    <div className="p-6">
      <h3 className="text-2xl font-[600] mb-6">Change Number</h3>
      <p className="-mt-4 mb-6">Please enter your new phone number.</p>

      {/* Phone Input */}
      <div className="pt-3">
        <span className="block text-[15px] text-gray-800 font-[500] ml-[7em] pb-1">
          Phone Number
        </span>
        <div className="flex gap-[10px] justify-center items-center">
          <div className="bg-[#ECECEC] rounded-full p-3 pl-[13px] pr-[13px] flex items-center justify-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
              className="h-5 w-[2.1em]"
              alt="USA Flag"
            />
            <p>+1</p>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Add phone number"
            className="!w-[24em] bg-[#ECECEC] px-4 py-2 rounded-full"
          />
        </div>
      </div>

      <div className="mt-[17em] flex justify-center">
        <button
          onClick={() => {
            setChangenumber(true); // Show the popup when the Update button is clicked
          }}
          className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[11.4em] py-3 rounded-full font-medium shadow hover:from-blue-600 hover:to-blue-800 transition"
        >
          Update
        </button>
      </div>

      {/* Success Popup */}
      {changenumber && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setChangenumber(false)} // Close the popup when clicked
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            {/* Success Icon */}
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
    </div>
  );
};

export default ChangeNumber;
