import { TiWarning } from "react-icons/ti";

export default function BuyUvModal({
  isOpen,
  onClose,
  onAction,
  onSecondaryAction,
  data,
}) {
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
    actionText = "Buy DB Forensics Light",
    actionTextTwo = "Skip",
  } = data || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[26em] text-center shadow-lg relative">
        {/* Close Button */}
        {typeof onClose === "function" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-gray-600 font-[400] text-4xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        )}

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-20 h-20 ${iconBgColor} rounded-full flex items-center justify-center`}
          >
            <TiWarning size={40} color="white" />
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={onSecondaryAction}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-full  hover:bg-gray-300 transition"
          >
            {actionTextTwo}
          </button>
          <button
            onClick={onAction}
            className="w-full px-4 py-2 bg-gradient-to-r from-[#003897] to-[#0151DA] text-white rounded-full hover:bg-blue-700 transition"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
}
