import axios from "../../../axios";
import { useEffect, useState } from "react";
import { ErrorToast } from "../../global/Toaster";
import { PiIdentificationBadge } from "react-icons/pi";
import { RiLoader5Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import Modal from "../../global/Modal";

const EditPropertyDocs = ({ stepTwoData, inspectionDetail }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesAndVideos = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    const documents = files.filter((file) => file.type === "application/pdf");

    setMediaFiles((prev) => [...prev, ...imagesAndVideos]);
    setDocumentFiles((prev) => [...prev, ...documents]);
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeDocument = (index) => {
    setDocumentFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    if (mediaFiles.length > 0 || documentFiles.length > 0) {
      try {
        setLoading(true);
        const formData = new FormData();

        mediaFiles.forEach((file, index) => {
          const isFileObj = file instanceof File;
          console.log("isFileObj--> ", file);

          if (file.type.startsWith("image/")) {
            if (isFileObj) {
              formData.append("landlordPropertyConditionImages", file);
            } else {
              formData.append(
                `existingLandlordPropertyConditionImages[${index}]`,
                file._id
              );
            }
          } else {
            if (isFileObj) {
              formData.append("landlordPropertyConditionVideos", file);
            } else {
              formData.append(
                `existingLandlordPropertyConditionVideos[${index}]`,
                file._id
              );
            }
          }
        });

        documentFiles.forEach((file, index) => {
          const isFileObj = file instanceof File;

          if (isFileObj) {
            formData.append("landlordAgreements", file);
          } else {
            formData.append(`existingLandlordAgreements[${index}]`, file._id);
          }
        });

        formData.append("currentDate", new Date().toLocaleString());

        const response = await axios.put(
          `/properties/${stepTwoData?._id}/updateDocs`,
          formData
        );

        if (response.status === 200) {
          inspectionDetail({ documentFiles, mediaFiles });
          setShowModal(true);
        }
      } catch (error) {
        ErrorToast(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    } else {
      ErrorToast("Please upload at least one media or document file.");
    }
  };

  useEffect(() => {
    if (stepTwoData) {
      const media = [];
      const docs = [];

      if (Array.isArray(stepTwoData.landlordPropertyConditionImages)) {
        media.push(
          ...stepTwoData.landlordPropertyConditionImages.map((item) => ({
            ...item,
            previewUrl: item.fileUrl, // keep fileUrl for preview
            type: item.fileUrl.endsWith(".mp4") ? "video/mp4" : "image/jpeg", // mock type
          }))
        );
      }

      if (Array.isArray(stepTwoData.landlordPropertyConditionVideos)) {
        media.push(
          ...stepTwoData.landlordPropertyConditionVideos.map((item) => ({
            ...item,
            previewUrl: item.fileUrl,
            type: "video/mp4",
          }))
        );
      }

      if (Array.isArray(stepTwoData.landlordAgreements)) {
        docs.push(
          ...stepTwoData.landlordAgreements.map((item) => ({
            ...item,
            previewUrl: item.fileUrl,
            type: "application/pdf",
          }))
        );
      }

      setMediaFiles(media);
      setDocumentFiles(docs);
    }
  }, [stepTwoData]);

  return (
    <div className="bg-[#F9FAFA] mt-10 rounded-xl shadow-lg p-8">
      <p className="text-black pb-6">
        Document the condition of your rental property to ensure a smooth
        leasing experience. Upload photos or videos for each area of the
        property.
      </p>

      {/* Upload Box */}
      <div className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 text-center cursor-pointer block">
        <label
          htmlFor="fileUpload"
          className=" rounded-lg p-10 text-center cursor-pointer"
        >
          <p className="text-black">Upload “Documents”</p>
          <p className="text-sm text-gray-400">Upto 20MB PDF, JPG, PNG</p>
          <input
            type="file"
            id="fileUpload"
            accept="image/*,video/*,application/pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Media Preview */}
      <div className="mt-6 flex flex-wrap gap-3">
        {mediaFiles.map((file, index) => {
          const isFileObj = file instanceof File;
          const src = isFileObj ? URL.createObjectURL(file) : file.previewUrl;
          const isImage = file.type.startsWith("image/");

          return (
            <div
              key={index}
              className="relative w-28 h-28 rounded overflow-hidden"
            >
              {isImage ? (
                <img
                  src={src}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <video
                  src={src}
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
          );
        })}
      </div>

      {/* Document List */}
      <div className="mt-6 flex flex-col gap-3">
        {documentFiles.map((file, index) => {
          const isFileObj = file instanceof File;
          const fileName = isFileObj
            ? file.name
            : file.title || file.fileUrl?.split("/").pop() || "Document.pdf";

          return (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
            >
              <div className="flex items-center gap-2">
                <PiIdentificationBadge className="w-5 h-5 text-red-500" />
                <p className="text-sm truncate max-w-[180px]">{fileName}</p>
              </div>
              <button
                onClick={() => removeDocument(index)}
                className="text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => navigate("/app/dashboard")}
          className="px-[10em] py-3 rounded-full bg-gray-200 text-gray-700 font-medium"
        >
          Skip
        </button>
        <button
          disabled={loading}
          onClick={handleNext}
          className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
        >
          <div className="flex justify-center items-center">
            <span className="mr-1">Next</span>
            {loading && <RiLoader5Line className="animate-spin text-lg" />}
          </div>
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          navigate("/app/dashboard");
        }}
        data={{
          title: "Property Updated!",
          description: "Your property has been updated successfully.",
          iconBgColor: "bg-blue-600", // Optional
        }}
      />
    </div>
  );
};

export default EditPropertyDocs;
