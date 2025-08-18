import { useState } from "react";
import Propertydetails from "../../assets/addproperty/Propertydetails.png";
import Stripeaccount from "../../assets/addproperty/Stripeaccount.png";
import Uniquepropertycode from "../../assets/addproperty/Uniquepropertycode.png";
import Inspectiondetails from "../../assets/addproperty/Inspectiondetails.png";
import UvImage from "../../assets/addproperty/UvImage.png";

import line from "../../assets/addproperty/Line.png";
import Stripe from "../../assets/addproperty/Stripe.png";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import Modal from "../../components/global/Modal";
import Addmorepropertymodal from "../../components/global/Addmorepropertymodal";
import DetailStepOne from "../../components/app/propertyDetail/DetailStepOne";
import DetailStepTwo from "../../components/app/propertyDetail/DetailStepTwo";
import DetailStepThree from "../../components/app/propertyDetail/DetailStepThree";
import DetailStepFour from "../../components/app/propertyDetail/DetailStepFour";
import { useNavigate } from "react-router";

const AddPropertyDetail = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [accountholderName, setAccountholderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [isStripeLinked, setIsStripeLinked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [stepOneData, setStepOneData] = useState({});
  const [stepTwoData, setStepTwoData] = useState({});

  const modalData = {
    title: "Add More Properties",
    description:
      "Do you manage more rental properties? Add them now to streamline your experience.",
    iconBgColor: "bg-blue-500",
    actionText: "Add Another Property",
    actionTextTwo: "Finish for now",
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const steps = [
    { img: Propertydetails, label: "Property Details" },
    { img: Inspectiondetails, label: "Inspection Details" },
    { img: UvImage, label: "UV Images" },
    { img: Uniquepropertycode, label: "Unique Property Code" },
    // { img: Stripeaccount, label: "Stripe Account" },
  ];

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

        {/* {step === 5 && (
          <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
            {!showStripeForm ? (
              // === Step 1: Connect your Stripe Account screen ===
              <>
                <p className="text-black pb-6 text-2xl font-[500]">
                  Connect Your Stripe Account
                </p>
                <p>
                  To securely manage deposit transactions, refunds, and
                  deductions, you need to link your Stripe account. This ensures
                  smooth handling of funds held in escrow.
                </p>

                <div
                  className="bg-white rounded-2xl p-4 flex items-center justify-between w-[30em] mt-6 mb-6 cursor-pointer"
                  onClick={() => setShowStripeForm(true)}
                >
                  <div className="flex items-center gap-2">
                    <img src={Stripe} className="h-7 w-10" alt="Stripe Logo" />
                    <p className="font-[500]">Stripe</p>
                  </div>
                  <FaChevronRight />
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    onClick={nextStep}
                    disabled
                    className="px-[10em] py-3 rounded-full bg-[#E7E7E8] text-slate-400 font-medium"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : !isStripeLinked ? (
              // === Step 2: Stripe Form ===
              <>
                <p className="text-black pb-6 text-2xl font-[500]">
                  Add Stripe Account
                </p>
                <p>
                  You can update your Stripe account to manage deposit
                  transactions.
                  <br />
                  Note: Without a linked account, you cannot process tenant
                  deposits or deductions.
                </p>

                <div className="pt-10 w-[38em]">
                  <div>
                    <label
                      htmlFor="accountholderName"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Account Holder’s Name
                    </label>
                    <input
                      id="accountholderName"
                      type="text"
                      placeholder="Enter Account Holder’s Name"
                      value={accountholderName}
                      onChange={(e) => setAccountholderName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="pt-3 pb-3">
                    <label
                      htmlFor="accountNumber"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Account Number
                    </label>
                    <input
                      id="accountNumber"
                      type="tel"
                      placeholder="Enter Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="routingNumber"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Routing Number
                    </label>
                    <input
                      id="routingNumber"
                      type="tel"
                      placeholder="Enter Routing Number"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setIsStripeLinked(true)}
                    className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              // === Step 3: Confirmation ===
              <>
                <p className="text-black pb-6 text-2xl font-[500]">
                  Your Stripe account is now linked. You are ready to manage
                  deposits, refunds, and<br></br> deduction securely.
                </p>
                <div className="bg-white rounded-2xl p-4 flex items-center justify-between w-[30em] mt-6 mb-6 cursor-pointer">
                  <p className="font-[500]">**** **** **** *485</p>
                  <img src={Stripe} className="h-7 w-10" alt="Stripe Logo" />
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    disabled={loading}
                    onClick={handlePropertySubmit}
                    className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
                  >
                    {loading ? "Loading..." : "Next"}
                  </button>
                </div>
              </>
            )}

            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false);
                setModalOpen(true);
              }}
              data={{
                title: "Property Added!",
                description: "Your property has been added successfully.",
                iconBgColor: "bg-blue-600", // Optional
              }}
            />
            <Addmorepropertymodal
              isOpen={modalOpen}
              onAction={() => {
                setStep(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setModalOpen(false);
              }}
              onSecondaryAction={() => {
                console.log("Continue Clicked");
                setModalOpen(false);
                navigate("/app/dashboard");
              }}
              data={modalData}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AddPropertyDetail;
