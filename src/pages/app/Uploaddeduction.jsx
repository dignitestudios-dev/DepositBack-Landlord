import React, { useState } from "react";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";

const Uploaddeduction = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate("");

  const location = useLocation();
  const depositId = location.state?.depositId || false;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [propertyMedia, setPropertyMedia] = useState([]);
  console.log("🚀 ~ Uploaddeduction ~ propertyMedia:", propertyMedia);

  const handleUploadPropertyimage = (e) => {
    const files = Array.from(e.target.files);
    const images = files.filter((file) => file.type.startsWith("image/"));
    setPropertyMedia((prev) => [...prev, ...images]);
  };

  const removeMedias = (index) => {
    setPropertyMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/app/deposit-tracker", { state: { uploaded: true } });
    }, 2000);
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", new Date().toLocaleString());

    propertyMedia.forEach((file) => {
      formData.append("invoices", file); // multiple files with same key
    });

    try {
      const response = await axios.post(`/deposits/${depositId}`, formData);
      if (response.status === 200) {
        console.log("✅ Success:", response.data);

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate(-1);
        }, 2000);
      }
    } catch (err) {
      ErrorToast(err.response.data.message);
      console.error("❌ Error:", err);
    }
  };

  return (
    <div className="min-h-screen text-[#333] ">
      <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20">
        {/* Back + Heading */}
        <div className="flex items-center gap-3 mb-2">
          <button type="button" onClick={() => window.history.back()}>
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-[600]">Upload Deduction</h1>
        </div>
        <p className="text-1xl text-gray-600 mb-6 max-full ml-3 pt-3">
          Provide details of the expense or damage repair for deduction from the
          tenant’s deposit. Upload a receipt or invoice as proof to ensure
          transparency.
        </p>

        {/* Form */}
        <div className="bg-[#F9FAFA] rounded-xl shadow-sm p-6 space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Title</label>
              <input
                type="text"
                placeholder="Place holder goes here"
                className="border px-4 py-2 rounded-full w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* <div>
              <label className="block mb-1 text-sm font-medium">Date</label>
              <select className="border px-4 py-2 rounded-full w-full">
                <option>Select Dropdown</option>
              </select>
            </div> */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Deduction Amount
              </label>
              <input
                type="number"
                placeholder="Place holder goes here"
                className="border px-4 py-2 rounded-full w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Reason For Deduction
            </label>
            <textarea
              placeholder="Place holder goes here"
              rows={4}
              className="w-full border px-4 py-2 rounded-3xl resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Upload Receipt / Invoice
            </label>
            <div
              onClick={() => document.getElementById("fileUpload").click()}
              className="bg-white border border-dashed border-gray-400 rounded-xl p-10 text-center text-sm text-gray-600 cursor-pointer"
            >
              <p className="font-semibold">Upload “Property Images”</p>
              <p className="text-xs text-gray-400 mt-1">Upto 20mbps JPG, PNG</p>
            </div>

            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              multiple
              onChange={handleUploadPropertyimage}
              className="hidden"
            />

            {/* Preview */}
            {propertyMedia.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {propertyMedia.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-28 h-28 rounded overflow-hidden border"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => removeMedias(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Note */}
          <div className="text-sm">
            <p className="text-red-500 font-semibold text-[18px]">Note*</p>
            <p className="text-gray-500 text-[18px] pt-3">
              All deductions will be reflected in the deposit tracker and shared
              with the tenant. Ensure the details are accurate and supported by
              valid proof.
            </p>
          </div>

          {/* Upload Button */}
          <div className="pt-4 justify-center flex">
            <button
              onClick={handleDepositSubmit}
              className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white py-2 px-36 rounded-full"
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-sm w-full">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-[#0151DA] rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Deduction Added!</h2>
            <p className="text-sm text-gray-600">
              Deduction added successfully! The tenant has been notified, and
              the updated deposit balance is reflected in the tracker.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Uploaddeduction;
