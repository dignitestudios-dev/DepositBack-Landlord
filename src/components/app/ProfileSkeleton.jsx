import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-0 animate-pulse">
      {/* Header */}
      <div className="flex gap-4 items-center mb-6">
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
        <div className="h-8 w-40 bg-gray-300 rounded"></div>
      </div>

      {/* Profile Card */}
      <div className="flex items-center p-8 rounded-2xl justify-between bg-white">
        <div className="flex items-center gap-6">
          <div className="w-[6em] h-[6em] rounded-full bg-gray-300"></div>
          <div>
            <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-60 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-10 w-32 bg-gray-300 rounded-full"></div>
      </div>

      {/* Details & Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Personal Details */}
        <div className="bg-[#fff] p-0 rounded-xl border">
          <div className="h-8 w-40 bg-gray-300 rounded mb-4 ml-6 mt-3"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="border-b-[1px] pl-6 pt-3 pb-3 flex flex-col gap-2"
              >
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-5 w-52 bg-gray-300 rounded"></div>
              </div>
            ))}
            {/* Government ID */}
            <div className="pl-6 pt-3 pb-3">
              <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="flex gap-4">
                {[1, 2].map((_, i) => (
                  <div
                    key={i}
                    className="text-left bg-[#F6F6F6] p-4 rounded-2xl flex flex-col gap-2"
                  >
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    <div className="h-24 w-36 bg-gray-300 rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-[#fff] p-0 rounded-xl border">
          <div className="h-8 w-32 bg-gray-300 rounded mb-4 ml-6 mt-3"></div>
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="border-b pb-4 mb-4 pl-6 pt-3 flex flex-col gap-3"
            >
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-4 w-64 bg-gray-300 rounded"></div>
              <div className="h-4 w-52 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
