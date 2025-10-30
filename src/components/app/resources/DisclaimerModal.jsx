import React from "react";

const DisclaimerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-fadeIn relative">
        {/* Close Button (optional) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center uppercase tracking-wide">
          Disclaimer
        </h2>

        {/* Content */}
        <p className="text-gray-700 text-sm leading-relaxed mb-2 text-center">
          <strong className="text-gray-900">DISCLAIMER: WE ARE NOT ATTORNEYS.</strong>
          <br />
          The resources and information provided on this website are for general
          informational purposes only and are not intended as legal advice.
          Laws vary by state and situation, and the information shared here may
          not reflect the most current legal developments. For advice regarding
          your specific circumstances, please consult a licensed attorney in your
          jurisdiction. Reliance on any information from this website is at your
          own risk.
        </p>

        {/* Buttons */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Yes, I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
