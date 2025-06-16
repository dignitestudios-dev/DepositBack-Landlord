import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { MdEmergency, MdOutlineLocationOn } from 'react-icons/md';
import sampleUser from '../../assets/user.png';
import frontID from '../../assets/idfront.png';
import backID from '../../assets/idfront.png';
import sampleProperty from '../../assets/Homeone.png';
import { TiWarning } from 'react-icons/ti';
import { CiLocationOn } from 'react-icons/ci';
import { useNavigate } from 'react-router';
import { IoMdCheckmark } from 'react-icons/io';

const TenantRequestDetails = ({ request }) => {
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [acceptRequestModal, setAcceptRequestModal] = useState(false);
    const [tentantRequestapproved, setTentantRequestapproved] = useState(false);
    const [setleaseduration, setSetleaseduration] = useState(false);
    const [confirmleasedate, setConfirmleasedate] = useState(false);
    const [rejectedRequestModal, setRejectedRequestModal] = useState(false);

    const navigate = useNavigate("");

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            {/* Top Profile Section */}

            <div className=" bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 rounded-xl">
                <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
                    <div className="flex items-center gap-4">
                        <img src={request.img} alt={request.name} className="w-16 h-16 rounded-full" />
                        <div>
                            <h2 className="text-2xl font-[500] leading-tight">{request.name}</h2>
                            <p className="text-lg">Tenant</p>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button className="bg-white text-[#003897] px-[4em] py-2 rounded-full font-medium text-sm" onClick={() => {
                            setAcceptRequestModal(true);
                        }}>Accept</button>
                        <button className="bg-[#FFFFFF33] text-white px-[4em] py-2 rounded-full font-medium text-sm" onClick={() => {
                            setShowRequestModal(true);
                        }} >Decline</button>
                    </div>

                    {showRequestModal && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                                <div className="bg-[#FF3B30] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                                    <TiWarning size={40} />
                                </div>
                                <h2 className="font-semibold text-[20px] mb-2 text-black">Decline request</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Are you sure you want to decline tenant request?
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        className="px-[4em] py-2 text-sm text-slate-600 bg-gray-200 rounded-full"
                                        onClick={() => setShowRequestModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowRequestModal(false);
                                            setRejectedRequestModal(true);
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1000);
                                        }}
                                        className="px-[5em] py-2 text-sm bg-[#FF3B30] text-white rounded-full"

                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {tentantRequestapproved && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                                <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                                    <IoMdCheckmark size={40} />
                                </div>
                                <h2 className="font-semibold text-[20px] mb-2 text-black">Tenant Request Approved!</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    The tenant is now linked to this property<br></br> and can access its details in the app.
                                </p>

                            </div>
                        </div>
                    )}

                    {acceptRequestModal && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                                <div className="bg-[#FF3B30] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                                    <TiWarning size={40} />
                                </div>
                                <h2 className="font-semibold text-[20px] mb-2 text-black">Accept Request</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Are you sure you want to accept tenant request?
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        className="px-[4em] py-2 text-sm text-slate-600 bg-gray-200 rounded-full"
                                        onClick={() => setAcceptRequestModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setAcceptRequestModal(false);
                                            setTentantRequestapproved(true);
                                            setTimeout(() => {
                                                setTentantRequestapproved(false);
                                                setSetleaseduration(true);
                                            }, 1000);
                                        }}
                                        className="px-[5em] py-2 text-sm bg-[#FF3B30] text-white rounded-full"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {rejectedRequestModal && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                                <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                                    <IoMdCheckmark size={40} />
                                </div>
                                <h2 className="font-semibold text-[20px] mb-2 text-black">Tenant Request Rejected!</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                   The tenant will be notified and will not have access to this property.
                                </p>
                            </div>
                        </div>
                    )}

                    {setleaseduration && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
                            <div className="bg-[#F7FAFC] p-8 rounded-2xl max-w-md w-full relative shadow-lg">
                                <button onClick={() => {
                                    setSetleaseduration(false);
                                }} className="absolute top-4 right-4 text-gray-500 text-xl">×</button>
                                <h2 className="text-xl font-semibold mb-2 text-black">Set Lease Duration</h2>
                                <p className="text-sm text-gray-600 mb-6">Confirm the lease period for this property to finalize the tenant’s request.</p>

                                <div className="mb-4">
                                    <label className="text-sm font-medium text-gray-700">Lease Start Date</label>
                                    <input type="date" className="text-slate-500 mt-1 w-full p-3 rounded-xl border text-sm" />
                                </div>

                                <div className="mb-4">
                                    <label className="text-sm font-medium text-gray-700">Lease End Date</label>
                                    <input type="date" className="text-slate-500 mt-1 w-full p-3 rounded-xl border text-sm" />
                                </div>

                                <p className="text-sm text-gray-500 mb-6">
                                    The lease duration helps track the agreement timeline and ensures proper management of tenant-related tasks.
                                </p>

                                <p className="text-xs text-red-600 mb-6">
                                    <strong>Note*</strong>
                                    <p className='text-sm text-gray-500 mb-6'>
                                        After setting the lease duration, both you and the tenant will receive confirmation, and deposit tracking features will become active.
                                    </p>
                                </p>

                                <button onClick={() => {
                                    setConfirmleasedate(true);
                                    setSetleaseduration(false);
                                }} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-sm font-medium">
                                    Save
                                </button>
                            </div>
                        </div>
                    )}

                    {confirmleasedate && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                                <div className="bg-[#FF3B30] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                                    <TiWarning size={40} />
                                </div>
                                <h2 className="font-semibold text-[20px] mb-2 text-black">Confirm Lease Date</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                 Do you wish to confirm these dates?
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        className="px-[4em] py-2 text-sm text-slate-600 bg-gray-200 rounded-full"
                                        onClick={() => setConfirmleasedate(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTimeout(() => {
                                                navigate("/app/dashboard");
                                            }, 2000);
                                        }}
                                        className="px-[5em] py-2 text-sm bg-[#FF3B30] text-white rounded-full"

                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}




                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 pl-[10px] pt-[1em] pb-[1em] md:mt-0">
                    <div className="flex gap-2 items-center text-sm">
                        <FaEnvelope /> <span>mikesmith@gmail.com</span>
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                        <FaPhoneAlt /> <span>+1 834 0570 746</span>
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                        <TiWarning /> <span>Emergency Contact: +1 558 5570 758</span>
                    </div>
                </div>


            </div>

            {/* Main Details Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-2">
                    <div className="mb-4 border-b-[1px] pb-3">
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">John Doe</p>
                    </div>
                    <div className="mb-4 border-b-[1px] pb-3">
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">johndoe@gmail.com</p>
                    </div>
                    <div className="mb-4 border-b-[1px] pb-3">
                        <p className="text-sm text-gray-500">Emergency Contact</p>
                        <p className="font-medium">+000 0000 000</p>
                    </div>
                    <div className="mb-4 border-b-[1px] pb-3">
                        <p className="text-sm text-gray-500">Last Four Digits of SSN</p>
                        <p className="font-medium">XXXX</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-2">Government ID</p>
                        <div className="flex gap-4">
                            <div className="text-left bg-[#F6F6F6] p-4 rounded-2xl">
                                <p className="text-sm font-medium mb-1">Front ID Card</p>
                                <img src={frontID} alt="Front ID" className="rounded-md h-24 object-cover" />
                            </div>
                            <div className="text-left bg-[#F6F6F6] p-4 rounded-2xl">
                                <p className="text-sm font-medium mb-1">Back ID Card</p>
                                <img src={backID} alt="Back ID" className="rounded-md h-24 object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Card */}
                <div className="p-0 rounded-xl shadow-sm">
                    <div className='bg-[#F7F9FB] p-3 rounded-3xl'>
                        <div className='bg-white p-3 rounded-2xl'>
                            <img src={sampleProperty} alt="Property" className="w-full h-40 object-cover rounded-lg mb-4" />
                            <div className='flex justify-between'>
                                <h3 className="text-[18px] font-[500]">Property Name</h3>
                                <p className="text-blue-600 text-lg font-semibold">$1200<span className="text-gray-500 text-sm font-normal"> /month</span></p>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <CiLocationOn size={16} />
                                <p className="text-sm font-[500] text-gray-600 mt-1">456 Maple Street, Anytown, NY 12345</p>
                            </div>

                            <p className="text-sm text-black pt-1">Unique Code: <span className="text-blue-600 font-[500]">258496</span></p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default TenantRequestDetails;