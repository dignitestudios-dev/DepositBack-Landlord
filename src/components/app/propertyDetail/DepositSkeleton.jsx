import React from "react";

const DepositSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Total Deposit Amount Skeleton */}
      <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2">
          <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Receipts and Deductions Skeleton */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="h-5 w-52 bg-gray-200 rounded mb-4"></div>

        {[1, 2].map((i) => (
          <div key={i} className="bg-[#F3F3F3] p-6 rounded-2xl my-2 space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-full bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Remaining Balance Skeleton */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
        <div className="h-5 w-40 bg-gray-200 rounded"></div>
        <div className="h-8 w-28 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default DepositSkeleton;
