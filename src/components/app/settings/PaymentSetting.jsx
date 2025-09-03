import React, { useState } from 'react';
import { FaChevronRight, FaPen, FaTimes, FaCheck, FaArrowLeft } from 'react-icons/fa';
import Googlepay from '../../../assets/GooglePay.png';
import Applepay from '../../../assets/ApplePay.png';
import Stripe from '../../../assets/addproperty/Stripe.png';    


const PaymentSetting = () => {
  // State to control editing and popup visibility
  const [isEditing, setIsEditing] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [stripeaccountupdate, setStripeaccountupdate] = useState(false);

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle Stripe account update logic here
    setStripeaccountupdate(true); // Show success popup after update
  };

  return (
    <div className="p-6">
      {!isEditing && ( // Only show this section when not editing
        <>
          <h3 className="text-2xl font-[600] mb-0">Payment Method</h3>
          <p className="mt-1 mb-10">Select the Payment Method.</p>

          {/* Payment Methods */}
          <div className="space-y-4 ml-[7em] mr-[7em]">
            <button className="w-full p-3 bg-[#F0F4FF] border rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={Googlepay} alt="GPay" className="h-6" />
                <span className="font-[500]">Google Pay</span>
              </div>
              <FaChevronRight />
            </button>

            <button className="w-full p-3 bg-[#F0F4FF] border rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={Applepay} alt="ApplePay" className="h-6" />
                <span className="font-[500]">Apple Pay</span>
              </div>
              <FaChevronRight />
            </button>

            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-sm font-[500]">Attached Stripe Account</h1>
                <FaPen
                  size={14}
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer"
                /> {/* Edit Icon */}
              </div>

              {/* Show Stripe Account Details */}
              <div className="p-3 mt-2 border rounded-2xl font-[500] bg-[#F0F4FF] flex justify-between items-center">
                <div className="text-sm">**** **** **** 485</div>
                <div className="flex items-center gap-2">
                  <img src={Stripe} alt="Stripe" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Stripe Account Form */}
      {isEditing && (
        <div className="p-0">
          <div className="flex gap-3">
            <button type="button" onClick={() => setIsEditing(false)}>
              <FaArrowLeft size={20} />
            </button>
            <h3 className="text-2xl font-semibold mb-0">Edit Stripe Account</h3>
          </div>
          <p className="text-sm mt-1 mb-10">
            You can update your Stripe account to manage deposit transactions.
          </p>

          <div className="ml-[7em] mr-[7em]">
            <form onSubmit={handleUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Account Holder's Name</label>
                  <input
                    type="text"
                    placeholder="Text goes here"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full p-3 mt-2 rounded-xl border bg-[#F5F5F5] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Account Number</label>
                  <input
                    type="text"
                    placeholder="Text goes here"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full p-3 mt-2 rounded-xl border bg-[#F5F5F5] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Routing Number</label>
                  <input
                    type="text"
                    placeholder="Text goes here"
                    value={routingNumber}
                    onChange={(e) => setRoutingNumber(e.target.value)}
                    className="w-full p-3 mt-2 rounded-xl border bg-[#F5F5F5] text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-[7em] bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {stripeaccountupdate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setStripeaccountupdate(false)} // Close the popup
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            {/* ✅ Success Icon */}
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">Stripe Account Updated</h2>
            <p className="text-sm text-gray-600">
              Your stripe account has been successfully updated.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSetting;
