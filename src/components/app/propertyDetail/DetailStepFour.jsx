const DetailStepFour = ({ nextStep }) => {
  return (
    <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
      <p className="text-black pb-6 text-2xl font-[500]">
        Here is the unique property code for your rental unit.
      </p>
      <div>
        <p className="text-4xl text-blue-600 font-[600] tracking-[14px]">
          123456
        </p>
      </div>
      <p className="text-black pb-3 pt-6">
        Each property is assigned a unique code that tenants will use to link
        their accounts to this property. Share this code securely with your
        tenants to ensure they can access and manage the property details.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={nextStep}
          className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DetailStepFour;
