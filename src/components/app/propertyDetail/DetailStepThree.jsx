import { useState } from "react";
import UvModal from "./UvModal";
import BuyUvModal from "./BuyUvModal";
import { ErrorToast } from "../../global/Toaster";
import axios from "../../../axios";
import { RiLoader5Line } from "react-icons/ri";

const DetailStepThree = ({ nextStep, propertyId }) => {
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadUv, setUploadUv] = useState(false);
  const [uvMedia, setUvMedia] = useState([]);

  const handleUploadUvimage = (e) => {
    const files = Array.from(e.target.files);
    const images = files.filter((file) => file.type.startsWith("image/"));
    setUvMedia((prev) => [...prev, ...images]);
  };

  const removeMedias = (index) => {
    setUvMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUvUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      uvMedia.forEach((file) => {
        formData.append("uvLightImages", file);
      });

      const response = await axios.post(
        `/properties/uvImages/${propertyId}`,
        formData
      );
      if (response.status === 200) {
        console.log("response.data --> ", response.data);
        nextStep();
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
      <div className="h-[250px]">
        <p className="text-black pb-3 pt-3 ">
          UV (Ultraviolet) light is a form of electromagnetic radiation that is
          invisible to the human eye. It is commonly used in verification and
          tracking processes because certain materials react to UV exposure by
          glowing or becoming visible. This makes UV light highly effective for
          detecting marks, validating authenticity and enhancing security in
          various applications without affecting the visible appearance of an
          item.
        </p>
      </div>

      {uploadUv ? (
        <div>
          <div className=" w-full">
            <div className="flex justify-start">
              <h2 className="text-2xl font-[600] mb-2">Upload UV Images</h2>
            </div>
            <div className=" border-2 border-dashed bg-white border-blue-500 rounded-lg p-4 text-center cursor-pointer block mb-3">
              <label
                htmlFor="fileUpload"
                className="rounded-lg p-10 text-center cursor-pointer"
              >
                <p className="text-black">Upload “Property Images”</p>
                <p className="text-sm text-gray-400">Up to 20MB • JPG, PNG</p>
                <input
                  type="file"
                  id="fileUpload"
                  accept="image/*"
                  multiple
                  onChange={handleUploadUvimage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className=" flex flex-wrap gap-3">
            {uvMedia.map((file, index) => (
              <div
                key={index}
                className="relative w-28 h-28 rounded overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded"
                />
                <button
                  className="absolute top-1 right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => removeMedias(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {uvMedia.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                disabled={loading}
                type="button"
                onClick={handleUvUpload}
                className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
              >
                <div className="flex justify-center items-center">
                  <span className="mr-1">Submit</span>
                  {loading && (
                    <RiLoader5Line className="animate-spin text-lg" />
                  )}
                </div>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
          >
            Verify UV Light
          </button>
        </div>
      )}

      <UvModal
        onYes={() => {
          setShowModal(false);
          setUploadUv(true);
        }}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setModalOpen(true);
        }}
        data={{
          title: "Do you have a UV light?",
          description: "Confirm that you have the UV light or not.",
          iconBgColor: "bg-blue-600", // Optional
        }}
      />
      <BuyUvModal
        isOpen={modalOpen}
        onAction={() => {
          setModalOpen(false);
          window.open(
            "https://www.aliexpress.com/item/1005008144685971.html",
            "_blank"
          );
        }}
        onSecondaryAction={() => {
          nextStep();
        }}
        data={{
          title: "Do you have a UV light?",
          description: "Confirm that you have the UV light or not.",
          iconBgColor: "bg-blue-600",
        }}
      />
    </div>
  );
};

export default DetailStepThree;
