import React, { useState } from 'react';
import { FaEllipsisV, FaPlay } from 'react-icons/fa';
import Homeone from "../../assets/Homeone.png";
import Hometwo from "../../assets/Hometwo.png";
import Homethree from "../../assets/Homethree.png";
import Homefour from "../../assets/Homefour.png";
import { useNavigate } from 'react-router';

const dummyImages = [
    Homeone, Hometwo, Homethree, Homefour,
    Homeone, Hometwo, Homethree, Homefour,
    Homeone, Hometwo, Homefour
];

const dummyVideos = [
    Homethree, Hometwo, Homeone, Homefour,
    Hometwo, Homethree, Homefour, Homeone,
    Homefour, Homeone
];

const Propertycondition = () => {
    const [activePopup, setActivePopup] = useState(null);
    const [viewMode, setViewMode] = useState("all");
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [showAllVideos, setShowAllVideos] = useState(false);
    const [previewItem, setPreviewItem] = useState(null); // modal image/video
    const navigate = useNavigate("");

    const togglePopup = (id) => {
        setActivePopup(activePopup === id ? null : id);
    };

    const visiblePhotos = showAllPhotos ? dummyImages : dummyImages.slice(0, 8);
    const visibleVideos = showAllVideos ? dummyVideos : dummyVideos.slice(0, 8);

    return (
        <div className="bg-[#F6FAFF] min-h-screen p-6">
            {/* Photos Section */}
            {(viewMode === "all" || viewMode === "photos") && (
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Photos</h2>
                        <button
                            className="text-blue-600 text-1xl underline font-[500]"
                            onClick={() => navigate("/app/photo")}
                        >
                            View all photos
                        </button>

                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {visiblePhotos.map((src, idx) => (
                            <div
                                key={idx}
                                className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
                                onClick={() => setPreviewItem({ type: 'image', src })}
                            >
                                <img src={src} alt={`Photo ${idx}`} className="w-full h-[150px] object-cover" />
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
                                        <button className="w-full px-3 py-2 hover:bg-gray-100">Download</button>
                                        <button className="w-full px-3 py-2 hover:bg-gray-100 text-red-500">Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Videos Section */}
            {(viewMode === "all" || viewMode === "videos") && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Videos</h2>
                        <button
                            className="text-blue-600 text-1xl underline font-[500]"
                            onClick={() => navigate("/app/video")}
                        >
                            View all videos
                        </button>

                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {visibleVideos.map((src, idx) => (
                            <div
                                key={idx}
                                className="relative group rounded-md overflow-hidden cursor-pointer"
                                onClick={() => setPreviewItem({ type: 'video', src })}
                            >
                                <img src={src} alt={`Video ${idx}`} className="w-full h-[140px] object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white p-2 rounded-full shadow-lg">
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
                                        <button className="w-full px-3 py-2 hover:bg-gray-100">Download</button>
                                        <button className="w-full px-3 py-2 hover:bg-gray-100 text-red-500">Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
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
                        {previewItem.type === 'image' ? (
                            <img src={previewItem.src} className="w-full h-auto rounded-md mb-4" alt="Preview" />
                        ) : (
                            <video controls src={previewItem.src} className="w-full rounded-md mb-4" />
                        )}
                        <h3 className="font-semibold text-sm mb-2">Title Goes Here</h3>
                        <p className="text-xs text-gray-600">
                            Figma ipsum component variant main layer. Device undo strikethrough pen rectangle flows background.
                            Invite overflow scrolling object select image italic. Layout arrange underline distribute bold prototype italic.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Propertycondition;
