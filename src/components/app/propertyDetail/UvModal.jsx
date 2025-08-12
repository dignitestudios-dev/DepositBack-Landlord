import { TiWarning } from "react-icons/ti";

export default function UvModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const {
    iconBgColor = "bg-blue-600",
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title = "Title Here",
    description = "Description here...",
    actionText = "Yes",
  } = data || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[26em] text-center shadow-lg relative">
        <div className="flex justify-center mb-4">
          <div
            className={`w-20 h-20 ${iconBgColor} rounded-full flex items-center justify-center`}
          >
            <TiWarning size={40} color="white" />
          </div>
        </div>
        <h2 className="text-2xl font-[600] mb-2">{title}</h2>
        <p className="text-gray-600 mb-6 font-normal">{description}</p>
        <div className="flex items-center justify-between w-full gap-2">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-full bg-gray-200 text-gray-700 "
          >
            No
          </button>
          <button
            // disabled={loading}
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-gradient-to-r from-[#003897] to-[#0151DA] text-white rounded-full hover:opacity-90 transition"
          >
            <div className="flex justify-center items-center">
              <span className="mr-1">Yes</span>
              {/* {loading && <RiLoader5Line className="animate-spin text-lg" />} */}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
