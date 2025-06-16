import React from 'react';
import accountcreated from "../../assets/accountcreated.png";
import { useNavigate } from 'react-router';

const Accountcreated = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center" onClick={() => {
            navigate("/app/add-property-details")
        }}>
            <div className="flex justify-center items-center mb-6">
                <img src={accountcreated} className="w-[21em] h-[18em]" alt="Request Submitted" />
            </div>
            <h1 className="text-3xl font-[600] mb-4">Account Created</h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-[15px] leading-relaxed ">
                Your account has been created successfully.
            </p>
        </div>
    );
};

export default Accountcreated;
