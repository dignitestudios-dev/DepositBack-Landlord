import React, { useState } from 'react';
import { LuMapPin } from 'react-icons/lu';
import Footer from '../../components/global/Footer';
import Header from '../../components/global/Header';
import imageone from "../../assets/propertydetail/home one.webp";
import imagetwo from "../../assets/propertydetail/home two.webp";
import imagethree from "../../assets/propertydetail/home three.webp";
import imagefour from "../../assets/propertydetail/home four.webp";
import imagefive from "../../assets/propertydetail/home five.webp";
import { FaArrowLeft, FaChevronRight, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { RiDeleteBinFill, RiEdit2Fill } from 'react-icons/ri';
import user from "../../assets/user.png"
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import backimage from "../../assets/propertydetail/back.png";
import { IoIosWarning } from 'react-icons/io';
import { BsChevronRight } from 'react-icons/bs';
import Modal from '../../components/global/Modal';
import ImageGallery from '../../components/app/ImageGallery';


const PropertyDetail = () => {
    const navigate = useNavigate("");
    const [showModal, setShowModal] = useState(false);
    const images = [imagetwo, imageone, imagefive, imagethree, imagefour];

    console.log(imageone)

console.log(images,"This is Images");
    return (
        <div className="min-h-screen bg-[#f6f9ff] p-3">
            <Header />
            <div className="max-w-[1260px] mx-auto pt-10">
                <div className="flex justify-between items-center mb-6">
                    <div className='flex gap-3'>
                        <button type="button" onClick={() => navigate(-1)} >
                            <FaArrowLeft size={18} />
                        </button>
                        <h1 className="text-[26px] font-[600]">Property Details <span className="ml-2 px-3 py-1 text-sm font-normal bg-green-500 text-white rounded-full">Active</span></h1>

                    </div>
                    <div className="flex gap-4">
                        <button className="bg-[#FF3B30] text-white flex items-center gap-3 rounded-3xl px-4 py-2  font-medium"><RiDeleteBinFill />
                            Delete</button>
                        <button className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white flex items-center gap-3 rounded-3xl px-4 py-2 font-medium"><RiEdit2Fill />
                            Edit</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 bg-white p-6 rounded-2xl">
                     

                    {/* Main Image */}
                    <div className="md:col-span-2">
                        <div className="flex flex-col md:flex-row gap-4">
 <ImageGallery images={images} />
                            {/* Left - Large Image */}
                            

                            {/* Right - 4 Smaller Images in 2x2 Grid */}
                           

                        </div>
                    </div>
                    <div className="bg-white p-6 w-[44em]">
                        <div className='flex justify-between'>
                            <h2 className="!text-3xl font-semibold mb-2">Property Name</h2>
                            <div>
                                <span className="text-[#0151DA] font-[600] ml-4 text-2xl">$1200</span> <span className="text-sm font-medium text-gray-400">/month</span>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2 font-[500]"><LuMapPin className="mr-1" /> 456 Maple Street, Anytown, NY 12345</div>
                        <p className="text-1xl font-[500] text-gray-600 mb-2">Unique Code: <span className="text-blue-600 font-medium">258496</span></p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 border-t pt-3 border-b pb-3">
                            <p className='border-r'><span className='font-[500] text-black text-[14px]'>Lease Start Date:</span><br /> 01-01-2024</p>
                            <p><span className='font-[500] text-black text-[14px]'>Lease End Date:</span><br /> 31-12-2024</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="!text-[20px] font-[500] mb-2">Description</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui. Curabitur ut libero non justo pellentesque sollicitudin. Nulla mauris est, venenatis et volutpat sit amet, efficitur sit amet lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui.
                            </p>
                            <p className="mt-3 text-sm text-black">

                                <span className='font-[600]'>Rent Due Date:</span>  1st Of Each Month

                            </p>
                            <p className="text-sm text-black">

                                <span className='font-[600]'>Late Fee:</span>  5% Of Rent


                            </p>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-[500] text-gray-800 mb-1">More Contacts</h3>
                            <ul className="text-sm text-gray-700">
                                <li>Mike Smith <div className='flex items-center gap-3'><FaPhoneAlt color='#003897' size={12} /> +1 834 0570 746
                                </div> </li>
                                <li className='pt-2 pb-2'>Mike Smith <div className='flex items-center gap-3'><FaPhoneAlt color='#003897' size={12} /> +1 834 0570 746
                                </div> </li>
                                <li>Mike Smith <div className='flex items-center gap-3'><FaPhoneAlt color='#003897' size={12} /> +1 834 0570 746
                                </div> </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tenant Sidebar */}
                    <div className="bg-[#F3F8FF] w-[30em] rounded-2xl p-6">
                        <div
                            style={{ backgroundImage: `url(${backimage})` }}
                            className="bg-cover bg-center rounded-3xl pl-3 pr-3 pt-3 pb-3 text-white"
                        >
                            <div className="flex gap-3 justify-between pt-3">
                                <div className="flex gap-3">
                                    <img src={user} className="h-[3.3em] w-[3.3em] rounded-full object-cover cursor-pointer" alt="User Avatar" />
                                    <div>
                                        <span className="text-1xl font-[500]">Mike Smith</span>
                                        <p className="text-sm text-white">Tenant</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-[#fff] p-3 rounded-xl">
                                        <IoChatbubbleEllipsesOutline size={20} color="blue" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm text-white mb-4 mt-3 ml-3">
                                <div className='flex justify-start gap-3'>
                                    <p className='flex gap-2 items-center'><FaEnvelope />
                                        mikesmith@gmail.com</p>
                                    <p className='flex gap-2 items-center'><FaPhoneAlt />
                                        +1 834-0570-746</p>
                                </div>

                                <p className='flex gap-2 items-center mt-2'><IoIosWarning />
                                    Emergency: +1 658 5570 756</p>
                            </div>
                        </div>



                        <div className=" pt-4 text-sm">
                            <h5 className="font-[500] text-black mb-2">Rent Activity</h5>
                            <div className='bg-white rounded-2xl p-3 leading-8'>
                                <p className='flex justify-between font-[500]'>Current Month: <p>June 2025</p> </p>
                                <p className='flex justify-between font-[500]'>Amount Due: <p>$1200</p> </p>
                                <p className='flex justify-between font-[500]'>Due Date: <p>June 1, 2025</p> </p>
                                <p className='flex justify-between font-[500]'>Payment Status:  <span className="text-yellow-500 font-medium rounded-3xl pl-[1em] pr-[1em] bg-[#FF950040]">Pending</span></p>
                                <div className='flex justify-between gap-3 pt-3 pb-3'>
                                    <button className="w-full mt-3 bg-gradient-to-r from-[#003897] to-[#0151DA] text-white py-2 rounded-3xl font-semibold" onClick={()=>{
                                        setShowModal(true)
                                    }}>Send Reminder</button>
                                    <button className="w-full mt-2 bg-gray-100 text-black py-2 rounded-3xl font-semibold" onClick={()=>{
                                        navigate("/app/rent-history")
                                    }} >View History</button>
                                </div>
                            </div>

                            <Modal
                                isOpen={showModal}
                                onClose={() => setShowModal(false)}
                                onAction={() => {
                                    setShowModal(false);
                                    navigate("/auth/login");
                                }}
                                data={{
                                    title: "Reminder Sent!",
                                    description: "Reminder of rent due has been sent to the tenant.",
                                  
                                    iconBgColor: "bg-blue-600", // Optional
                                }}
                            />



                        </div>
                        <div className="border-t pt-4 mt-4 cursor-pointer">
                            <h5 className="font-[500] text-black mb-2">Property Documentation</h5>
                            <div>
                                <div onClick={()=>{
                                    navigate("/app/documents")
                                }} className='bg-white flex justify-between rounded-2xl p-3 items-center mb-3'>
                                    <button className='font-[500]'>Documents</button><br />
                                    <BsChevronRight />
                                </div>

                                <div className='bg-white flex justify-between rounded-2xl p-3 items-center mb-3' onClick={()=>{
                                    navigate("/app/inspection");
                                }}>
                                    <button className='font-[500]'><a href="#">Inspection (Move in/Move out)</a></button><br />
                                    <BsChevronRight />
                                </div>

                                <div className='bg-white flex justify-between rounded-2xl p-3 items-center' onClick={()=>{
                                    navigate("/app/deposit-tracker");
                                }}>
                                    <button className='font-[500]'>Deposit Tracker</button><br />
                                    <BsChevronRight />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PropertyDetail;
