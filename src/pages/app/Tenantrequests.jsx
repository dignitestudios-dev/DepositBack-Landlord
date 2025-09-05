// Tenantrequests.js
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { FaArrowLeft } from "react-icons/fa";
import TenantRequestDetails from "../../components/app/TenantRequestDetails";
import { AppContext } from "../../context/AppContext";
import { useFetchData } from "../../hooks/api/Get";

const Tenantrequests = () => {
  const navigate = useNavigate();
  // const { tenantRequest, setTenantUpdate, tenantLoading } =
  //   useContext(AppContext);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const { data: tenantRequest, loading: tenantLoading } = useFetchData(
    `/requests/properties`,
    {},
    // { status: "" },
    1,
    ""
  );

  // useEffect(() => {
  //   setTenantUpdate((prev) => !prev);
  // }, []);

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
        <>
          {tenantLoading ? (
            <div className="mt-4 h-[430px] overflow-y-auto">
              {Array(3)
                .fill()
                .map((_, index) => (
                  <div className="w-[85%] bg-white" key={index}>
                    <div className="flex items-center  py-3">
                      <div className="bg-white flex p-2 max-w-[95%]">
                        <div className="py-3 px-2">
                          <div className="w-[100px] h-[20px] bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="w-[180px] h-[20px] bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="w-[7%] flex flex-col items-center">
                        <div className="w-[50px] h-[10px] bg-gray-200 rounded animate-pulse mb-2"></div>
                      </div>
                    </div>
                    <hr className="h-px my-2 ml-20 w-[90%] bg-gray-100 border" />
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {tenantRequest?.length > 0 ? (
                <div>
                  {tenantRequest.map((req, index) => (
                    <div
                      key={req.id}
                      className={`flex items-start gap-4 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 rounded-xl px-2 ${
                        index !== tenantRequest.length - 1
                          ? "border-b border-gray-200"
                          : ""
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
                        <span className="font-semibold">
                          {req?.tenant?.name}
                        </span>{" "}
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
          )}
        </>
      ) : (
        <TenantRequestDetails request={selectedRequest} />
      )}
    </div>
  );
};

export default Tenantrequests;
