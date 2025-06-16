import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Modal from '../../components/global/Modal';
import { useState } from 'react';

const RentHistory = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    
    const rentData = [
        { date: 'Jan 1, 2025', status: 'Received', amount: '$1200.00' },
        { date: 'Feb 1, 2025', status: 'Received', amount: '$1260.00' },
        { date: 'Mar 1, 2025', status: 'Received', amount: '$1200.00' },
        { date: 'Apr 1, 2025', status: 'Received', amount: '$1260.00' },
        { date: 'May 1, 2025', status: 'Received', amount: '$1200.00' },
        { date: 'Jun 1, 2025', status: 'Received', amount: '$1260.00' },
        { date: 'Jul 1, 2025', status: 'Received', amount: '$1200.00' },
        { date: 'Aug 1, 2025', status: 'Received', amount: '$1200.00' },
        { date: 'Sep 1, 2025', status: 'Received', amount: '$1260.00' },
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#F6FAFF] p-6 text-[#333]">
                <div className="max-w-[1260px] mx-auto">
                    <div className='flex gap-3 items-center mb-10 pt-3'>
                        <button type="button" onClick={() => navigate(-1)} >
                            <FaArrowLeft size={20} />
                        </button>
                        <h1 className="text-3xl font-[600]">Rent History</h1>
                    </div>


                    <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                        <div className="flex justify-between">
                            <div className='w-full'>
                                <div className='flex items-center justify-between'>
                                    <p className="text-black font-[500] text-[16px]">Total Paid</p>
                                    <p className="text-lg ">$7200</p>
                                </div>
                                <div className='flex items-center justify-between pt-2 pb-2'>
                                    <p className="text-black font-[500] text-[16px]">Upcoming Rent Due</p>
                                    <p className="text-lg ">$1200 on July 1, 2025</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className="text-black font-[500] text-[16px]">Payment Status</p>
                                    <span className="bg-yellow-100 text-yellow-600 font-medium text-sm px-4 py-1 rounded-full">Pending</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-4 divide-y">
                        {rentData.map((entry, idx) => (
                            <div key={idx} className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center pl-3 pr-3">
                                <p className="text-sm font-[400] text-gray-700">{entry.date}</p>
                                <p className="text-sm text-gray-600">{entry.status}</p>
                                <p className="text-sm text-gray-900 font-[500]">{entry.amount}</p>
                                <a href="#" className="text-sm text-blue-600 font-medium hover:underline">View Invoice</a>
                            </div>
                        ))}
                    </div>

                    <div className="text-left mt-6">
                        <button onClick={() => {
                            setShowModal(true)
                        }} className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-medium px-[4em] py-2 rounded-full hover:bg-[#002f7a] transition">Send Reminder To Tenant</button>
                    </div>

                    <Modal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        
                        data={{
                            title: "Reminder Sent!",
                            description: "Reminder of rent due has been sent to the tenant.",

                            iconBgColor: "bg-blue-600", // Optional
                        }}
                    />


                </div>
            </div>
            <Footer />
        </>

    );
};

export default RentHistory;