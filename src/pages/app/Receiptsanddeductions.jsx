import React from 'react';
import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import invoice from "../../assets/invoice.png"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useLocation } from 'react-router';



const Receiptsanddeductions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, description, date, amount, files } = location.state || {};

    return (
        <div className="min-h-screen bg-[#F6FAFF] text-[#333]">
            <Header />

            <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20">
                {/* Back + Heading */}
                <div className="flex items-center gap-3 mb-6">
                    <button type="button" onClick={() => navigate(-1)} className="text-gray-700 hover:text-black">
                        <FaArrowLeft size={20} />
                    </button>
                    <h1 className="text-3xl font-semibold">Receipts and Deductions</h1>
                </div>

                {/* Details Box */}
                <div className="bg-white shadow-md rounded-xl p-6 mb-10">
                    <div className="">
                        <div className='flex items-center justify-between border-b-[1px] pb-1 border-slate-200'>
                            <h2 className="text-[15px] text-black font-[500] pt-3">Title</h2>
                            <p className="text-[14px] font-[500] ">{title}</p>
                        </div>
                        <div className='flex items-center justify-between border-b-[1px] pb-1 border-slate-200'>
                            <h2 className="text-[15px] text-black font-[500] pt-3">Date</h2>
                            <p className="text-[14px] font-[500]">{date}</p>
                        </div>
                        <div className='flex items-center justify-between border-b-[1px] pb-1 border-slate-200'>
                            <h2 className="text-[15px] text-black font-[500] pt-3">Deduction Amount</h2>
                            <p className="text-[14px] font-[500] text-red-600">{amount}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-[15px] text-black font-[500] pt-3">Description</h2>
                        <p className="text-sm text-gray-700 pt-1">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Uploaded Files Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Uploaded File</h2>
                    <PhotoProvider>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                            {files?.map((file, index) => (
                                <PhotoView key={index} src={file}>
                                    <img
                                        src={file}
                                        alt={`Invoice ${index + 1}`}
                                        className="rounded-lg w-full h-[200px] object-contain cursor-pointer border border-gray-200 bg-white shadow-sm"
                                    />
                                </PhotoView>
                            ))}

                        </div>
                    </PhotoProvider>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Receiptsanddeductions;
