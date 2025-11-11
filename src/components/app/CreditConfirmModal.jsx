import React from "react";
import { TiWarning } from "react-icons/ti";

const CreditConfirmModal = ({
  handleCreditScore,
  creditloading,
  handleClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
        <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
          <TiWarning size={40} />
        </div>
        <h2 className="font-semibold text-[20px] mb-2 text-black">
          Credit Score Verification
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          $15 will be deducted from your account to verify tenant’s credit
          score. <br />
          Do you want to continue?
        </p>
        <div className="flex justify-center gap-3">
          <button
            className="px-[4em] py-2 text-sm text-slate-600 bg-gray-200 rounded-full"
            onClick={handleClose}
          >
            No
          </button>
          <button
            disabled={creditloading}
            onClick={handleCreditScore}
            className="px-[5em] py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full"
          >
            {creditloading ? "Processing..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditConfirmModal;
