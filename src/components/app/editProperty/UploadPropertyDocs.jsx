import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import pdfIcon from "../../../assets/pdficon.png";
import axios from "../../../axios";
import { ErrorToast } from "../../global/Toaster";
import { RiLoader5Line } from "react-icons/ri";
import { useNavigate } from "react-router";

const UploadPropertyDocs = ({
  setIsUploadFile,
  activeCategory,
  propertyId,
}) => {
  console.log("🚀 ~ UploadPropertyDocs ~ activeCategory:", activeCategory);
  const navigate = useNavigate();
  const activeCategoryName = activeCategory.split(" ")[0].toLowerCase();
  const [mediaError, setMediaError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [mediaFiles, setMediaFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);

 const handleFileChange = (e) => {
  setMediaError(null);

  const files = Array.from(e.target.files);
  
  // 1. Separate the files by type
  const newImagesAndVideos = files.filter(
    (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
  );
  const newDocuments = files.filter((file) => file.type === "application/pdf");

  // 2. Define your limit
  const MAX_LIMIT = 5;

  // 3. Check Media Limit (Existing + New)
  if (mediaFiles.length + newImagesAndVideos.length > MAX_LIMIT) {
    setMediaError(`You can only upload a total of ${MAX_LIMIT} media files (images/videos).`);
    return; // Stop the upload
  }

  // 4. Check Document Limit (Existing + New)
  if (documentFiles.length + newDocuments.length > MAX_LIMIT) {
    setMediaError(`You can only upload a total of ${MAX_LIMIT} PDF documents.`);
    return; // Stop the upload
  }

  // 5. Update state only if limits are respected
  setMediaFiles((prev) => [...prev, ...newImagesAndVideos]);
  setDocumentFiles((prev) => [...prev, ...newDocuments]);
};

  const removeMedia = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const removeDocument = (index) => {
    setDocumentFiles(documentFiles.filter((_, i) => i !== index));
  };

  const handleUploadFile = async () => {
    try {
      if (mediaFiles.length === 0 && documentFiles.length === 0) {
        setMediaError("Upload Property Images");
        return;
      }
      setLoading(true);
      const formData = new FormData();

      if (activeCategoryName === "property") {
        mediaFiles.forEach((file) => {
          if (file.type.startsWith("image/")) {
            formData.append("landlordPropertyConditionImages", file);
          } else {
            formData.append("landlordPropertyConditionVideos", file);
          }
        });
      }

      if (activeCategoryName === "rules") {
        documentFiles.forEach((file) => {
          formData.append("landlordRules", file);
        });
      }

      if (activeCategoryName === "agreements") {
        documentFiles.forEach((file) => {
          formData.append("landlordAgreements", file);
        });
      }

      if (activeCategoryName === "uv") {
        console.log(
          "🚀 ~ handleUploadFile ~ activeCategoryName:",
          activeCategoryName
        );
        mediaFiles.forEach((file) => {
          formData.append("uvLightImages", file);
        });
      }

      formData.append("currentDate", new Date().toLocaleString());

      const response = await axios.put(
        `/properties/${propertyId}/updateDocs`,
        formData
      );

      if (response.status === 200) {
        setIsUploadFile(false);
        navigate(-1);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[1260px] mx-auto pt-8 pb-[10em] text-[#333]">
      {/* Top Navigation */}

      <div className="flex justify-between">
        <div className="flex gap-3 items-center mb-6 pt-3">
          <button type="button" onClick={() => setIsUploadFile(false)}>
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-[600]">Upload Files</h1>
        </div>
      </div>

      <div className="bg-[#F9FAFA] mt-0 rounded-xl shadow-lg p-8">
        {/* Upload Box */}
        <div className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 text-center cursor-pointer block">
          <label
            htmlFor="fileUpload"
            className=" rounded-lg p-10 text-center cursor-pointer"
          >
            <p className="text-black">Upload “Documents”</p>
            <p className="text-sm text-gray-400">Upto 20MB PDF</p>
            <input
              type="file"
              id="fileUpload"
              accept={
                activeCategoryName === "rules"
                  ? "application/pdf"
                  : "image/*,video/*,application/pdf"
              }
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {mediaError && (
          <p className="text-red-500 text-xs mt-2">{mediaError}</p>
        )}
        {/* Media Preview */}
        <div className="mt-6 flex flex-wrap gap-3">
          {mediaFiles.map((file, index) => (
            <div
              key={index}
              className="relative w-28 h-28 rounded overflow-hidden"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover rounded"
                  controls
                />
              )}
              <button
                className="absolute top-1 right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => removeMedia(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Document List */}
        <div className="mt-6 flex flex-col gap-3">
          {documentFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
            >
              <div className="flex items-center gap-2">
                <img src={pdfIcon} alt="pdf" className="w-5 h-5" />
                <p className="text-sm">{file.name}</p>
              </div>
              <button
                onClick={() => removeDocument(index)}
                className="text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            disabled={loading}
            onClick={handleUploadFile}
            className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
          >
            <div className="flex justify-center items-center">
              <span className="mr-1">Upload</span>
              {loading && <RiLoader5Line className="animate-spin text-lg" />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPropertyDocs;
