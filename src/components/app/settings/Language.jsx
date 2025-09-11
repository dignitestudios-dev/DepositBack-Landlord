import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTimes, FaCheck } from "react-icons/fa";

const languages = ["English", "Spanish"];
// "Portuguese", "Russian", "French" "Spanish"

const Language = () => {
  // State to control the popup visibility
  const [language, setLanguage] = useState(false);

  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    const langCode = selected === "English" ? "en" : "es";
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-[600] mb-6">Language Settings</h3>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F5F5] text-sm focus:outline-none"
        />
        <svg
          className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </div>

      {/* Language List */}
      <div className="space-y-3 overflow-auto h-[16em]">
        {languages.map((lang, index) => (
          <label
            key={index}
            className="flex items-center justify-between bg-[#F9F9F9] px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100"
          >
            <span className="text-sm">{lang}</span>
            <input
              type="radio"
              name="language"
              value={lang}
              checked={selectedLang === lang}
              onChange={() => setSelectedLang(lang)}
              className="accent-blue-600 w-4 h-4"
              defaultChecked={lang === "English"}
              onChange={handleLanguageChange}
              checked={
                (lang === "English" && i18n.language === "en") ||
                (lang === "Spanish" && i18n.language === "es")
              }
            />
          </label>
        ))}
      </div>

      {/* Update Button */}
      <div className="mt-[7em] flex justify-center">
        <button
          onClick={handleLanguageUpdate}
          className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white px-[10em] py-3 rounded-full font-medium shadow hover:from-blue-600 hover:to-blue-800 transition"
        >
          Update
        </button>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <button
              onClick={() => setShowPopup(false)} 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={18} />
            </button>

            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">Language Updated!</h2>
            <p className="text-sm text-gray-600">
              Your language has been updated successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Language;

const setGoogleTranslateLang = (lang) => {
  const targetLangCode = lang.toLowerCase().startsWith("spanish") ? "es" : "en";

  const gtDiv = document.querySelector("#google_translate_element");
  if (gtDiv) {
    gtDiv.click(); // Trigger iframe load if needed
  }

  // Function to check if the iframe is loaded
  const checkIframeLoaded = () => {
    const frame = document.querySelector("iframe.goog-te-menu-frame");

    if (!frame) {
      console.log("Iframe not found yet.");
      return false; // Iframe isn't loaded yet, keep checking
    }

    console.log("Iframe found!");
    const innerDoc = frame.contentDocument || frame.contentWindow.document;
    if (!innerDoc) {
      console.log("Iframe document not accessible.");
      return false; // Document inside iframe isn't accessible yet
    }

    const langItems = innerDoc.querySelectorAll(".goog-te-menu2-item");
    if (langItems.length > 0) {
      console.log("Language items loaded:", langItems);
      for (const item of langItems) {
        const span = item.querySelector("span.text");
        if (span && span.innerText.toLowerCase().includes(lang.toLowerCase())) {
          item.click(); // Click the language option

          // Update the select element (hidden) and fire change event
          const select = document.querySelector("select.goog-te-combo");
          if (select) {
            select.value = targetLangCode;
            select.dispatchEvent(new Event("change"));
          }

          return true; // Successfully set the language
        }
      }
    }

    return false; // No language items found, keep trying
  };

  // Retry checking the iframe every 300ms, with a max time of 5 seconds
  const intervalId = setInterval(() => {
    if (checkIframeLoaded()) {
      clearInterval(intervalId); // Stop checking if successful
    }
  }, 300);

  // Stop checking after 5 seconds (timeout)
  setTimeout(() => clearInterval(intervalId), 5000);
};





