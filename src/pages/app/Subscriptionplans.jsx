import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import checkmark from "../../assets/checkmark.png";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import { TiWarning } from "react-icons/ti";

export default function Subscriptionplans() {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [subscriptionCancelled, setSubscriptionCancelled] = useState(false);

  const planData = [
    {
      name: "Landlord Plan - 10 Units",
      type: "Monthly Plan",
      price: "190",
      features: [
        "Property Manager",
        "Deposits Tracker",
        "Track and Receive Rents",
        "AI Chatbot",
        "Knowledge Resource",
      ],
    },
    {
      name: "Landlord Plan - 20 Units",
      type: "Monthly Plan",
      price: "230",
      features: [
        "Property Manager",
        "Deposits Tracker",
        "Track and Receive Rents",
        "AI Chatbot",
        "Knowledge Resource",
      ],
    },
    {
      name: "Landlord Plan - 30 Units",
      type: "Monthly Plan",
      price: "280",
      features: [
        "Property Manager",
        "Deposits Tracker",
        "Track and Receive Rents",
        "AI Chatbot",
        "Knowledge Resource",
      ],
    },
  ];

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20 text-[#333]">
      <div className="w-full max-w-7xl">
        <div className="flex items-left gap-2 mb-4">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft size={25} />
          </button>
          <h1 className="text-4xl font-[600] ml-6 tracking-normal">
            Subscription Plans
          </h1>
        </div>

        <p className="text-left ml-[4em] text-gray-500 max-w-4xl mb-12 text-[15px] leading-relaxed">
          Choose from our subscription plans to suit your needs. Whether
          standard or premium, we have the right plan for you. For any
          questions, our support team is here to help.
        </p>

        {/* Subscription Plans */}
        <div className="flex justify-between items-start gap-10 mr-[4em] ml-[4em]">
          {/* Basic Plan */}

          {planData?.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-700 to-blue-500 w-1/2 p-6 rounded-3xl text-white pb-[8em]"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">{item.name}</p>
                  <h1 className="text-xl font-[600]">{item.type}</h1>
                </div>
                <div className="flex gap-1">
                  <p className="text-2xl">$</p>
                  <p className="text-4xl font-[600]">{item.price}</p>
                </div>
              </div>

              <div className="bg-white text-black p-8 rounded-2xl mt-3 -mr-10 -mb-[10em]">
                <div className="space-y-4">
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={checkmark}
                        className="h-4 w-4"
                        alt="checkmark"
                      />
                      <p className="text-sm">{feature}</p>
                    </div>
                  ))}

                  <div className="flex items-center gap-3">
                    {!subscriptionCancelled ? (
                      <>
                        <button
                          onClick={() => setShowCancelModal(true)}
                          className="w-[13em] px-4 py-3 bg-[#DC1D00] text-white rounded-full font-semibold text-center hover:opacity-90 transition"
                        >
                          Cancel Subscription
                        </button>
                        <p className="text-[14px] text-left text-gray-600 mt-1">
                          Your subscription will expire on <br />
                          <span className="text-red-600 font-semibold">
                            30 September 2025
                          </span>
                        </p>
                      </>
                    ) : (
                      <NavLink
                        to="/app/payment-method-plan"
                        state={item}
                        className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
                      >
                        Buy Now
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-sm w-full shadow-lg text-center">
            <div className="flex justify-center mb-0">
              <div className="bg-[#FF3B30] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                <TiWarning size={40} />
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-2">Cancel Subscription</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to cancel your subscription?
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="px-8 py-2 text-sm bg-gray-200 rounded-full"
                onClick={() => setShowCancelModal(false)}
              >
                No, Keep It
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSubscriptionCancelled(true);
                }}
                className="px-8 py-2 text-sm bg-[#FF3B30] text-white rounded-full"
              >
                Yes, Cancel Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
