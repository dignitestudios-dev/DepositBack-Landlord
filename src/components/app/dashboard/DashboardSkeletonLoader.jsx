import React from "react";

const DashboardSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-2xl shadow-lg overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative">
            <div className="w-full h-[13em] bg-gray-300 rounded-2xl" />
            <div className="absolute top-2 right-2 h-6 w-16 bg-gray-400 rounded-full" />
          </div>

          {/* Content Skeleton */}
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="h-5 w-1/2 bg-gray-300 rounded" />
              <div className="h-5 w-16 bg-gray-300 rounded" />
            </div>

            <div className="flex gap-1 pt-4 items-center">
              <div className="h-4 w-4 bg-gray-300 rounded-full" />
              <div className="h-4 w-3/4 bg-gray-300 rounded" />
            </div>

            <div className="mt-3 h-4 w-1/2 bg-gray-300 rounded" />

            <div className="flex gap-3 justify-between pt-5 items-center">
              {/* Left user info */}
              <div className="flex gap-3 items-center">
                <div className="h-10 w-10 bg-gray-300 rounded-full" />
                <div>
                  <div className="h-4 w-24 bg-gray-300 rounded mb-1" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Chat icon */}
              <div className="h-10 w-10 bg-gray-300 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSkeletonLoader;
