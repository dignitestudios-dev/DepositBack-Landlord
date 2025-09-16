import { TiWarning } from "react-icons/ti";

export default function Modal({ isOpen, onClose, onAction, data }) {
  if (!isOpen) return null;

  const {
    iconBgColor = "bg-blue-600",
    icon = <TiWarning className="h-10 w-10 text-white" />,
    title = "Title Here",
    description = "Description here...",
    actionText,
  } = data || {};

  const handleYes = () => {
    onAction(); // This will trigger the API call or action
    onClose();  // Close the modal after action
  };

  const handleNo = () => {
    onClose();  // Simply close the modal without doing anything
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        onClick={onClose}
        className="bg-white rounded-2xl p-6 w-full max-w-[26em] text-center shadow-lg relative"
      >
        <div className="flex justify-center mb-4">
          <div
            className={`w-20 h-20 ${iconBgColor} rounded-full flex items-center justify-center`}
          >
            {icon}
          </div>
        </div>
        <h2 className="text-2xl font-[600] mb-2">{title}</h2>
        <p className="text-gray-600 mb-6 font-normal">{description}</p>
        
        <div className="flex justify-center gap-4 mt-6">
          {/* No Button */}
          <button
            onClick={handleNo}
            className="w-48 px-4 py-2 bg-gray-300 text-black rounded-full font-semibold hover:bg-gray-400 transition"
          >
            No
          </button>
          
          {/* Yes Button */}
          <button
            onClick={handleYes}
            className={`w-48 px-4 py-2 ${iconBgColor} text-white rounded-full font-semibold hover:${iconBgColor} transition`}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
