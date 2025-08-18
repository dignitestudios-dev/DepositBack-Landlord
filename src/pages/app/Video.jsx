import { useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaEllipsisV, FaPlay } from "react-icons/fa";
import Homeone from "../../assets/Homeone.png";
import Hometwo from "../../assets/Hometwo.png";
import Homethree from "../../assets/Homethree.png";
import Homefour from "../../assets/Homefour.png";

const allVideos = [
  Homethree,
  Hometwo,
  Homeone,
  Homefour,
  Hometwo,
  Homethree,
  Homefour,
  Homeone,
  Homefour,
  Homeone,
  Hometwo,
  Homethree,
  Homefour,
  Homeone,
  Homefour,
  Homeone,
];

const Video = () => {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);

  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  return (
    <div className="max-w-[1260px] mx-auto pt-8 pb-[1em] text-[#333]">
      <div className="flex items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-3 ">
          <button
            onClick={() =>
              navigate("/app/documents", {
                state: { tab: "Property Conditions" },
              })
            }
          >
            <FaArrowLeft size={20} />
          </button>
          <h2 className="text-3xl font-semibold">Videos</h2>
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

      {/* Video Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {allVideos.map((src, idx) => (
          <div
            key={idx}
            className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
            onClick={() => setPreviewItem({ type: "video", src })}
          >
            <img
              src={src}
              alt={`Video ${idx}`}
              className="w-full h-[150px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-2 rounded-full shadow-md">
                <FaPlay className="text-black" />
              </div>
            </div>
            <button
              className="absolute top-2 right-2 text-black bg-white/60 rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation();
                togglePopup(`video-${idx}`);
              }}
            >
              <FaEllipsisV />
            </button>
            {activePopup === `video-${idx}` && (
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

      {/* MODAL PREVIEW */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-4 relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setPreviewItem(null)}
            >
              ✕
            </button>
            <p className="text-sm font-semibold mb-2">Video</p>
            <video
              controls
              src={previewItem.src}
              className="w-full rounded-md mb-4"
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

export default Video;
