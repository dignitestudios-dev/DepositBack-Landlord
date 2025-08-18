import { useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import Homeone from "../../assets/Homeone.png";
import Hometwo from "../../assets/Hometwo.png";
import Homethree from "../../assets/Homethree.png";
import Homefour from "../../assets/Homefour.png";

const allPhotos = [
  Homeone,
  Hometwo,
  Homethree,
  Homefour,
  Homeone,
  Hometwo,
  Homethree,
  Homefour,
  Homeone,
  Hometwo,
  Homefour,
  Homeone,
  Hometwo,
  Homethree,
  Homefour,
  Homeone,
  Hometwo,
  Homefour,
  Homeone,
  Hometwo,
];

const Photo = () => {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);

  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  return (
    <div className="max-w-[1260px] mx-auto pt-8 pb-[1em] text-[#333]">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              navigate("/app/documents", {
                state: { tab: "Property Conditions" },
              })
            }
          >
            <FaArrowLeft size={20} />
          </button>
          <h2 className="text-3xl font-semibold">Photos</h2>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/app/upload-files");
            }}
            className="bg-gradient-to-r from-[#003897] to-[#0151DA] hover:bg-[#0151DA] text-white text-sm px-4 py-3 rounded-full font-medium"
          >
            + Upload Files
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {allPhotos.map((src, idx) => (
          <div
            key={idx}
            className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
            onClick={() => setPreviewItem({ type: "image", src })}
          >
            <img
              src={src}
              alt={`Photo ${idx}`}
              className="w-full h-[150px] object-cover"
            />
            <button
              className="absolute top-2 right-2 text-black bg-white/60 rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation();
                togglePopup(`photo-${idx}`);
              }}
            >
              <FaEllipsisV />
            </button>

            {activePopup === `photo-${idx}` && (
              <div className="absolute top-10 right-2 bg-white shadow-lg rounded text-sm w-24 z-10">
                <button className="w-full px-3 py-2 hover:bg-gray-100">
                  Download
                </button>
                <button className="w-full px-3 py-2 hover:bg-gray-100 text-red-500">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL POPUP */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-4 relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setPreviewItem(null)}
            >
              ✕
            </button>
            <p className="text-sm font-semibold mb-2">Photo</p>
            <img
              src={previewItem.src}
              className="w-full h-auto rounded-md mb-4"
              alt="Preview"
            />
            <h3 className="font-semibold text-sm mb-2">Title Goes Here</h3>
            <p className="text-xs text-gray-600">
              Figma ipsum component variant main layer. Device undo
              strikethrough pen rectangle flows background. Invite overflow
              scrolling object select image italic. Layout arrange underline
              distribute bold prototype italic.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
