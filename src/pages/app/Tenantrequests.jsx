// Tenantrequests.js
import { useState } from "react";
import { useNavigate } from "react-router";

import { FaArrowLeft } from "react-icons/fa";
import user from "../../assets/user.png";
import userone from "../../assets/userone.png";
import usertwo from "../../assets/usertwo.png";
import TenantRequestDetails from "../../components/app/TenantRequestDetails";
import { useFetchData } from "../../hooks/api/Get";

const requests = [
  { id: 1, name: "Mike Smith", img: user },
  { id: 2, name: "Peter Parker", img: userone },
  { id: 3, name: "Mike Smith", img: usertwo },
];

const Tenantrequests = () => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { data, loading, pagination } = useFetchData(
    `/requests/properties`,
    {},
    // { status: "" },
    1,
    ""
  );
  console.log("🚀 ~ Tenantrequests ~ data:", data);

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20 text-[#333]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            selectedRequest
              ? setSelectedRequest(null)
              : navigate("/app/dashboard");
          }}
          className="text-gray-600"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-[600]">
          {selectedRequest ? "Tenant Details" : "Tenant Requests"}
        </h1>
      </div>

      {/* Conditional Rendering */}
      {!selectedRequest ? (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {data?.length > 0 ? (
            <div>
              {data.map((req, index) => (
                <div
                  key={req.id}
                  className={`flex items-start gap-4 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 rounded-xl px-2 ${
                    index !== data.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                  onClick={() => {
                    setSelectedRequest(req);
                  }}
                >
                  <img
                    src={req?.tenant?.profilePicture}
                    alt={req?.tenant?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="text-[17px] leading-[1.6]">
                    Tenant{" "}
                    <span className="font-semibold">{req?.tenant?.name}</span>{" "}
                    has entered the property code for{" "}
                    {req?.property?.uniquePropertyCode}. Please review and
                    approve their request to connect to this property for
                    move-in photos and videos.
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div>No record found</div>
          )}
        </div>
      ) : (
        <TenantRequestDetails request={selectedRequest} />
      )}
    </div>
  );
};

export default Tenantrequests;
