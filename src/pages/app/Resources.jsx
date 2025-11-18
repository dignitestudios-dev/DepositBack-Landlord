import { useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import pdfIcon from "../../assets/pdficon.png";
import linkIcon from "../../assets/linkImage.png";
import textIcon from "../../assets/textImage.png";
import SearchBar from "../../components/global/Searchbar";
import { useNavigate } from "react-router";
import { useFetchData } from "../../hooks/api/Get";
import ResourceTextModal from "../../components/app/resources/ResourceTextModal";
import Pagination from "../../components/global/Pagination";
import DisclaimerModal from "../../components/app/resources/DisclaimerModal";

const Resources = () => {
  const navigate = useNavigate("");
  const [searchTerm, setSearchTerm] = useState("");
  const [textModal, setTextModal] = useState(false);
  const [disclaimerModal, setDisclaimerModal] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("ALL");

  const { data, loading, pagination } = useFetchData(`/laws`, {}, page, "");
  const { data: categoryData, loading: categoryLoading } = useFetchData(
    `/laws/category`,
    {},
    1,
    ""
  );
  const handlePageChange = (page) => {
    setPage(page);
  };

  const filteredDocs = data.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredLaws = useMemo(() => {
    let list =
      activeTab === "ALL"
        ? data
        : data.filter((item) => item.type === activeTab);

    return list.filter((doc) =>
      doc.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, data, searchTerm]);

  const handleDocClick = (type, value) => {
    console.log("🚀 ~ handleDocClick 33 ~ value:", value);
    if (type === "form") {
      window.open(value, "_blank", "noopener,noreferrer");
    } else if (type === "link") {
      window.open(value, "_blank", "noopener,noreferrer");
    } else {
      setTextModal(value);
    }
  };

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20 text-[#333]">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            className="text-gray-600"
            onClick={() => {
              navigate("/app/dashboard");
            }}
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-[600]">Resources</h1>
        </div>
        <div>
          <SearchBar
            className=""
            placeholder="Search"
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-3 py-2">
          {/* ALL TAB */}
          <div
            onClick={() => setActiveTab("ALL")}
            className={`px-4 cursor-pointer py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200
      ${
        activeTab === "ALL"
          ? "bg-[#003897] text-white"
          : "bg-gray-200 text-black"
      }`}
          >
            All
          </div>

          {/* OTHER CATEGORY TABS */}
          {categoryData?.map((item, index) => {
            const formattedItem = item
              .replace(/_/g, " ")
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <div
                key={index}
                onClick={() => setActiveTab(item)}
                className={`px-4 cursor-pointer py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200
        ${
          activeTab === item
            ? "bg-[#003897] text-white"
            : "bg-gray-200 text-black"
        }`}
              >
                {formattedItem} {/* <-- CHANGE MADE HERE */}
              </div>
            );
          })}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {loading
          ? // Skeleton Loader (show 6 items as placeholder)
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center shadow cursor-pointer"
              >
                {/* Circle / Icon placeholder */}
                <div className="h-[70px] w-[70px] mx-auto rounded-md bg-gray-200 animate-pulse" />

                {/* Title placeholder */}
                <div className="mt-4 h-4 w-3/4 mx-auto rounded bg-gray-200 animate-pulse" />
              </div>
            ))
          : filteredLaws?.map((doc) => (
              <div
                onClick={() =>
                  handleDocClick(
                    doc?.formLink ? "form" : doc?.lawLink ? "link" : "text",
                    doc?.formLink
                      ? doc?.formLink
                      : doc?.lawLink
                      ? doc?.lawLink
                      : doc?.text
                  )
                }
                key={doc._id}
                className="bg-white rounded-xl p-6 text-center shadow cursor-pointer hover:shadow-md transition"
              >
                <img
                  src={doc?.icon || "https://placehold.co/400"}
                  alt="PDF Icon"
                  className="h-[70px] mx-auto"
                />
                <p className="mt-4 font-medium text-sm">{doc.title}</p>
              </div>
            ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Pagination
          currentPage={pagination?.currentPage}
          totalPages={pagination?.totalPages}
          onPageChange={handlePageChange}
          setCurrentPage={page}
        />
      </div>
      {textModal && (
        <ResourceTextModal textModal={textModal} setTextModal={setTextModal} />
      )}

      <DisclaimerModal
        isOpen={disclaimerModal}
        onClose={() => setDisclaimerModal(false)}
      />
    </div>
  );
};

export default Resources;
