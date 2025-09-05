import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import Modal from "../../components/global/Modal";
import { useMemo, useState } from "react";
import { useFetchData } from "../../hooks/api/Get";
import { getDateFormat } from "../../lib/helpers";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";

const RentHistory = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const currentDate = useMemo(() => new Date().toISOString(), []);
  const location = useLocation();
  const [remindLoading, setRemindLoading] = useState(false);

  const { contractId } = location.state || {};

  const {
    data,
    loading: isLoading,
    pagination,
  } = useFetchData(
    `/properties/rent/history/${contractId}`,
    { currentDate },
    1,
    ""
  );
  console.log("🚀 ~ RentHistory ~ data:", data);

  const handleReminder = async () => {
    try {
      setRemindLoading(true);
      const response = await axios.post(
        `/properties/rent/reminder/${contractId}`
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

  return (
    <div className="max-w-[1260px] mx-auto text-[#333]">
      <div className="flex gap-3 items-center mb-10 pt-3">
        <button type="button" onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-[600]">Rent History</h1>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <div className="flex justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <p className="text-black font-[500] text-[16px]">Total Paid</p>
              <p className="text-lg ">${data?.summary?.amountDue}</p>
            </div>
            <div className="flex items-center justify-between pt-2 pb-2">
              <p className="text-black font-[500] text-[16px]">
                Upcoming Rent Due
              </p>
              <p className="text-lg ">
                ${data?.summary?.amountDue} on{" "}
                {getDateFormat(data?.summary?.nextDueDate)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-black font-[500] text-[16px]">
                Payment Status
              </p>
              <span
                className={`${
                  data?.summary?.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }  font-medium text-sm px-8 py-1 rounded-full`}
              >
                {data?.summary?.paymentStatus || "Pending"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {data?.rentHistory?.length > 0 ? (
        <div className="bg-white shadow-md rounded-2xl p-4 w-full">
          {/* Headers */}
          <div className="grid grid-cols-4 gap-4 font-semibold text-gray-800 border-b pb-2">
            <p>Paid On</p>
            <p>For Month</p>
            <p>Amount</p>
            <p>Invoice</p>
          </div>

          {/* Entries */}
          {data?.rentHistory?.map((entry, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 gap-4 items-center py-3 border-b last:border-b-0"
            >
              {/* Paid Date */}
              <p className="text-sm text-gray-700">
                {getDateFormat(entry.paidOn)}
              </p>

              {/* For Month */}
              <p className="text-sm text-gray-600">{entry.forMonth}</p>

              {/* Amount */}
              <p className="text-sm text-gray-900 font-[500]">
                ${entry.amount}
                {entry.lateFee > 0 && (
                  <span className="ml-2 text-red-500 text-xs">
                    + Late Fee ${entry.lateFee}
                  </span>
                )}
              </p>

              {/* Invoice Link */}
              <a
                href={entry.invoice}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                View Invoice
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No rent history available</p>
      )}

      <div className="text-left mt-6">
        {data?.summary?.paymentStatus != "Paid" && (
          <button
            disabled={remindLoading}
            onClick={handleReminder}
            className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-medium px-[4em] py-2 rounded-full hover:bg-[#002f7a] transition"
          >
            {remindLoading ? "Sending..." : "Send Reminder To Tenant"}
          </button>
        )}
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
  );
};

export default RentHistory;
