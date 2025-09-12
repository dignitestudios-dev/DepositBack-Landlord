import { useState } from "react";

const Propertycondition = ({ images, videos, uvLightImages, isLandLord }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showAllUvImages, setShowAllUvImages] = useState(false);

  const [previewItem, setPreviewItem] = useState(null); // modal image/video
  const [viewingOnly, setViewingOnly] = useState("");

  const visiblePhotos = showAllPhotos ? images : images.slice(0, 8);

  const visibleVideos = showAllVideos ? videos : videos.slice(0, 8);

  const visibleUvImages = showAllVideos
    ? uvLightImages
    : uvLightImages.slice(0, 8);

  return (
    <div className="bg-[#F6FAFF] min-h-screen p-6">
      {/* Videos Section */}
      {viewingOnly !== "videos" && viewingOnly !== "uv" && (
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
          {visiblePhotos?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(showAllPhotos
                ? visiblePhotos
                : visiblePhotos?.slice(0, 8)
              )?.map((src, idx) => (
                <div
                  key={idx}
                  className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
                  onClick={() => setPreviewItem({ type: "image", src })}
                >
                  <img
                    src={src.fileUrl}
                    alt={`Photo ${idx}`}
                    className={`w-full h-[150px] object-cover rounded-md `}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>No record uploaded</div>
          )}
        </div>
      )}

      {/* Photos Section */}
      {viewingOnly !== "photos" && viewingOnly !== "uv" && (
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
          {visibleVideos?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(showAllVideos
                ? visibleVideos
                : visibleVideos?.slice(0, 8)
              )?.map((src, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-md overflow-hidden cursor-pointer"
                  onClick={() => setPreviewItem({ type: "video", src })}
                >
                  <video
                    src={src?.fileUrl}
                    alt={`Video ${idx}`}
                    className={`w-full h-[150px] object-cover`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>No record uploaded</div>
          )}
        </div>
      )}

      {viewingOnly !== "photos" && viewingOnly !== "videos" && isLandLord && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {showAllUvImages ? "" : "UV Images"}
            </h2>
            <button
              onClick={() => {
                setShowAllUvImages(!showAllUvImages);
                setViewingOnly(showAllUvImages ? "" : "uv");
                if (!showAllUvImages) setShowAllVideos(false);
              }}
              className="text-blue-600 text-base font-medium underline"
            >
              {showAllUvImages ? "Show less" : "View all UV images"}
            </button>
          </div>
          {visibleUvImages?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(showAllUvImages
                ? visibleUvImages
                : visibleUvImages?.slice(0, 8)
              )?.map((src, idx) => (
                <div
                  key={idx}
                  className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
                  onClick={() => setPreviewItem({ type: "image", src })}
                >
                  <img
                    src={src}
                    alt={`Photo ${idx}`}
                    className={`w-full h-[150px] object-cover rounded-md `}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>No record uploaded</div>
          )}
        </div>
      )}

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

export default Propertycondition;
