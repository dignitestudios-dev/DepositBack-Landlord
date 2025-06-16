import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import checkmark from "../../assets/checkmark.png";

export default function SubscriptionPlans() {
    const navigate = useNavigate();

    // Data for the Basic and Premium Plans
    const basicPlanData = {
        name: "Basic Plan",
        type: "Monthly Plan",
        price: "49.99",
        features: [
            "Lorem ipsum dolor sit amet consectetur eiusmod",
            "Lorem ipsum dolor sit amet consectetur adipiscing",
            "Lorem ipsum dolor sit amet",
            "Lorem ipsum dolor sit amet consectetur",
            "Lorem ipsum dolor sit amet consectetur eiusmod",
            "Lorem ipsum dolor sit amet",
            "Lorem ipsum dolor sit amet consectetur adipiscing",
            "Lorem ipsum dolor sit amet consectetur",
            "Lorem ipsum dolor sit amet consectetur adipiscing",
            "Lorem ipsum dolor sit amet",
            "Lorem ipsum dolor sit amet consectetur eiusmod",
        ],
    };

    const premiumPlanData = {
        name: "Premium Plan",
        type: "Yearly Plan",
        price: "99.99",
        features: [
            "Lorem ipsum dolor sit amet consectetur eiusmod",
            "Lorem ipsum dolor sit amet consectetur adipiscing",
            "Lorem ipsum dolor sit amet",
            "Lorem ipsum dolor sit amet consectetur",
            "Lorem ipsum dolor sit amet consectetur eiusmod",
            "Lorem ipsum dolor sit amet",
            "Lorem ipsum dolor sit amet consectetur adipiscing",
            "Lorem ipsum dolor sit amet consectetur",
            "Lorem ipsum dolor sit amet consectetur adipiscing",
            "Lorem ipsum dolor sit amet",
            "Lorem ipsum dolor sit amet consectetur eiusmod",
        ],
    };

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
                    Choose from our subscription plans to suit your needs. Whether standard or premium, we have the right plan for you. For any questions, our support team is here to help.
                </p>

                {/* Subscription Plans */}
                <div className="flex justify-between items-center gap-10 mr-[4em] ml-[4em]">
                    {/* Basic Plan */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 w-1/2 p-6 rounded-3xl text-white pb-[8em]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Basic Plan</p>
                                <h1 className="text-xl font-[600]">Monthly Plan</h1>
                            </div>
                            <div className="flex gap-1">
                                <p className="text-2xl">$</p>
                                <p className="text-4xl font-[600]">49.99</p>
                            </div>
                        </div>
                        <div className="bg-white text-black p-8 rounded-2xl mt-3 -mr-10 -mb-[10em]">
                            <div className="space-y-4">
                                {basicPlanData.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <img src={checkmark} className="h-4 w-4" alt="checkmark" />
                                        <p className="text-sm">{feature}</p>
                                    </div>
                                ))}
                                <NavLink
                                    to="/onboarding/payment-method"
                                    state={basicPlanData}  // Passing both plan data and features via state
                                    className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
                                >
                                    Buy Now
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 w-1/2 p-6 rounded-3xl text-white pb-[8em]">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Premium Plan</p>
                                <h1 className="text-xl font-[600]">Yearly Plan</h1>
                            </div>
                            <div className="flex gap-1">
                                <p className="text-2xl">$</p>
                                <p className="text-4xl font-[600]">99.99</p>
                            </div>
                        </div>
                        <div className="bg-white text-black p-8 rounded-2xl mt-3 -mr-10 -mb-[10em]">
                            <div className="space-y-4">
                                {premiumPlanData.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <img src={checkmark} className="h-4 w-4" alt="checkmark" />
                                        <p className="text-sm">{feature}</p>
                                    </div>
                                ))}
                                <NavLink
                                    to="/onboarding/payment-method"
                                    state={premiumPlanData}  // Passing both plan data and features via state
                                    className="block w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-semibold text-center hover:opacity-90 transition"
                                >
                                    Buy Now
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
