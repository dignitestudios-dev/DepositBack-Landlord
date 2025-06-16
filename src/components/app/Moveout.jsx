import React from 'react';

const Moveout = () => {
  return (
    <div className="bg-[#F6FAFF] text-[#333] flex items-center pt-[9em] pb-[9em] justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-3xl font-[600] text-black mb-4">No Move-Out Files Yet!</h1>
        <p className="text-base text-gray-700 leading-relaxed">
          The tenant hasn’t uploaded any move-out photos, videos, or documents yet. <br />
          You can remind them to submit the required files to ensure a smooth move-out process.
        </p>
      </div>
    </div>
  );
};

export default Moveout;
