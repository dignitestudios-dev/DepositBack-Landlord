import { RiLoader5Line } from "react-icons/ri";

const SubmitButton = ({ text, onClick, loading, type }) => {
  return (
    <button
      disabled={loading}
      type={type}
      onClick={onClick}
      className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full font-semibold hover:opacity-90 transition"
    >
      <div className="flex justify-center items-center">
        <span className="mr-1">{text}</span>
        {loading && <RiLoader5Line className="animate-spin text-lg" />}
      </div>
    </button>
  );
};

export default SubmitButton;
