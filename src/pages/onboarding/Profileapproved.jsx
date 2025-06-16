import React from 'react';
import profileapproved from "../../assets/accountapproved.png"
import { useNavigate } from 'react-router';

const Profileapproved = () => {
    const navigate = useNavigate("");
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center" onClick={() => {
            navigate("/onboarding/account-created")}}>
            <div className="flex justify-center items-center mb-6">
                <img src={profileapproved} className="w-[20em] h-[20em]" alt="profileapproved" />
            </div>
            <h1 className="text-3xl font-[600] mb-4">Profile Approved</h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-[15px] leading-relaxed ">
                Your profile has been approved successfully.
            </p>
        </div>
    );
};

export default Profileapproved;
