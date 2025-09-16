import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useFetchData } from "../../hooks/api/Get";
import ProfileSkeleton from "../../components/app/ProfileSkeleton";
import logomain from "../../assets/logomain.webp";

const LandlordProfile = () => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);

  const { data, loading } = useFetchData(`/users/me`, {}, 1, update);

  return (
    <div className="min-h-screen bg-[#F6FAFF] text-[#333]">
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-0">
          {/* Header */}
          <div className="flex gap-4 items-center mb-6">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={25} />
            </button>
            <h2 className="text-[34px] font-[600] leading-[48px] capitalize">
              Landlord Profile
            </h2>
          </div>

          {/* Profile Card with Personal Details */}
          <div className="bg-white p-8 rounded-2xl mb-6  mx-auto">
  <div className="flex flex-col items-center gap-4 mb-6">
    {/* Profile Image and Name */}
    <div className="flex flex-col items-center gap-4">
      <img
        src={data?.profilePicture || logomain}
        alt="Profile"
        className="w-[8em] h-[8em] rounded-full object-cover shadow-md"
      />
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800">{data?.name || "N/A"}</h3>
        <p className="text-sm text-gray-500">{data?.email || "N/A"}</p>
      </div>
    </div>
  </div>

  {/* Personal Details */}
  <div className="mt-6">
    <h4 className="text-[24px] font-semibold text-gray-800 mb-4">Personal Details</h4>

    {/* Full Name */}
    <div className="mb-4 border-b-[1px] border-gray-200 pb-3">
      <p className="text-sm text-gray-500">Full Name</p>
      <p className="font-medium text-gray-800">{data?.name || "N/A"}</p>
    </div>

    {/* Email */}
    <div className="mb-4 border-b-[1px] border-gray-200 pb-3">
      <p className="text-sm text-gray-500">Email Address</p>
      <p className="font-medium text-gray-800">{data?.email || "N/A"}</p>
    </div>

    {/* Emergency Contact */}
    <div className="mb-4 border-b-[1px] border-gray-200 pb-3">
      <p className="text-sm text-gray-500">Emergency Contact</p>
      <p className="font-medium text-gray-800">{data?.phoneNo || "N/A"}</p>
    </div>

    {/* SSN */}
    <div className="mb-4 border-b-[1px] border-gray-200 pb-3">
      <p className="text-sm text-gray-500">Last Four Digits of SSN</p>
      <p className="font-medium text-gray-800">{data?.lastFourSSN || "XXXX"}</p>
    </div>
  </div>
</div>


          {/* Reviews */}
          <div className="bg-[#fff] p-0 rounded-xl border mt-6">
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
      )}
    </div>
  );
};

export default LandlordProfile;
