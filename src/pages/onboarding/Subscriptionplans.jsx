import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import checkmark from "../../assets/checkmark.png";

export default function SubscriptionPlans() {
  const navigate = useNavigate();

  const planData = [
    {
      name: "Landlord Plan - 10 Units",
      type: "Monthly Plan",
      price: "190",
      sku: "landlord_plan_10_units",
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
      sku: "landlord_plan_20_units",
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
      sku: "landlord_plan_30_units",
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
    <div className="min-h-screen bg-[#f3f6fb] flex flex-col items-center p-6 pt-20 pb-20">
      <div className="w-full max-w-6xl">
        <div className="flex items-center gap-2 mb-6">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft size={25} />
          </button>
          <h1 className="text-4xl font-[600] mx-auto tracking-normal">
            Subscription Plans
          </h1>
        </div>

        <p className="text-center text-gray-500 max-w-4xl mx-auto mb-12 text-[15px] leading-relaxed">
          Choose from our subscription plans to suit your needs. Whether
          standard or premium, we have the right plan for you. For any
          questions, our support team is here to help.
        </p>

        {/* Subscription Plans */}
        <div className="flex justify-between items-center gap-10 mr-[4em] ml-[4em]">
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
                    <NavLink
                      to="/onboarding/payment-method"
                      state={item}
                      className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
                    >
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
