import React, { useState } from "react";
import { FaCheck, FaLock } from "react-icons/fa";
import Homeone from "../../assets/Homeone.png";
import Hometwo from "../../assets/Hometwo.png";
import Homethree from "../../assets/Homethree.png";
import Homefour from "../../assets/Homefour.png";
import { TiWarning } from "react-icons/ti";

const repairPhotos = [
  Homeone,
  Hometwo,
  Homethree,
  Homefour,
  Homeone,
  Hometwo,
  Homethree,
  Homefour,
];

const Repairs = ({ rules }) => {
  const [unlockedIndexes, setUnlockedIndexes] = useState([]);
  const [previewItem, setPreviewItem] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [targetIndex, setTargetIndex] = useState(null);

  const handleRequestAccess = (index) => {
    setTargetIndex(index);
    setShowRequestModal(true);
  };

  const handleSendRequest = () => {
    setShowRequestModal(false);
    setShowAcceptedModal(true);
    setTimeout(() => {
      setUnlockedIndexes([...unlockedIndexes, targetIndex]);
      setShowAcceptedModal(false);
    }, 1500);
  };

  const isUnlocked = (index) => unlockedIndexes.includes(index);

  return (
    <div className="pt-4">
      <h2 className="text-xl font-semibold mb-4">Photos</h2>
      <div>No record uploaded</div>
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {repairPhotos.map((img, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => isUnlocked(idx) && setPreviewItem(img)}
          >
            <img
              src={img}
              alt={`Repair ${idx}`}
              className={`w-full h-[150px] object-cover rounded-md transition duration-300 ${
                isUnlocked(idx) ? "" : "blur-sm"
              }`}
            />
            {!isUnlocked(idx) && (
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                <FaLock className="text-lg mb-1" />
                <button
                  className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRequestAccess(idx);
                  }}
                >
                  Request Access
                </button>
              </div>
            )}
          </div>
        ))}
      </div> */}

      {/* Modal Preview */}
      {/* {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-4 relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setPreviewItem(null)}
            >
              ✕
            </button>
            <h3 className="text-sm font-semibold mb-2">Repair Photo</h3>
            <img
              src={previewItem}
              alt="Preview"
              className="w-full rounded-md mb-4"
            />
            <p className="text-xs text-gray-600">
              This photo has been approved by the tenant. You may now view or
              document it as needed.
            </p>
          </div>
        </div>
      )} */}

      {/* Request Tenant Files Popup */}
      {/* {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <div className="bg-[#FF3B30] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
              <TiWarning size={40} />
            </div>
            <h2 className="font-semibold text-[20px] mb-2">
              Request Tenant Files
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Would you like to request photos, videos, or documents from the
              tenant for review?
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="px-8 py-2 text-sm bg-gray-200 rounded-full"
                onClick={() => setShowRequestModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-8 py-2 text-sm bg-[#FF3B30] text-white rounded-full"
                onClick={handleSendRequest}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Request Accepted Modal */}
      {/* {showAcceptedModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={30} />
            </div>
            <h2 className="font-semibold text-lg mb-1">Request Accepted!</h2>
            <p className="text-sm text-gray-600">
              The tenant has accepted your request and now you have access to
              view this file.
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Repairs;
