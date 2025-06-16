import React, { useState } from "react";
import Propertydetails from "../../assets/addproperty/Propertydetails.png";
import Stripeaccount from "../../assets/addproperty/Stripeaccount.png";
import Uniquepropertycode from "../../assets/addproperty/Uniquepropertycode.png";
import Inspectiondetails from "../../assets/addproperty/Inspectiondetails.png";
import line from "../../assets/addproperty/Line.png";
import Stripe from "../../assets/addproperty/Stripe.png"
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import Modal from "../../components/global/Modal";
import Addmorepropertymodal from "../../components/global/Addmorepropertymodal";
import { useNavigate } from "react-router";

const AddPropertyDetail = () => {
    const [step, setStep] = useState(1);
    const [propertyName, setPropertyName] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [rentAmount, setRentAmount] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [lateFeePolicy, setLateFeePolicy] = useState("");
    const [mediaFiles, setMediaFiles] = useState([]);
    const [documentFiles, setDocumentFiles] = useState([]);
    const [accountholderName, setAccountholderName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [showStripeForm, setShowStripeForm] = useState(false);
    const [isStripeLinked, setIsStripeLinked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate("");
    const [propertymedia, setPropertyMedia] = useState([]);


    const modalData = {
        title: "Add More Properties",
        description: "Do you manage more rental properties? Add them now to streamline your experience.",
        iconBgColor: "bg-blue-500",
        actionText: "Add Another Property",
        actionTextTwo: "Finish for now",
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const steps = [
        { img: Propertydetails, label: "Property Details" },
        { img: Inspectiondetails, label: "Inspection Details" },
        { img: Uniquepropertycode, label: "Unique Property Code" },
        { img: Stripeaccount, label: "Stripe Account" },
    ];

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imagesAndVideos = files.filter(file =>
            file.type.startsWith("image/") || file.type.startsWith("video/")
        );
        const documents = files.filter(file =>
            file.type === "application/pdf"
        );

        setMediaFiles([...mediaFiles, ...imagesAndVideos]);
        setDocumentFiles([...documentFiles, ...documents]);
    };

    const removeMedia = (index) => {
        setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    };

    const removeDocument = (index) => {
        setDocumentFiles(documentFiles.filter((_, i) => i !== index));
    };


const handleUploadPropertyimage = (e) => {
  const files = Array.from(e.target.files);
  const images = files.filter(file => file.type.startsWith("image/"));
  setPropertyMedia(prev => [...prev, ...images]);
};

const removeMedias = (index) => {
  setPropertyMedia(prev => prev.filter((_, i) => i !== index));
};


    return (
        <div className="min-h-screen bg-[#ecf3fd] py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-3">
                    {step > 1 && (
                        <button type="button" onClick={prevStep}>
                            <FaArrowLeft size={20} />
                        </button>
                    )}
                    <h2 className="text-3xl font-semibold text-gray-900">Add Property Details</h2>

                </div>

                {/* Step Navigation */}
                <div className="flex justify-between items-center mt-12 text-center mx-12">
                    {steps.map((stepItem, index) => (
                        <div className="flex flex-col items-center" key={index}>
                            <img src={stepItem.img} className="h-8 mb-2" alt={stepItem.label} />
                            <span className={`text-sm font-medium ${step >= index + 1 ? "text-black" : "text-gray-500"}`}>
                                {stepItem.label}
                            </span>
                            <div
                                className={`mt-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-10 ${step >= index + 1
                                    ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white"
                                    : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {index + 1}
                            </div>
                        </div>
                    ))}

                </div>

                <div className="mx-24 mt-[-1em]">
                    <img src={line} className="h-[3px] w-full" alt="step-line" />
                </div>

                {/* Step Content */}
                {step === 1 && (
                    <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-6">Upload Images</h3>
                        <div className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 text-center cursor-pointer block">
                            <label htmlFor="fileUpload" className="rounded-lg p-10 text-center cursor-pointer">
                                <p className="text-black">Upload “Property Images”</p>
                                <p className="text-sm text-gray-400">Up to 20MB • JPG, PNG</p>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept="image/*"
                                    multiple
                                    onChange={handleUploadPropertyimage}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {propertymedia.map((file, index) => (
                                <div key={index} className="relative w-28 h-28 rounded overflow-hidden">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <button
                                        className="absolute top-1 right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
                                        onClick={() => removeMedias(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>


                        {/* Form Fields */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="w-full">
                                <label className="block mb-1 text-sm font-medium text-gray-700">Property Name</label>
                                <input type="text" placeholder="Place holder goes here" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="w-full">
                                <label className="block mb-1 text-sm font-medium text-gray-700">Property Type</label>
                                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select Dropdown</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="House">House</option>
                                    <option value="Villa">Villa</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                            <textarea placeholder="Place holder goes here" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-2xl"></textarea>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Address */}
                            <div>
                                <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    placeholder="Enter address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    placeholder="Enter city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label htmlFor="state" className="block mb-1 text-sm font-medium text-gray-700">
                                    State
                                </label>
                                <input
                                    id="state"
                                    type="text"
                                    placeholder="Enter state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Zip Code */}
                            <div>
                                <label htmlFor="zipCode" className="block mb-1 text-sm font-medium text-gray-700">
                                    Zip Code
                                </label>
                                <input
                                    id="zipCode"
                                    type="text"
                                    placeholder="Enter zip code"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Rent Amount */}
                            <div>
                                <label htmlFor="rentAmount" className="block mb-1 text-sm font-medium text-gray-700">
                                    Rent Amount
                                </label>
                                <input
                                    id="rentAmount"
                                    type="text"
                                    placeholder="Enter rent amount"
                                    value={rentAmount}
                                    onChange={(e) => setRentAmount(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Due Date */}
                            <div>
                                <label htmlFor="dueDate" className="block mb-1 text-sm font-medium text-gray-700">
                                    Due Date
                                </label>
                                <input
                                    id="dueDate"
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Late Fee Policy (Optional) */}
                            <div>
                                <label htmlFor="lateFeePolicy" className="block mb-1 text-sm font-medium text-gray-700">
                                    Late Fee Policy (Optional)
                                </label>
                                <input
                                    id="lateFeePolicy"
                                    type="text"
                                    placeholder="e.g., $25 after 5 days"
                                    value={lateFeePolicy}
                                    onChange={(e) => setLateFeePolicy(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Deposit Amount */}
                            <div>
                                <label htmlFor="depositAmount" className="block mb-1 text-sm font-medium text-gray-700">
                                    Deposit Amount
                                </label>
                                <input
                                    id="depositAmount"
                                    type="text"
                                    placeholder="Enter deposit amount"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>


                        <div className="mt-8 flex items-center justify-center gap-3">
                            <button onClick={nextStep} className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium">Next</button>
                            <button className="px-[10em] py-3 rounded-full bg-gray-200 text-gray-700 font-medium">Skip</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
                        <p className="text-black pb-6">
                            Document the condition of your rental property to ensure a smooth leasing experience.
                            Upload photos or videos for each area of the property.
                        </p>

                        {/* Upload Box */}
                        <div className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 text-center cursor-pointer block">
                            <label
                                htmlFor="fileUpload"
                                className=" rounded-lg p-10 text-center cursor-pointer"
                            >
                                <p className="text-black">Upload “Documents”</p>
                                <p className="text-sm text-gray-400">Upto 20mbps PDF, JPG, PNG</p>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept="image/*,video/*,application/pdf"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>


                        {/* Media Preview */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {mediaFiles.map((file, index) => (
                                <div key={index} className="relative w-28 h-28 rounded overflow-hidden">
                                    {file.type.startsWith("image/") ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-full h-full object-cover rounded"
                                        />
                                    ) : (
                                        <video
                                            src={URL.createObjectURL(file)}
                                            className="w-full h-full object-cover rounded"
                                            controls
                                        />
                                    )}
                                    <button
                                        className="absolute top-1 right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
                                        onClick={() => removeMedia(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Document List */}
                        <div className="mt-6 flex flex-col gap-3">
                            {documentFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
                                >
                                    <div className="flex items-center gap-2">
                                        <img src={pdfIcon} alt="pdf" className="w-5 h-5" />
                                        <p className="text-sm">{file.name}</p>
                                    </div>
                                    <button
                                        onClick={() => removeDocument(index)}
                                        className="text-gray-600 text-lg"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <button
                                onClick={prevStep}
                                className="px-[10em] py-3 rounded-full bg-gray-200 text-gray-700 font-medium"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}


                {step === 3 && (
                    <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
                        <p className="text-black pb-6 text-2xl font-[500]">Here is the unique property code for your rental unit.</p>
                        <div>
                            <p className="text-4xl text-blue-600 font-[600] tracking-[14px]">123456</p>
                        </div>
                        <p className="text-black pb-3 pt-6">Each property is assigned a unique code that tenants will use to link their accounts to this property. Share this code securely with your tenants to ensure they can access and manage the property details.</p>


                        <div className="mt-8 flex items-center justify-center gap-3">
                            <button onClick={nextStep} className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium">Next</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
                        {!showStripeForm ? (
                            // === Step 1: Connect your Stripe Account screen ===
                            <>
                                <p className="text-black pb-6 text-2xl font-[500]">Connect Your Stripe Account</p>
                                <p>
                                    To securely manage deposit transactions, refunds, and deductions, you need to link your
                                    Stripe account. This ensures smooth handling of funds held in escrow.
                                </p>

                                <div
                                    className="bg-white rounded-2xl p-4 flex items-center justify-between w-[30em] mt-6 mb-6 cursor-pointer"
                                    onClick={() => setShowStripeForm(true)}
                                >
                                    <div className="flex items-center gap-2">
                                        <img src={Stripe} className="h-7 w-10" alt="Stripe Logo" />
                                        <p className="font-[500]">Stripe</p>
                                    </div>
                                    <FaChevronRight />
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-3">
                                    <button
                                        onClick={nextStep}
                                        disabled
                                        className="px-[10em] py-3 rounded-full bg-[#E7E7E8] text-slate-400 font-medium"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : !isStripeLinked ? (
                            // === Step 2: Stripe Form ===
                            <>
                                <p className="text-black pb-6 text-2xl font-[500]">Add Stripe Account</p>
                                <p>
                                    You can update your Stripe account to manage deposit transactions.
                                    <br />
                                    Note: Without a linked account, you cannot process tenant deposits or deductions.
                                </p>

                                <div className="pt-10 w-[38em]">
                                    <div>
                                        <label htmlFor="accountholderName" className="block mb-2 text-sm font-medium text-gray-700">
                                            Account Holder’s Name
                                        </label>
                                        <input
                                            id="accountholderName"
                                            type="text"
                                            placeholder="Enter Account Holder’s Name"
                                            value={accountholderName}
                                            onChange={(e) => setAccountholderName(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="pt-3 pb-3">
                                        <label htmlFor="accountNumber" className="block mb-2 text-sm font-medium text-gray-700">
                                            Account Number
                                        </label>
                                        <input
                                            id="accountNumber"
                                            type="tel"
                                            placeholder="Enter Account Number"
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="routingNumber" className="block mb-2 text-sm font-medium text-gray-700">
                                            Routing Number
                                        </label>
                                        <input
                                            id="routingNumber"
                                            type="tel"
                                            placeholder="Enter Routing Number"
                                            value={routingNumber}
                                            onChange={(e) => setRoutingNumber(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => setIsStripeLinked(true)}
                                        className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
                                    >
                                        Save
                                    </button>
                                </div>
                            </>
                        ) : (
                            // === Step 3: Confirmation ===
                            <>
                                <p className="text-black pb-6 text-2xl font-[500]">
                                    Your Stripe account is now linked. You are ready to manage deposits, refunds, and<br></br> deduction securely.
                                </p>
                                <div
                                    className="bg-white rounded-2xl p-4 flex items-center justify-between w-[30em] mt-6 mb-6 cursor-pointer"
                                >
                                    <p className="font-[500]">**** **** **** *485</p>
                                    <img src={Stripe} className="h-7 w-10" alt="Stripe Logo" />
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}

                        <Modal
                            isOpen={showModal}
                            onClose={() => {
                                setShowModal(false)
                                setModalOpen(true)
                            }
                            }
                            data={{
                                title: "Property Added!",
                                description: "Your property has been added successfully.",
                                iconBgColor: "bg-blue-600", // Optional

                            }}
                        />
                        <Addmorepropertymodal
                            isOpen={modalOpen}
                            onAction={() => {
                                setStep(1);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setModalOpen(false);
                            }}
                            onSecondaryAction={() => {
                                console.log("Continue Clicked");
                                setModalOpen(false);
                            }}
                            data={modalData}
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

export default AddPropertyDetail;
