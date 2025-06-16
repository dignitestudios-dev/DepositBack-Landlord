import React, { useState } from 'react';
import logo from "../../assets/mainlogowhite.png";
import { IoNotificationsOutline } from 'react-icons/io5';
import user from "../../assets/user.png";
import { useNavigate } from 'react-router';

const Header = () => {
    const navigate = useNavigate("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userPopup, setUserPopup] = useState(false);

    const togglePopup = () => {
        if (userPopup) setUserPopup(false);
        setIsPopupOpen(!isPopupOpen);
    };

    const toggleUserpopup = () => {
        if (isPopupOpen) setIsPopupOpen(false)
        setUserPopup(!userPopup);
    };

    const notifications = [
        {
            title: "View Request Accepted",
            time: "7:30 PM",
            message: "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
            unreadCount: 1
        },
        {
            title: "Lease Date Dispute Received",
            time: "7:30 PM",
            message: "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
            unreadCount: 1
        },
        {
            title: "Tenant Moved Out",
            time: "7:30 PM",
            message: "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
            unreadCount: 0
        },
        {
            title: "Title goes here",
            time: "7:30 PM",
            message: "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
            unreadCount: 0
        }
    ];

    return (
        <div className='bg-gradient-to-r from-[#003897] to-[#0151DA] flex justify-between items-center rounded-3xl px-[6em] py-4 shadow-md ml-[1em] mr-[1em] mt-[1em]'>
            {/* Logo */}
            <div className='flex items-center'>
                <img src={logo} className='h-[4.4em] w-auto' alt="Company Logo" />
            </div>

            {/* Navigation and User Section */}
            <div className='flex items-center gap-6'>
                {/* Navigation Links */}
                <ul className='flex text-white gap-6 text-sm font-medium'>
                    <li className='hover:underline cursor-pointer'>Home</li>
                    <li className='hover:underline cursor-pointer'>Tenant Requests</li>
                    <li className='hover:underline cursor-pointer'>Resources</li>
                    <li className='hover:underline cursor-pointer'>Messages</li>
                </ul>

                {/* Notification Icon with Popup toggle */}
                <div className="relative">
                    <IoNotificationsOutline
                        className='text-white text-2xl cursor-pointer'
                        onClick={togglePopup}
                    />
                    {/* Notification Popup */}
                    {isPopupOpen && (
                        <div className="absolute top-12 z-10 right-0 w-[26em] p-4 bg-white shadow-lg rounded-lg border border-slate-200">
                            <h3 className="text-lg font-semibold">Notifications</h3>
                            <div className="mt-4 space-y-4">
                                {notifications.map((notification, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">{notification.title}</span>
                                            <span className="text-[13px] font-medium">{notification.time}</span>
                                        </div>
                                        <div className='flex justify-between items-center pt-1 pb-1'>
                                            <p className='text-[13px] mr-[3em]'>{notification.message}</p>
                                            {notification.unreadCount > 0 && (
                                                <span className="text-sm bg-red-600 h-5 w-8 items-center flex justify-center text-white rounded-full">
                                                    {notification.unreadCount}
                                                </span>
                                            )}
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* User Avatar */}
                <img src={user} className='h-10 w-10 rounded-full object-cover cursor-pointer' alt="User Avatar" onClick={toggleUserpopup} />

                {userPopup && (
                    <div className="absolute top-[6em] right-10 w-[9em] p-4 bg-white shadow-lg rounded-lg border border-slate-200">
                        <div className="space-y-3">
                            <span className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer">View Profile</span>
                            <span className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer">Subscription Plans</span>
                            <span className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer">Settings</span>
                            <span onClick={()=>{
                                navigate("/auth/login")
                            }} className="block text-[12px] font-[500] text-red-600 hover:text-red-700 cursor-pointer">Log Out</span>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Header;
