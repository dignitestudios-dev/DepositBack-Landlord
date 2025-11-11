  import { useState, useMemo, useEffect } from "react";

  const Propertycondition = ({ property, isLandlord }) => {
    const [activeTab, setActiveTab] = useState("Photos");
    const [activeCategory, setActiveCategory] = useState("");
    const [previewItem, setPreviewItem] = useState(null);

    // ✅ Extract all media arrays
    const {
      tenantMoveInImages = [],
      tenantMoveOutImages = [],
      tenantMoveInVideos = [],
      tenantMoveOutVideos = [],
      uvLightImages = [],
      uvLightImagesTenant = [],
      landlordPropertyConditionImages = [],
      landlordPropertyConditionVideos = [],
      tenantRepairsImages = [],
      tenantRepairsVideos = [],
    } = property || {};
  console.log(property,"propertypropertyproperty")
    // Normalize data (string → object)
    const normalize = (arr) =>
      arr?.map((x) => (typeof x === "string" ? { fileUrl: x } : x)) || [];

    // 🧠 Build photo tabs dynamically based on role
    const photoTabs = useMemo(() => {
      if (isLandlord) {
        // 👨‍💼 Landlord sees only their own sections
        return [
          { key: "Landlord Condition", data: normalize(landlordPropertyConditionImages) },
          { key: "DB Forensics Light (Landlord)", data: normalize(uvLightImages) },
        ];
      } else {
        // 👤 Tenant sees only their own
        return [
          { key: "Tenant Move-In", data: normalize(tenantMoveInImages) },
          { key: "Tenant Move-Out", data: normalize(tenantMoveOutImages) },
          { key: "Tenant Repairs", data: normalize(tenantRepairsImages) },
          { key: "DB Forensics Light (Tenant)", data: normalize(uvLightImagesTenant) },
        ];
      }
    }, [
      isLandlord,
      tenantMoveInImages,
      tenantMoveOutImages,
      tenantRepairsImages,
      uvLightImages,
      uvLightImagesTenant,
      landlordPropertyConditionImages,
    ]);

    // 🧠 Build video tabs dynamically based on role
    const videoTabs = useMemo(() => {
      if (isLandlord) {
        return [
          { key: "Landlord Condition", data: normalize(landlordPropertyConditionVideos) },
        ];
      } else {
        return [
          { key: "Tenant Move-In", data: normalize(tenantMoveInVideos) },
          { key: "Tenant Move-Out", data: normalize(tenantMoveOutVideos) },
          { key: "Tenant Repairs", data: normalize(tenantRepairsVideos) },
        ];
      }
    }, [
      isLandlord,
      tenantMoveInVideos,
      tenantMoveOutVideos,
      tenantRepairsVideos,
      landlordPropertyConditionVideos,
    ]);

    // ✅ Default category on mount
    useEffect(() => {
      const defaultTabs = activeTab === "Photos" ? photoTabs : videoTabs;
      if (defaultTabs.length && !activeCategory) {
        setActiveCategory(defaultTabs[0].key);
      }
    }, [activeTab, photoTabs, videoTabs, activeCategory]);

    const currentList =
      activeTab === "Photos"
        ? photoTabs.find((t) => t.key === activeCategory)?.data || []
        : videoTabs.find((t) => t.key === activeCategory)?.data || [];

    // ✅ UI same as before...
    return (
      <div className="bg-[#F6FAFF] min-h-screen p-6">
        {/* ---------- Main Tabs (Photos / Videos) ---------- */}
        <div className="flex gap-3 mb-6">
          {["Photos", "Videos"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                const targetTabs = tab === "Photos" ? photoTabs : videoTabs;
                if (targetTabs.length) setActiveCategory(targetTabs[0].key);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#003897] to-[#0151DA] text-white"
                  : "bg-white text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ---------- Sub Tabs (Dynamic Categories) ---------- */}
        <div className="flex flex-wrap gap-3 mb-4">
          {(activeTab === "Photos" ? photoTabs : videoTabs).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === tab.key
                  ? "bg-gradient-to-r from-[#003897] to-[#0151DA] text-white"
                  : "bg-white text-black"
              }`}
            >
              {tab.key}
            </button>
          ))}
        </div>

        {/* ---------- Grid View ---------- */}
        {currentList?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentList.map((item, i) => (
              <div
                key={i}
                className="relative border border-2 hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
                onClick={() =>
                  setPreviewItem({
                    type: activeTab === "Photos" ? "image" : "video",
                    src: item,
                  })
                }
              >
                {activeTab === "Photos" ? (
                  <img
                    src={item.fileUrl}
                    alt={item.title || `Photo ${i}`}
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                ) : (
                  <video
                    src={item.fileUrl}
                    className="w-full h-[150px] object-cover rounded-md"
                    controls
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 py-10 text-center text-sm">
            No {activeTab.toLowerCase()} available for <b>{activeCategory}</b>
          </div>
        )}

        {/* ---------- Modal Preview ---------- */}
        {previewItem && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-4 relative">
              <button
                className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
                onClick={() => setPreviewItem(null)}
              >
                ✕
              </button>
              {previewItem.type === "image" ? (
                <img
                  src={previewItem.src?.fileUrl}
                  className="w-full h-auto rounded-md mb-4"
                  alt="Preview"
                />
              ) : (
                <video
                  controls
                  src={previewItem.src?.fileUrl}
                  className="w-full rounded-md mb-4"
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Propertycondition;
