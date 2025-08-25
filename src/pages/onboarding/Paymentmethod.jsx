import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import checkmark from "../../assets/checkmark.png";
import Applepay from "../../assets/ApplePay.png";
import Googlepay from "../../assets/GooglePay.png";
import Modal from "../../components/global/Modal";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

export default function Paymentmethod() {
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

  const navigate = useNavigate();
  const location = useLocation(); // Get location state
  const planData = location.state || {}; // Access the passed data, or default to empty object
  const [showModal, setShowModal] = useState(false);

  // Define sample data in case no data is passed
  const sampleData = {
    name: "Sample Plan",
    type: "Sample Plan Type",
    price: "99.99",
    features: [
      "Lorem ipsum dolor sit amet consectetur eiusmod",
      "Sed do eiusmod tempor incididunt ut labore",
      "Duis aute irure dolor in reprehenderit in voluptate",
      "Excepteur sint occaecat cupidatat non proident",
      "Lorem ipsum dolor sit amet consectetur adipiscing",
    ],
  };

  // Use sample data if no planData is available
  const dataToDisplay = planData.name ? planData : sampleData;

  return (
    <div className="min-h-screen bg-[#f3f6fb] flex flex-col items-center p-6 pt-20 pb-20">
      <div className="w-full max-w-6xl">
        {/* Back + Heading */}
        <div className="flex items-center gap-2 mb-6">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft size={25} />
          </button>
          <h1 className="text-4xl font-[600] mx-auto tracking-normal">
            Payment Method
          </h1>
        </div>

        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-[15px] leading-relaxed -mt-4">
          Choose which payment method you would like to use.
        </p>

        {/* Display Plan Data */}
        <div className="flex justify-between items-center gap-10 mr-[4em] ml-[4em]">
          {/* Plan Display */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 w-1/2 p-6 rounded-3xl text-white pb-[11em]">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">{dataToDisplay.name}</p>
                <h1 className="text-xl font-[600]">{dataToDisplay.type}</h1>
              </div>
              <div className="flex gap-1">
                <p className="text-2xl">$</p>
                <p className="text-4xl font-[600]">{dataToDisplay.price}</p>
              </div>
            </div>
            <div className="bg-white text-black p-8 rounded-2xl mt-4 -mr-10 -mb-[13em]">
              <div className="space-y-4">
                {dataToDisplay.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={checkmark} className="h-4 w-4" alt="checkmark" />
                    <p className="text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="w-1/2 p-6">
            <Elements stripe={stripePromise}>
              <PaymentForm planData={planData} setShowModal={setShowModal} />
            </Elements>
            {/* <div className="flex gap-3 bg-white p-5 justify-center items-center rounded-full">
                            <img src={Applepay} className="h-8" alt="Apple Pay" />
                            <p className="font-[600]">Apple Pay</p>
                        </div>
                        <br />
                        <div className="flex gap-3 bg-white p-5 justify-center items-center rounded-full">
                            <img src={Googlepay} className="h-8" alt="Google Pay" />
                            <p className="font-[600]">Google Pay</p>
                        </div> */}
            <br />

            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onAction={() => {
                setShowModal(false);
                navigate("/onboarding/request-submitted");
              }}
              data={{
                title: "Congratulations!",
                description: "You have subscribed to the plan.",
                actionText: "OK",
                iconBgColor: "bg-blue-600", // Optional
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
