import { useEffect, useState } from "react";
import { FaArrowLeft, FaLock, FaPlay, FaCheck } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router";
import Moveout from "../../components/app/Moveout";
import { ErrorToast } from "../../components/global/Toaster";
import axios from "../../axios";

const Inspection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    propertyId,
    allowedDocs = [],
    tenantMoveInImages = [],
    tenantMoveInVideos = [],
    tenantMoveOutImages = [],
    tenantMoveOutVideos = [],
    tenant,
    propertyCheckList,
  } = location.state || {};

  const [viewMode, setViewMode] = useState("Move In");
  const [activeTab, setActiveTab] = useState("Photos");
  const [previewItem, setPreviewItem] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [docType, setDocType] = useState("");
  const [reqLoading, setReqLoading] = useState(false);

  const handleRequestAccess = (index, src) => {
    setDocType(src.fileKey);
    setShowRequestModal(true);
  };

  const handleSendRequest = async () => {
    try {
      setReqLoading(true);
      const response = await axios.post(`/requests/docs`, {
        property: propertyId,
        documents: [docType],
      });
      if (response.status === 200) {
        setShowRequestModal(false);
        setShowAcceptedModal(true);
        setTimeout(() => setShowAcceptedModal(false), 1500);
      }
    } catch (error) {
      ErrorToast(error);
    } finally {
      setReqLoading(false);
    }
  };

  useEffect(() => {
    if (allowedDocs?.length > 0) handleWatchedDoc();
  }, [allowedDocs]);

  const handleWatchedDoc = async () => {
    try {
      await axios.put(`/requests/docs/watch/${propertyId}`, {
        documents: [allowedDocs[0]],
      });
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    }
  };

  // ✅ Get images/videos based on mode
  const images =
    viewMode === "Move In" ? tenantMoveInImages : tenantMoveOutImages;
  const videos =
    viewMode === "Move In" ? tenantMoveInVideos : tenantMoveOutVideos;
  const checklist =
    viewMode === "Move In"
      ? propertyCheckList?.MoveIn || []
      : propertyCheckList?.MoveOut || [];

  if (!tenant) {
    return (
      <div className="w-full ">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} type="button">
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-[600]">Inspection</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full text-center space-y-2 h-[400px]">
          <p className="capitalize text-xl font-semibold">
            No documents available
          </p>
          <p className="capitalize text-sm">
            Currently no documents available for this property because it’s
            inactive.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20 min-h-screen bg-[#F6FAFF] text-[#333]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} type="button">
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-[600]">Inspection</h1>
        </div>

        {/* Move In / Move Out */}
        <div className="bg-white p-1 rounded-full flex gap-1">
          {["Move In", "Move Out"].map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`text-sm px-6 py-2 rounded-full font-medium ${
                viewMode === m
                  ? "bg-gradient-to-r from-[#003897] to-[#0151DA] text-white"
                  : "text-black"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Inner Tabs (Photos / Videos / Checklist) ---------- */}
      <div className="flex gap-3 mb-6">
        {["Photos", "Videos", "Checklist"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? "bg-gradient-to-r from-[#003897] to-[#0151DA] text-white"
                : "bg-white text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ---------- PHOTOS ---------- */}
      {activeTab === "Photos" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.length > 0 ? (
            images.map((src, idx) => (
              <div
                key={idx}
                className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
                onClick={() => setPreviewItem({ type: "image", src })}
              >
                <img
                  src={src?.fileUrl}
                  alt={`Photo ${idx}`}
                  className={`w-full h-[150px] object-cover rounded-md ${
                    allowedDocs.includes(src.fileKey) ? "" : "blur-sm"
                  }`}
                />
                {!allowedDocs.includes(src.fileKey) && (
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                    <FaLock className="text-lg mb-1" />
                    <button
                      className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestAccess(idx, src);
                      }}
                    >
                      Request Access
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 py-10 text-center text-sm col-span-4">
              No photos found
            </div>
          )}
        </div>
      )}

      {/* ---------- VIDEOS ---------- */}
      {activeTab === "Videos" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {videos.length > 0 ? (
            videos.map((src, idx) => (
              <div
                key={idx}
                className="relative group rounded-md overflow-hidden cursor-pointer"
                onClick={() => setPreviewItem({ type: "video", src })}
              >
                <video
                  src={src?.fileUrl}
                  className={`w-full h-[150px] object-cover ${
                    allowedDocs.includes(src.fileKey) ? "" : "blur-sm"
                  }`}
                />
                {allowedDocs.includes(src.fileKey) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-2 rounded-full shadow-lg">
                      <FaPlay className="text-black" />
                    </div>
                  </div>
                )}
                {!allowedDocs.includes(src.fileKey) && (
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                    <FaLock className="text-lg mb-1" />
                    <button
                      className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestAccess(idx, src);
                      }}
                    >
                      Request Access
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 py-10 text-center text-sm col-span-4">
              No videos found
            </div>
          )}
        </div>
      )}

      {/* ---------- CHECKLIST ---------- */}
      {activeTab === "Checklist" && (
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-[#003897]">
            {viewMode} Checklist
          </h3>
          {checklist?.length > 0 ? (
            <ul className="space-y-2">
              {checklist?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 border p-3 rounded-lg hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    disabled
                    checked
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No checklist found.</p>
          )}
        </div>
      )}

      {/* ---------- Preview Modal ---------- */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-4 relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setPreviewItem(null)}
            >
              ✕
            </button>
            {previewItem.type === "image" ? (
              <img
                src={previewItem.src?.fileUrl}
                className="w-full h-auto rounded-md mb-4"
                alt="Preview"
              />
            ) : (
              <video
                controls
                src={previewItem.src?.fileUrl}
                className="w-full rounded-md mb-4"
              />
            )}
          </div>
        </div>
      )}

      {/* ---------- Request Modal ---------- */}
      {showRequestModal && (
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
                className="px-8 py-2 text-sm bg-gray-200 rounded-full w-[160px]"
                onClick={() => setShowRequestModal(false)}
              >
                Cancel
              </button>
              <button
                disabled={reqLoading}
                className="px-8 py-2 text-sm bg-[#FF3B30] text-white rounded-full w-[160px]"
                onClick={handleSendRequest}
              >
                {reqLoading ? "Requesting..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Accepted Modal ---------- */}
      {showAcceptedModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={30} />
            </div>
            <h2 className="font-semibold text-lg mb-1">Request Sent!</h2>
            <p className="text-sm text-gray-600">
              Your request has been sent to tenant.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspection;
