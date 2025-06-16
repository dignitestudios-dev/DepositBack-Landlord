import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';
import pdfIcon from '../../assets/pdficon.png';
import SearchBar from '../../components/global/Searchbar';
import { useNavigate } from 'react-router';

const Resources = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate("");

    const documents = [
        { id: 1, title: 'Tenant Rights' },
        { id: 2, title: 'Security Deposit Laws' },
        { id: 3, title: 'Eviction Process' },
        { id: 4, title: 'Protection Laws' },
        { id: 5, title: 'Lease Termination' },
        { id: 6, title: 'Maintenance Laws' },
    ];

    const filteredDocs = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F6FAFF] text-[#333]">
            <Header />

            <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20">
                {/* Header */}
                <div className="flex justify-between mb-6">
                    <div className='flex items-center gap-4'>
                        <button className="text-gray-600" onClick={()=>{
                            navigate("/app/dashboard")
                        }}>
                            <FaArrowLeft size={20} />
                        </button>
                        <h1 className="text-3xl font-[600]">Resources</h1>
                    </div>
                    <div>
                        <SearchBar className='' placeholder="Search" />
                    </div>
                </div>



                {/* Documents Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filteredDocs.map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-white rounded-xl p-6 text-center shadow cursor-pointer hover:shadow-md transition"
                        >
                            <img src={pdfIcon} alt="PDF Icon" className="h-[70px] mx-auto" />
                            <p className="mt-4 font-medium text-sm">{doc.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Resources;