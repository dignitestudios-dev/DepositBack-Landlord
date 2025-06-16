import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const Termsandconditions = () => {
    const navigate = useNavigate("");
  return (
    <div className="min-h-screen bg-[#fff] px-6 py-10 md:px-10">
      <div className="max-w-9xl mx-auto bg-[#F5FAFF] rounded-2xl p-6 md:p-10 shadow">
        <div className="flex items-center mb-6 gap-3">
         <button type="button" onClick={()=>navigate(-1)} >
                      <FaArrowLeft size={18} />
                    </button>
          <h1 className="text-2xl font-semibold text-black">Terms And Conditions</h1>
        </div>

        {[...Array(5)].map((_, i) => (
          <p key={i} className="text-gray-500 text-[15px] leading-7 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        ))}
      </div>
    </div>
  );
};

export default Termsandconditions;
