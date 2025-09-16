import { useState } from "react";
import { LuMapPin } from "react-icons/lu";

import { FaArrowLeft, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router";
import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import backimage from "../../assets/propertydetail/back.png";
import { IoIosWarning, IoMdCheckmark } from "react-icons/io";
import { BsChevronRight } from "react-icons/bs";
import Modal from "../../components/global/Modal";
import ImageGallery from "../../components/app/ImageGallery";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import { TiWarning } from "react-icons/ti";
import DeleteModal from "../../components/app/propertyDetail/DeleteModal";

const PropertyDetail = () => {
  const navigate = useNavigate("");
  const { id } = useParams();
  const location = useLocation();
  const propertyDetail = location.state?.propertyDetail;
  console.log("🚀 ~ PropertyDetail ~ propertyDetail:", propertyDetail);

  const [showModal, setShowModal] = useState(false);
  const [remindLoading, setRemindLoading] = useState(false);
  const [leaseDuration, setLeaseDuration] = useState(false);
  const [confirmLeaseDate, setConfirmLeaseDate] = useState(false);
  const [rejectedRequestModal, setRejectedRequestModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isDelete, setIsDelete] = useState(false);

  //   const images = [imagetwo, imageone, imagefive, imagethree, imagefour];
  const [leaseStart, setLeaseStart] = useState("");
  const [leaseEnd, setLeaseEnd] = useState("");
  const [error, setError] = useState("");

  const handleLeaseStartChange = (e) => {
    const value = e.target.value;
    setLeaseStart(value);
    setError("");

    // Reset end date if it becomes invalid
    if (leaseEnd && new Date(value) >= new Date(leaseEnd)) {
      setLeaseEnd("");
    }
  };

  const handleLeaseEndChange = (e) => {
    const value = e.target.value;
    setLeaseEnd(value);

    if (leaseStart && value) {
      const start = new Date(leaseStart);
      const end = new Date(value);

      // Calculate month difference
      const monthDiff =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

      if (monthDiff < 1) {
        setError("Lease end date must be at least 1 month after start date.");
      } else {
        setError("");
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/properties/${id}`);
      if (response.status === 200) {
        setIsDelete(false);
        SuccessToast("Deleted");
        navigate("/app/dashboard");
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    }
  };

  const handleReminder = async () => {
    try {
      setRemindLoading(true);
      const response = await axios.post(
        `/properties/rent/reminder/${contract}`
      );
      if (response.status === 200) {
        setShowModal(true);
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setRemindLoading(false);
    }
  };

  const handleLeaseConfirm = () => {
    if (!leaseStart || !leaseEnd) {
      setError("Please select both lease start and lease end dates.");
      return;
    }

    setError(""); // clear any old error
    setLeaseDuration(false);
    setConfirmLeaseDate(true);
  };

  const handleLeaseSubmit = async (status) => {
    try {
      const today = new Date().toISOString().split("T")[0] + "T00:00:00.000Z";

      const payload = {
        leaseStartDate: leaseStart
          ? new Date(leaseStart).toISOString().split("T")[0] + "T00:00:00.000Z"
          : today,
        leaseEndDate: leaseEnd
          ? new Date(leaseEnd).toISOString().split("T")[0] + "T00:00:00.000Z"
          : today,
      };
      setLoading(true);
      const response = await axios.post(
        `properties/leaseUpdate/${id}`,
        payload
      );
      if (response.status === 200) {
        if (status === "approved") {
          setLeaseStart("");
          setLeaseEnd("");
          setConfirmLeaseDate(false);
          SuccessToast("Lease Date Updated");
        } else {
          setRejectedRequestModal(true);
        }
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const {
    name,
    rent,
    address,
    allowedDocs,
    uniquePropertyCode,
    leaseStartDate,
    leaseEndDate,
    description,
    rentDueDate,
    lateFeeAmount,
    contactPersons,
    images,
    tenant,
    paymentStatus,
    landlordAgreements,
    landlordPropertyConditionImages,
    landlordPropertyConditionVideos,
    landlordRules,
    tenantMoveInImages,
    tenantMoveInVideos,
    tenantMoveOutImages,
    tenantMoveOutVideos,
    tenantRepairsVideos,
    tenantRepairsImages,
    tenantAgreements,
    uvLightImages,
    depositTracker,
    contract,
    isLeaseDateConfirmed,
    isLeaseDateResolved,
  } = propertyDetail;
  console.log("🚀 ~ PropertyDetail ~ tenant:", tenant);

  return (
    <div className="max-w-[1260px] mx-auto pt-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft size={18} />
          </button>
          <h1 className="text-[26px] font-[600]">
            Property Details{" "}
            <span
              className={`l-2 px-3 py-1 text-sm font-normal ${
                tenant ? "bg-green-500" : "bg-red-500"
              } text-white rounded-full`}
            >
              {tenant ? "Active" : "Inactive"}
            </span>
          </h1>
        </div>
        <div className="flex gap-4">
          {tenant ? (
            <></>
          ) : (
            <>
              <button
                onClick={() => setIsDelete(true)}
                className="bg-[#FF3B30] text-white flex items-center gap-3 rounded-3xl px-4 py-2  font-medium"
              >
                <RiDeleteBinFill />
                Delete
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(`/app/edit-property`, {
                    state: { propertyDetail },
                  });
                }}
                className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white flex items-center gap-3 rounded-3xl px-4 py-2 font-medium"
              >
                <RiEdit2Fill />
                Edit
              </button>
            </>
          )}
          {!isLeaseDateConfirmed && (
            <button
              type="button"
              onClick={() => setLeaseDuration(true)}
              className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white flex items-center gap-3 rounded-3xl px-4 py-2 font-medium"
            >
              {/* <RiEdit2Fill /> */}
              Update Lease Date
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 bg-white p-6 rounded-2xl">
        {/* Main Image Gallery */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-4">
            <ImageGallery images={images} />
          </div>
        </div>

        {/* Property Details Section */}
        <div className="bg-white p-6 w-[44em]">
          <div className="flex justify-between">
            <h2 className="!text-3xl font-semibold mb-2">{name}</h2>
            <div>
              <span className="text-[#0151DA] font-[600] ml-4 text-2xl">
                ${rent}
              </span>{" "}
              <span className="text-sm font-medium text-gray-400">/month</span>
            </div>
          </div>
          <div className="flex items-center text-gray-600 mb-2 font-[500]">
            <LuMapPin className="mr-1" /> {address}
          </div>
          <p className="text-1xl font-[500] text-gray-600 mb-2">
            Unique Code:{" "}
            <span className="text-blue-600 font-medium">
              {uniquePropertyCode}
            </span>
          </p>

          {tenant && (
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 border-t pt-3 border-b pb-3">
              <p className="border-r">
                <span className="font-[500] text-black text-[14px]">
                  Lease Start Date:
                </span>
                <br /> {new Date(leaseStartDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-[500] text-black text-[14px]">
                  Lease End Date:
                </span>
                <br /> {new Date(leaseEndDate).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="mt-4">
            <h3 className="!text-[20px] font-[500] mb-2">Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {description}
            </p>
            <p className="mt-3 text-sm text-black">
              <span className="font-[600]">Rent Due Date:</span>{" "}
              {rentDueDate
                ? `Day ${rentDueDate} of each month`
                : "Not specified"}
            </p>
            <p className="text-sm text-black">
              <span className="font-[600]">Late Fee:</span>{" "}
              {lateFeeAmount ? `$${lateFeeAmount}` : "No late fee"}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-[500] text-gray-800 mb-1">More Contacts</h3>
            <ul className="text-sm text-gray-700">
              {contactPersons?.length ? (
                contactPersons.map((person, i) => (
                  <li key={i} className="pt-2 pb-2">
                    {person.name}{" "}
                    <div className="flex items-center gap-3">
                      <FaPhoneAlt color="#003897" size={12} /> +1 {person.phone}
                    </div>
                  </li>
                ))
              ) : (
                <li>No contact persons available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Tenant Sidebar */}
        <div className="bg-[#F3F8FF] w-[30em] rounded-2xl p-6">
          {tenant && (
            <>
              <div
                style={{ backgroundImage: `url(${backimage})` }}
                className="bg-cover bg-center rounded-3xl p-3 text-white"
              >
                <div className="flex gap-3 justify-between pt-3">
                  <div className="flex gap-3">
                    <img
                      src={tenant?.profilePicture}
                      className="h-[3.3em] w-[3.3em] rounded-full object-cover cursor-pointer"
                      alt="User Avatar"
                    />
                    <div>
                      <span className="text-1xl font-[500]">
                        {tenant?.name || "N/A"}
                      </span>
                      <p className="text-sm text-white">Tenant</p>
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => navigate("/app/messages")}
                      className="bg-[#fff] p-3 rounded-xl cursor-pointer"
                    >
                      <IoChatbubbleEllipsesOutline size={20} color="blue" />
                    </div>
                  </div>
                </div>

                <div className="text-sm text-white mb-4 mt-3 ml-3">
                  <div className="flex justify-start gap-3">
                    <p className="flex gap-2 items-center">
                      <FaEnvelope />
                      {tenant?.email || "N/A"}
                    </p>
                    <p className="flex gap-2 items-center">
                      <FaPhoneAlt />
                      {tenant?.phoneNo || "N/A"}
                    </p>
                  </div>
                  <p className="flex gap-2 items-center mt-2">
                    <IoIosWarning />
                    Emergency:{" "}
                    {tenant?.emergencyContact || "-- Not provided --"}
                  </p>
                </div>
              </div>

              <div className="pt-4 text-sm">
                <h5 className="font-[500] text-black mb-2">Rent Activity</h5>
                <div className="bg-white rounded-2xl p-3 leading-8">
                  <p className="flex justify-between font-[500]">
                    Current Month: <span>August 2025</span>
                  </p>
                  <p className="flex justify-between font-[500]">
                    Amount Due: <span>${rent}</span>
                  </p>
                  <p className="flex justify-between font-[500]">
                    Due Date: <span>{`August ${rentDueDate}, 2025`}</span>
                  </p>
                  <p className="flex justify-between font-[500]">
                    Payment Status:{" "}
                    <span className="text-yellow-500 font-medium rounded-3xl px-3 bg-[#FF950040]">
                      {paymentStatus || "Pending"}
                    </span>
                  </p>

                  <div className="flex justify-between gap-3 pt-3 pb-3">
                    {paymentStatus === "Unpaid" && (
                      <button
                        className="w-full mt-3 bg-gradient-to-r from-[#003897] to-[#0151DA] text-white py-2 rounded-3xl font-semibold"
                        disabled={remindLoading}
                        onClick={handleReminder}
                      >
                        {remindLoading ? "Sending..." : "Send Reminder"}
                      </button>
                    )}

                    <button
                      className="w-full mt-2 bg-gray-100 text-black py-2 rounded-3xl font-semibold"
                      onClick={() =>
                        navigate("/app/rent-history", {
                          state: {
                            lateFeeAmount,
                            rentDueDate,
                            rent,
                            paymentStatus,
                            contractId: contract,
                          },
                        })
                      }
                    >
                      View History
                    </button>
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
                    description:
                      "Reminder of rent due has been sent to the tenant.",
                    iconBgColor: "bg-blue-600",
                  }}
                />
              </div>
            </>
          )}
          <div className="border-t pt-4 mt-4 cursor-pointer">
            <h5 className="font-[500] text-black mb-2">
              Property Documentation
            </h5>
            <div>
              <div
                onClick={() =>
                  navigate("/app/documents", {
                    state: {
                      propertyId: id,
                      landlordAgreements,
                      landlordRules,
                      landlordPropertyConditionImages,
                      landlordPropertyConditionVideos,
                      uvLightImages,
                      tenantRepairsVideos,
                      tenantRepairsImages,
                      tenantAgreements,
                    },
                  })
                }
                className="bg-white flex justify-between rounded-2xl p-3 items-center mb-3"
              >
                <button className="font-[500]">Documents</button>
                <BsChevronRight />
              </div>

              <div
                className="bg-white flex justify-between rounded-2xl p-3 items-center mb-3"
                onClick={() =>
                  navigate("/app/inspection", {
                    state: {
                      tenant,
                      propertyId: id,
                      allowedDocs,
                      tenantMoveInImages,
                      tenantMoveInVideos,
                      tenantMoveOutImages,
                      tenantMoveOutVideos,
                    },
                  })
                }
              >
                <button className="font-[500]">
                  Inspection (Move in/Move out)
                </button>
                <BsChevronRight />
              </div>

              <div
                className="bg-white flex justify-between rounded-2xl p-3 items-center"
                onClick={() =>
                  navigate("/app/deposit-tracker", {
                    state: { depositId: depositTracker },
                  })
                }
              >
                <button className="font-[500]">Deposit Tracker</button>
                <BsChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDelete && (
        <DeleteModal
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}
          onAction={() => {
            handleDelete();
          }}
          data={{
            title: "Delete Property",
            description: "Are you sure you want to delete this property?",
            iconBgColor: "bg-red-600",
            actionText: "Delete",
          }}
        />
      )}
      {leaseDuration && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-[#F7FAFC] p-8 rounded-2xl max-w-md w-full relative shadow-lg">
            <button
              onClick={() => {
                setLeaseDuration(false);
              }}
              className="absolute top-4 right-4 text-gray-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-2 text-black">
              Set Lease Duration
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Confirm the lease period for this property to finalize the
              tenant’s request.
            </p>

            <div className="space-y-4">
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Lease Start Date
                </label>
                <input
                  type="date"
                  value={leaseStart}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleLeaseStartChange}
                  className="text-slate-500 mt-1 w-full p-3 rounded-xl border text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Lease End Date
                </label>
                <input
                  type="date"
                  value={leaseEnd}
                  onChange={handleLeaseEndChange}
                  min={leaseStart} // prevent selecting a date before start
                  className="text-slate-500 mt-1 w-full p-3 rounded-xl border text-sm"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <p className="text-sm text-gray-500 mb-6">
              The lease duration helps track the agreement timeline and ensures
              proper management of tenant-related tasks.
            </p>

            <p className="text-xs text-red-600 mb-6">
              <strong>Note*</strong>
              <p className="text-sm text-gray-500 mb-6">
                After setting the lease duration, both you and the tenant will
                receive confirmation, and deposit tracking features will become
                active.
              </p>
            </p>

            <button
              onClick={handleLeaseConfirm}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-sm font-medium"
            >
              Save
            </button>
          </div>
        </div>
      )}
      {confirmLeaseDate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <div className="bg-[#FF3B30] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
              <TiWarning size={40} />
            </div>
            <h2 className="font-semibold text-[20px] mb-2 text-black">
              Confirm Lease Date
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Do you wish to confirm these dates?
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="px-[4em] py-2 text-sm text-slate-600 bg-gray-200 rounded-full"
                onClick={() => setConfirmLeaseDate(false)}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={() => handleLeaseSubmit("approved")}
                className="px-[5em] py-2 text-sm bg-[#FF3B30] text-white rounded-full"
              >
                {loading ? "Saving..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
      {rejectedRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            onClick={() => navigate("/app/dashboard")}
            className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center"
          >
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
              <IoMdCheckmark size={40} />
            </div>
            <h2 className="font-semibold text-[20px] mb-2 text-black">
              Tenant Request Rejected!
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              The tenant will be notified and will not have access to this
              property.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
