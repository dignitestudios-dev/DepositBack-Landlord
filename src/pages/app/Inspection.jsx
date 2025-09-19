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
    allowedDocs,
    tenantMoveInImages = [],
    tenantMoveInVideos = [],
    tenantMoveOutImages = [],
    tenantMoveOutVideos = [],
    tenant,
  } = location.state || {};

  const [viewMode, setViewMode] = useState("Move In");
  const [previewItem, setPreviewItem] = useState(null);
  console.log("🚀 ~ Inspection ~ previewItem:", previewItem);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [viewingOnly, setViewingOnly] = useState(""); // '' | 'photos' | 'videos'
  const [docType, setDocType] = useState("");
  const [reqLoading, setReqLoading] = useState(false);

  const handleRequestAccess = (index, src) => {
    setDocType(src.fileKey);
    setShowRequestModal(true);
  };

  const handleSendRequest = async () => {
    console.log("--handleRequest--");
    try {
      setReqLoading(true);
      const response = await axios.post(`/requests/docs`, {
        property: propertyId,
        documents: [docType],
      });
      if (response.status === 200) {
        setShowRequestModal(false);
        setShowAcceptedModal(true);
        setTimeout(() => {
          // setUnlockedIndexes([...unlockedIndexes, targetIndex]);
          setShowAcceptedModal(false);
        }, 1500);
      }
    } catch (error) {
      console.log("🚀 ~ handleSendRequest ~ error:", error);
      ErrorToast(error);
    } finally {
      setReqLoading(false);
    }
  };

  useEffect(() => {
    if (allowedDocs?.length > 0) {
      handleWatchedDoc();
    }
  }, [allowedDocs]);

  const handleWatchedDoc = async () => {
    try {
      const response = await axios.put(`/requests/docs/watch/${propertyId}`, {
        documents: [allowedDocs[0]],
      });
      if (response.status === 200) {
        console.log(response.status);
      }
    } catch (error) {
      console.log("🚀 ~ handleSendRequest ~ error:", error);
      ErrorToast(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20 min-h-screen bg-[#F6FAFF] text-[#333]">
      {tenant ? (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (viewingOnly) {
                    // If viewing only photos or videos, go back to full view
                    setViewingOnly("");
                    setShowAllPhotos(false);
                    setShowAllVideos(false);
                  } else {
                    navigate(-1);
                  }
                }}
                type="button"
              >
                <FaArrowLeft size={20} />
              </button>

              <h1 className="text-3xl font-[600]">
                {viewingOnly === "photos"
                  ? "Photos"
                  : viewingOnly === "videos"
                  ? "Videos"
                  : "Inspection"}
              </h1>
            </div>

            {/* Move In / Move Out Toggle */}
            {viewingOnly === "" && (
              <div className="bg-white p-1 rounded-full flex gap-1">
                <button
                  onClick={() => setViewMode("Move In")}
                  className={`text-sm px-6 py-2 rounded-full font-medium ${
                    viewMode === "Move In"
                      ? "bg-gradient-to-r from-[#003897] to-[#0151DA] text-white"
                      : "text-black"
                  }`}
                >
                  Move In
                </button>
                <button
                  onClick={() => setViewMode("Move Out")}
                  className={`text-sm px-6 py-2 rounded-full font-medium ${
                    viewMode === "Move Out"
                      ? "bg-gradient-to-r from-[#003897] to-[#0151DA] text-white"
                      : "text-black"
                  }`}
                >
                  Move Out
                </button>
              </div>
            )}
          </div>

          {/* Move In Mode */}
          {viewMode === "Move In" && (
            <>
              {/* Photos Section */}
              {viewingOnly !== "videos" && (
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {showAllPhotos ? "" : "Photos"}
                    </h2>
                    <button
                      onClick={() => {
                        setShowAllPhotos(!showAllPhotos);
                        setViewingOnly(showAllPhotos ? "" : "photos");
                        if (!showAllPhotos) setShowAllVideos(false);
                      }}
                      className="text-blue-600 text-base font-medium underline"
                    >
                      {showAllPhotos ? "Show less" : "View all photos"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(showAllPhotos
                      ? tenantMoveInImages
                      : tenantMoveInImages.slice(0, 8)
                    ).map((src, idx) => (
                      <div
                        key={idx}
                        className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
                        onClick={() => setPreviewItem({ type: "image", src })}
                      >
                        <img
                          src={src?.fileUrl}
                          alt={`Photo ${idx}`}
                          className={`w-full h-[150px] object-cover rounded-md ${
                            allowedDocs.includes("tenantMoveInImages")
                              ? ""
                              : "blur-sm"
                          }`}
                        />
                        {allowedDocs.length === 0 && (
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
                    ))}
                  </div>
                </div>
              )}

              {/* Videos Section */}
              {viewingOnly !== "photos" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {showAllVideos ? "" : "Videos"}
                    </h2>
                    <button
                      onClick={() => {
                        setShowAllVideos(!showAllVideos);
                        setViewingOnly(showAllVideos ? "" : "videos");
                        if (!showAllVideos) setShowAllPhotos(false);
                      }}
                      className="text-blue-600 text-base font-medium underline"
                    >
                      {showAllVideos ? "Show less" : "View all videos"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(showAllVideos
                      ? tenantMoveInVideos
                      : tenantMoveInVideos.slice(0, 8)
                    ).map((src, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-md overflow-hidden cursor-pointer"
                        onClick={() => setPreviewItem({ type: "video", src })}
                      >
                        <video
                          src={src?.fileUrl}
                          alt={`Video ${idx}`}
                          className={`w-full h-[150px] object-cover ${
                            allowedDocs.includes("tenantMoveInImages")
                              ? ""
                              : "blur-sm"
                          }`}
                        />
                        {allowedDocs.includes("tenantMoveInImages") && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white p-2 rounded-full shadow-lg">
                              <FaPlay className="text-black" />
                            </div>
                          </div>
                        )}
                        {allowedDocs.length === 0 && (
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
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {viewMode === "Move Out" && (
            <Moveout
              tenantMoveOutImages={tenantMoveOutImages}
              tenantMoveOutVideos={tenantMoveOutVideos}
              allowedDocs={allowedDocs}
              handleRequestAccess={handleRequestAccess}
              handleSendRequest={handleSendRequest}
              reqLoading={reqLoading}
            />
          )}
        </>
      ) : (
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
              Currently no documents available for this property because the
              property is currently inactive.
            </p>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-4 relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setPreviewItem(null)}
            >
              ✕
            </button>
            <p className="text-sm font-semibold mb-2">Preview</p>
            {previewItem.type === "image" ? (
              <img
                src={previewItem.src?.fileUrl || previewItem}
                className="w-full h-auto rounded-md mb-4"
                alt="Preview"
              />
            ) : (
              <video
                controls
                src={previewItem.src?.fileUrl || previewItem}
                className="w-full rounded-md mb-4"
              />
            )}
            <h3 className="font-semibold text-sm mb-2">
              {previewItem.src?.fileKey}
            </h3>
            <p className="text-xs text-gray-600">
              This file has been unlocked and is now available for viewing.
            </p>
          </div>
        </div>
      )}

      {/* Request Modal */}
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

      {/* Accepted Modal */}
      {showAcceptedModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={30} />
            </div>
            <h2 className="font-semibold text-lg mb-1">Request Send!</h2>
            <p className="text-sm text-gray-600">
              Your request has been sent to tenant
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspection;
