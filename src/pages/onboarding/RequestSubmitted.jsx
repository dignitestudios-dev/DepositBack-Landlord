import React from 'react';
import requestsubmitted from "../../assets/request-submitted.png";
import { useNavigate } from 'react-router';

const RequestSubmitted = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center" onClick={() => {
            navigate("/onboarding/profile-approved")
        }}>
            <div className="flex justify-center items-center mb-6">
                <img src={requestsubmitted} className="w-[28em] h-[20em]" alt="Request Submitted" />
            </div>
            <h1 className="text-3xl font-[600] mb-4">Request Submitted</h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-[15px] leading-relaxed ">
                Your profile is under review. You will receive an email once your profile has been approved.
            </p>
        </div>
    );
};

export default RequestSubmitted;
