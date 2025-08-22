import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import pdfIcon from "../../assets/pdficon.png";
import linkIcon from "../../assets/linkImage.png";
import textIcon from "../../assets/textImage.png";
import SearchBar from "../../components/global/Searchbar";
import { useNavigate } from "react-router";
import { useFetchData } from "../../hooks/api/Get";
import ResourceTextModal from "../../components/app/resources/ResourceTextModal";

const Resources = () => {
  const navigate = useNavigate("");
  const [searchTerm, setSearchTerm] = useState("");
  const [textModal, setTextModal] = useState(false);

  const { data, loading, pagination } = useFetchData(`/laws`, {}, 1, "");

  const filteredDocs = data.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Documents Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
          : filteredDocs.map((doc) => (
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
                  src={
                    doc?.formLink ? pdfIcon : doc?.lawLink ? linkIcon : textIcon
                  }
                  alt="PDF Icon"
                  className="h-[70px] mx-auto"
                />
                <p className="mt-4 font-medium text-sm">{doc.title}</p>
              </div>
            ))}
      </div>
      {textModal && (
        <ResourceTextModal textModal={textModal} setTextModal={setTextModal} />
      )}
    </div>
  );
};

export default Resources;
