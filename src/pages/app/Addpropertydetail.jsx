import { useEffect, useState } from "react";
import Propertydetails from "../../assets/addproperty/Propertydetails.png";
import Uniquepropertycode from "../../assets/addproperty/Uniquepropertycode.png";
import Inspectiondetails from "../../assets/addproperty/Inspectiondetails.png";
import UvImage from "../../assets/addproperty/UvImage.png";

import line from "../../assets/addproperty/Line.png";
import lineBlue from "../../assets/addproperty/LineBlue.png";
import { FaArrowLeft } from "react-icons/fa";
import DetailStepOne from "../../components/app/propertyDetail/DetailStepOne";
import DetailStepTwo from "../../components/app/propertyDetail/DetailStepTwo";
import DetailStepThree from "../../components/app/propertyDetail/DetailStepThree";
import DetailStepFour from "../../components/app/propertyDetail/DetailStepFour";
import { useFetchData } from "../../hooks/api/Get";
import { ErrorToast } from "../../components/global/Toaster";
import axios from "../../axios";

const AddPropertyDetail = () => {
  const [step, setStep] = useState(1);

  // const [accountholderName, setAccountholderName] = useState("");
  // const [accountNumber, setAccountNumber] = useState("");
  // const [routingNumber, setRoutingNumber] = useState("");
  // const [showStripeForm, setShowStripeForm] = useState(false);
  // const [isStripeLinked, setIsStripeLinked] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const [stepOneData, setStepOneData] = useState({});
  const [stepTwoData, setStepTwoData] = useState({});

  // const modalData = {
  //   title: "Add More Properties",
  //   description:
  //     "Do you manage more rental properties? Add them now to streamline your experience.",
  //   iconBgColor: "bg-blue-500",
  //   actionText: "Add Another Property",
  //   actionTextTwo: "Finish for now",
  // };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const { data } = useFetchData(`/users/me`, {}, 1, "");

  const steps = [
    { img: Propertydetails, label: "Property Details" },
    { img: Inspectiondetails, label: "Inspection Details" },
    { img: UvImage, label: "UV Images" },
    { img: Uniquepropertycode, label: "Unique Property Code" },
    // { img: Stripeaccount, label: "Stripe Account" },
  ];

  const handleStripeAccount = async () => {
    try {
      const { data } = await axios.get("/users/linkForWeb");
      console.log("🚀 ~ handleStripeAccount ~ response:", data);
      if (data?.success) {
        window.location.href = data?.data;
        userData?.stripeConnectLink;
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (data?.stripeProfileStatus && data?.stripeProfileStatus !== "approved") {
      handleStripeAccount();
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#ecf3fd] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-3">
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              <FaArrowLeft size={20} />
            </button>
          )}
          <h2 className="text-3xl font-semibold text-gray-900">
            Add Property Details
          </h2>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between items-center mt-12 text-center mx-12">
          {steps.map((stepItem, index) => (
            <div className="flex flex-col items-center" key={index}>
              <img
                src={stepItem.img}
                className="h-8 mb-2"
                alt={stepItem.label}
              />
              <span
                className={`text-sm font-medium ${
                  step >= index + 1 ? "text-black" : "text-gray-500"
                }`}
              >
                {stepItem.label}
              </span>
              <div
                className={`mt-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-10 ${
                  step >= index + 1
                    ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-24 mt-[-1em]">
          <img src={line} className="h-[3px] w-full" alt="step-line" />
        </div>

        {/* Step Content */}
        {step === 1 && (
          <DetailStepOne
            nextStep={nextStep}
            stepOneData={stepOneData}
            propertyDetail={(data) => setStepOneData(data)}
          />
        )}

        {step === 2 && (
          <DetailStepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            stepTwoData={stepTwoData}
            stepOneData={stepOneData}
            inspectionDetail={(data) => setStepTwoData(data)}
          />
        )}

        {step === 3 && (
          <DetailStepThree
            nextStep={nextStep}
            propertyId={stepOneData?.propertyId}
          />
        )}

        {step === 4 && (
          <DetailStepFour
            nextStep={nextStep}
            uniquePropertyCode={stepOneData?.propertyCode}
          />
        )}
      </div>
    </div>
  );
};

export default AddPropertyDetail;
