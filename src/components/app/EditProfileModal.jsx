import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import profilePic from '../../assets/user.png';
import frontID from '../../assets/idfront.png';
import backID from '../../assets/idfront.png';
import usaflag from "../../assets/usaflag.png";
import Input from "../../components/global/Input";
import plus from "../../assets/plus.png";

const EditProfileModal = ({ onClose }) => {
    const [profileImage, setProfileImage] = useState(profilePic);
    const [frontIDImage, setFrontIDImage] = useState(frontID);
    const [backIDImage, setBackIDImage] = useState(backID);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [ssn, setSSN] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleImageChange = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'profile') setProfileImage(reader.result);
                if (type === 'front') setFrontIDImage(reader.result);
                if (type === 'back') setBackIDImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

const handleSubmit = (e) => {
    e.preventDefault();
    onClose(true); // pass success flag
};



    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">
                <button className="absolute top-4 right-4 text-xl" onClick={onClose}><IoClose /></button>
                <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
                <div className="flex gap-4 items-center mb-6">
                    <div className="relative">
                        <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                        <label className="absolute -bottom-1 -right-1 rounded-full cursor-pointer">
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'profile')} />
                            <img src={plus} className='w-6 h-6' alt="" />
                        </label>
                    </div>
                    <button className="text-sm font-medium text-blue-600 underline" onClick={() => document.getElementById('profileUpload').click()}>
                        Update Profile Image
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='flex gap-[6em]'>
                        <Input
                            label="Full Name"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter full name"
                            className="bg-[#ECECEC] !w-[132%]"
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="bg-[#ECECEC] !w-[132%]"
                        />
                    </div>


                    <div className='pt-3'>
                        <span className="block text-[15px] text-gray-800 font-[500]">Phone Number</span>
                        <div className="flex gap-[10px] justify-start items-center">
                            <div className="bg-[#ECECEC] rounded-full p-3 pl-[13px] pr-[13px] flex items-center justify-center gap-3">
                                <img src={usaflag} className="h-5 w-[2.1em]" alt="USA Flag" />
                                <p>+1</p>
                            </div>
                            <Input
                                label=""
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Add phone number"
                                className="!w-[37em] bg-[#ECECEC]"
                            />
                        </div>
                    </div>
                    <div className='flex gap-[6em]'>
                        <div className='mt-3'>
                            <Input
                                label="Last Four Digits Of SSN"
                                type="text"
                                value={ssn}
                                onChange={(e) => setSSN(e.target.value)}
                                placeholder="XXXX"
                                className="bg-[#ECECEC] !w-[132%]"
                            />
                        </div>
                        <div className='mt-3'>
                            <Input
                                label="Emergency Contact"
                                type="text"
                                value={emergencyContact}
                                onChange={(e) => setEmergencyContact(e.target.value)}
                                placeholder="XXXX-XXXX-XXXX"
                                className="bg-[#ECECEC] !w-[132%]"
                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="bg-gray-100 p-3 rounded-lg text-center">
                            <p className="text-sm font-medium mb-2">Front ID Card</p>
                            <div className="relative">
                                <img src={frontIDImage} alt="Front ID" className="h-28 mx-auto rounded-md" />
                                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageChange(e, 'front')} />
                            </div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg text-center">
                            <p className="text-sm font-medium mb-2">Back ID Card</p>
                            <div className="relative">
                                <img src={backIDImage} alt="Back ID" className="h-28 mx-auto rounded-md" />
                                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageChange(e, 'back')} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-700 text-white mt-6 py-3 rounded-full font-semibold">
                        Update Profile
                    </button>

                </form>

                {showSuccess && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
                                <FaCheck size={30} />
                            </div>
                            <h2 className="font-semibold text-lg mb-1">Request Accepted!</h2>
                            <p className="text-sm text-gray-600">
                                The tenant has accepted your request and now you have access to view this file.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditProfileModal;
