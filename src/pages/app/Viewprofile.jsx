import React, { useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import user from "../../assets/user.png";
import usertwo from "../../assets/usertwo.png";
import frontID from "../../assets/idfront.png";
import backID from "../../assets/idfront.png";
import EditProfileModal from "../../components/app/EditProfileModal";
import { useFetchData } from "../../hooks/api/Get";
import ProfileSkeleton from "../../components/app/ProfileSkeleton";
import logomain from "../../assets/logomain.webp";

const ViewProfile = () => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseModal = (wasSuccessful) => {
    setShowEditModal(false);
    if (wasSuccessful) {
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }, 500); // wait for modal to close
    }
  };

  const { data, loading } = useFetchData(`/users/me`, {}, 1, "");
  console.log("🚀 ~ ViewProfile ~ loading:", loading);
  console.log("🚀 ~ ViewProfile ~ data:", data);

  return (
    <div className="min-h-screen bg-[#F6FAFF] text-[#333]">
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-0">
          {/* Header */}
          <div className="flex gap-4 items-center mb-6">
            <button type="button" onClick={() => navigate("/app/Dashboard")}>
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-[34px] font-[600] leading-[48px] capitalize">
              Profile
            </h2>
          </div>

          {/* Profile Card */}
          <div className="flex items-center p-8 rounded-2xl justify-between bg-white">
            <div className="flex items-center gap-6">
              <img
                src={data?.profilePicture || logomain}
                alt="Profile"
                className="w-[6em] h-[6em] rounded-full object-cover"
              />
              <div>
                <h3 className="text-2xl font-semibold">
                  {data?.name || "N/A"}
                </h3>
                <p className="text-gray-500">{data?.email || "N/A"}</p>
              </div>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-medium px-10 py-3 rounded-full"
            >
              Edit Profile
            </button>
          </div>

          {/* Details & Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Personal Details */}
            <div className="bg-[#fff] p-0 rounded-xl border">
              <h4 className="text-[24px] font-[600] mb-4 border-b-2 pl-6 pt-3 pb-3">
                Personal Details
              </h4>
              <div className="md:col-span-2">
                {/* Name */}
                <div className="mb-4 border-b-[1px] pl-6 pt-3 pb-3">
                  <p className="text-sm text-gray-500 ">Full Name</p>
                  <p className="font-medium">{data?.name || "N/A"}</p>
                </div>

                {/* Email */}
                <div className="mb-4 border-b-[1px] pl-6 pt-3 pb-3">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{data?.email || "N/A"}</p>
                </div>

                {/* Phone */}
                <div className="mb-4 border-b-[1px] pl-6 pt-3 pb-3">
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p className="font-medium">{data?.phoneNo || "N/A"}</p>
                </div>

                {/* SSN */}
                <div className="mb-4 border-b-[1px] pl-6 pt-3 pb-3">
                  <p className="text-sm text-gray-500">
                    Last Four Digits of SSN
                  </p>
                  <p className="font-medium">{data?.lastFourSSN || "XXXX"}</p>
                </div>

                {/* Government ID */}
                <div className="pl-6 pt-3 pb-3">
                  <p className="text-sm text-gray-500 mb-2 ">Government ID</p>
                  <div className="flex gap-4">
                    <div className="text-left bg-[#F6F6F6] p-4 rounded-2xl">
                      <p className="text-sm font-medium mb-1">Front ID Card</p>
                      {data?.governmentIdFront ? (
                        <img
                          src={data.governmentIdFront}
                          alt="Front ID"
                          className="rounded-md h-24 w-[220px] object-cover"
                        />
                      ) : (
                        <p className="text-gray-400">Not Uploaded</p>
                      )}
                    </div>
                    <div className="text-left bg-[#F6F6F6] p-4 rounded-2xl">
                      <p className="text-sm font-medium mb-1">Back ID Card</p>
                      {data?.governmentIdBack ? (
                        <img
                          src={data.governmentIdBack}
                          alt="Back ID"
                          className="rounded-md h-24 w-[220px] object-cover"
                        />
                      ) : (
                        <p className="text-gray-400">Not Uploaded</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-[#fff] p-0 rounded-xl border">
              <h4 className="text-[24px] font-[600] mb-4 border-b-2 pl-6 pt-3 pb-3">
                Reviews
              </h4>

              {data?.ratingCount > 0 ? (
                <div className="pl-6 pt-3 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-lg">★★★★★</span>
                    <span className="text-sm font-semibold ml-2">
                      {data?.avgRating || 0} ({data?.ratingCount} reviews)
                    </span>
                  </div>
                  {/* you can map actual reviews list when backend sends */}
                </div>
              ) : (
                <p className="text-gray-500 pl-6 py-4">No reviews yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showEditModal && <EditProfileModal onClose={handleCloseModal} />}

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={30} />
            </div>
            <h2 className="font-semibold text-lg mb-1">Profile Updated!</h2>
            <p className="text-sm text-gray-600">
              Your Profile has been successfully updated!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
