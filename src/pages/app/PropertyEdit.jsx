import { useState } from "react";
import { useLocation } from "react-router";
import EditPropertyDetail from "../../components/app/editProperty/EditPropertyDetail";
import EditPropertyDocs from "../../components/app/editProperty/EditPropertyDocs";

const PropertyEdit = () => {
  const location = useLocation();
  const propertyDetail = location.state?.propertyDetail;
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState({});
  const [stepTwoData, setStepTwoData] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-[#ecf3fd] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900">
          {step === 1 ? "Edit Property Details" : "Edit Inspection Details"}
        </h2>
        {step === 1 && (
          <EditPropertyDetail
            nextStep={nextStep}
            stepOneData={propertyDetail}
            propertyDetail={(data) => setStepOneData(data)}
          />
        )}

        {step === 2 && (
          <EditPropertyDocs
            stepTwoData={propertyDetail}
            inspectionDetail={(data) => setStepTwoData(data)}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyEdit;
