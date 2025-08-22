import { useState } from "react";
import pdfIcon from "../../assets/pdficon.png";

const Repairs = ({ rules }) => {
  const [activePopup, setActivePopup] = useState(null); // track which popup is open

  const handleTogglePopup = (docId) => {
    setActivePopup(activePopup === docId ? null : docId);
  };

  const handleDownload = (doc) => {
    if (!doc?.fileUrl) {
      alert("File URL is missing.");
      return;
    }

    // Extract file name from URL or use default
    const fileName = doc.title || "document.pdf";

    // Create an anchor element
    const link = document.createElement("a");
    link.href = doc.fileUrl;
    link.setAttribute("download", fileName); // Suggest filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setActivePopup(false);
  };

  const handleDelete = (docId) => {
    alert(`Delete clicked for ID: ${docId}`);
    setActivePopup(false);
  };

  return (
    <div className="pt-4">
      {rules?.length > 0 && rules[0] !== undefined ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {rules?.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-10 rounded-xl shadow-md text-center relative"
            >
              <img src={pdfIcon} alt="PDF Icon" className="h-[6em] mx-auto" />
              <p className="mt-3 text-sm font-medium">
                {doc.title || doc.fileKey}
              </p>

              {/* 3-dot menu */}
              <div
                onClick={() => handleTogglePopup(doc._id)}
                className="absolute top-3 right-5 text-gray-900 text-xl cursor-pointer"
              >
                &#8230;
              </div>

              {/* Popup Menu */}
              {activePopup === doc._id && (
                <div className="absolute top-10 right-5 bg-white border shadow-md rounded-md w-32 text-left z-10">
                  <button
                    onClick={() => handleDownload(doc)}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No Document Uploaded</div>
      )}
    </div>
  );
};

export default Repairs;
