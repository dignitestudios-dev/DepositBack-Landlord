import { useState } from "react";

import SearchBar from "../../components/global/Searchbar";
import Homeone from "../../assets/Homeone.png";
import Hometwo from "../../assets/Hometwo.png";
import Homethree from "../../assets/Homefour.png";
import { VscSettings } from "react-icons/vsc";
import { LuMapPin } from "react-icons/lu";
import user from "../../assets/user.png";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Addmorepropertymodal from "../../components/global/Addmorepropertymodal";
import { useNavigate } from "react-router";
import { useFetchData } from "../../hooks/api/Get";
import DashboardSkeletonLoader from "../../components/app/dashboard/DashboardSkeletonLoader";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false); // Manage modal visibility
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");


  const navigate = useNavigate("");

  const modalData = {
    title: "Add Another Property",
    description: "Add a new property to your account.",
    iconBgColor: "bg-blue-500",
    actionText: "Yes, Add now",
    actionTextTwo: "Cancel",
  };

  const { data, loading } = useFetchData(
    `/properties`,
    { status: filters?.propertyStatus, type: filters?.propertyType },
    1,
    ""
  );

  const filteredProperties = data.filter((property) =>
  property.name?.toLowerCase().includes(searchTerm.toLowerCase())
);

  const PropertyFilterModal = ({ isOpen, onClose, onApply }) => {
    const [propertyType, setPropertyType] = useState("Apartment");
    const [propertyStatus, setPropertyStatus] = useState("Active");
    const [dropdownStatus, setDropdownStatus] = useState("");

    const propertyTypes = [
      "Apartment",
      "House",
      "Condo",
      "Townhouse",
      "Duplex",
      "Office",
      "Retail",
      "Warehouse",
      "Land",
    ];
    const propertyStatuses = ["All", "Active", "Inactive"];

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#F5F9FF] w-full max-w-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Filters</h2>

          <div className="mb-4">
            <p className="font-medium mb-2">Property Type</p>
            <div className="flex gap-2 flex-wrap">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-full border ${
                    propertyType === type
                      ? "bg-gradient-to-r bg-[#003897] from-[#0151da] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setPropertyType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="font-medium mb-2">Property Status</p>
            <div className="flex gap-2 flex-wrap">
              {propertyStatuses.map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 rounded-full border ${
                    propertyStatus === status
                      ? "bg-gradient-to-r bg-[#003897] from-[#0151da] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setPropertyStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* <div className="mb-6">
            <p className="font-medium mb-2">Property Status</p>
            <select
              className="w-full px-4 py-3 rounded-full border text-gray-500"
              value={dropdownStatus}
              onChange={(e) => setDropdownStatus(e.target.value)}
            >
              <option value="">Select drop down</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div> */}

          <div className="flex justify-between">
            <button
              className="px-6 py-3 rounded-full bg-gray-200 font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-semibold"
              onClick={() =>
                onApply({ propertyType, propertyStatus, dropdownStatus })
              }
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[90em] mx-auto py-6 px-[4em]">
      <div className="flex flex-wrap justify-between items-center gap-6 p-0">
        <div className="text-left">
          <h1 className="text-3xl font-[500]">
            Hello, <span className="font-[600]">Justin!</span>
          </h1>
          <p className="mt-2 text-2xl font-medium text-black pt-2">
            My Properties
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <SearchBar
            placeholder="Search"
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm} 
            />

          {/* Settings Icon */}
          <div className="flex items-center justify-center bg-gradient-to-r w-[4em] h-10 from-[#003897] to-[#0151DA] rounded-full cursor-pointer">
            <VscSettings
              color="white"
              size={24}
              onClick={() => setFilterOpen(true)}
            />
          </div>

          {/* Add Property Button */}
          <button
            type="button" // Change type to button to prevent page reload
            className="py-3 px-6 w-[16em] bg-gradient-to-r from-[#003897] to-[#0151DA] text-white rounded-full font-semibold hover:opacity-90 transition"
            onClick={() => setModalOpen(true)} // Open the modal when clicked
          >
            + Add Property
          </button>
        </div>
      </div>

      {/* Property Cards Grid */}
     {loading ? (
  <DashboardSkeletonLoader />
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
    {filteredProperties.length > 0 ? (
      filteredProperties.map((property, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Property Image */}
          <div className="relative">
            <img
              src={property.images?.[0] || "/default-property.jpg"}
              alt="Property"
              className="w-full h-[13em] object-cover rounded-2xl"
            />
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-sm text-white rounded-full ${
                property.tenant ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {property.tenant ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Card Body */}
          <div className="p-4">
            <div className="flex justify-between items-center">
              <span
                className="text-[18px] font-[500] cursor-pointer"
                onClick={() => {
                  navigate(`/app/property-detail/${property._id}`, {
                    state: { propertyDetail: property },
                  });
                }}
              >
                {property.name}
              </span>
              <p className="mt-2 text-lg font-semibold text-[#0151DA]">
                ${property.rent}
              </p>
            </div>

            <div className="flex gap-1 pt-2 items-center">
              <LuMapPin size={16} />
              <p className="text-gray-500 font-[500] text-sm">
                {property.address}
              </p>
            </div>

            <span className="text-sm text-black">
              Unique Code: &nbsp;
              <span className="text-blue-600 font-semibold">
                {property.uniquePropertyCode}
              </span>
            </span>

            {/* Tenant Info and Chat */}
            <div className="flex gap-3 justify-between pt-3">
              <div className="flex gap-3">
                <img
                  src={property.tenant?.profilePicture || user}
                  className="h-10 w-10 rounded-full object-cover cursor-pointer"
                  alt="Tenant Avatar"
                />
                <div>
                  <span className="text-1xl">
                    {property.tenant?.name || "No Tenant"}
                  </span>
                  <p className="text-sm text-gray-500">
                    {property.tenant?.name ? "Tenant" : "--"}
                  </p>
                </div>
              </div>
              <div>
                <div
                  className="bg-[#0151DA] p-3 rounded-xl cursor-pointer"
                  onClick={() => {
                    navigate("/app/messages", {
                      state: { tenantId: property?.tenant?.uid },
                    });
                  }}
                >
                  <IoChatbubbleEllipsesOutline size={20} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full text-center mt-10">
        <p className="text-gray-500 text-lg mb-4">
          No properties found for "{searchTerm}".
        </p>
        <button
          onClick={() => setSearchTerm("")}
          className="text-sm text-white bg-[#0151DA] px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Clear Search
        </button>
      </div>
    )}
  </div>
)}


      {/* Add Property Modal */}
      <Addmorepropertymodal
        isOpen={modalOpen}
        onAction={() => {
          navigate(`/app/add-property-details`);
          setModalOpen(false);
        }} // Close modal when action is taken
        onSecondaryAction={() => {
          setModalOpen(false);
        }}
        data={modalData}
      />

      <PropertyFilterModal
        isOpen={filterOpen}
        onClose={() => {
          setFilterOpen(false);
          setFilters(null);
        }}
        onApply={(data) => {
          setFilters(data);
          setFilterOpen(false);
        }}
      />
    </div>
  );
};

export default Dashboard;
