import { IoClose } from "react-icons/io5";

const ResourceTextModal = ({ textModal, setTextModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[26em] text-center shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={() => setTextModal(false)}
        >
          <IoClose />
        </button>
        <div className="flex justify-center items-center p-8">
          <p>{textModal}</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceTextModal;
