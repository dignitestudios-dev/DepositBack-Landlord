import { useContext, useEffect, useState, useRef } from "react";
import logo from "../../assets/mainlogowhite.png";
import { IoLogOut, IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";
import { getDateFormat } from "../../lib/helpers";
import mainlogowhite from "../../assets/mainlogowhite.png";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate("");
  const { logoutContext, notification, userData } = useContext(AppContext);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userPopup, setUserPopup] = useState(false);
  const [logoutpopup, setLogoutpopup] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const notificationRef = useRef(null);
  const userPopupRef = useRef(null);

  const togglePopup = () => {
    if (userPopup) setUserPopup(false);
    setIsPopupOpen(!isPopupOpen);
    setUnreadCount(0);
  };

  const toggleUserpopup = () => {
    if (isPopupOpen) setIsPopupOpen(false);
    setUserPopup(!userPopup);
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close notification popup
  };

  useEffect(() => {
    let count = notification.filter((item) => !item.isRead);
    setUnreadCount(count);

    // Close the popups if clicked outside
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        isPopupOpen
      ) {
        setIsPopupOpen(false); // Close notification popup if clicked outside
      }

      if (
        userPopupRef.current &&
        !userPopupRef.current.contains(event.target) &&
        userPopup
      ) {
        setUserPopup(false); // Close user dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen, userPopup, notification]);

  return (
    <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] flex justify-between items-center rounded-3xl px-[6em] py-4 shadow-md ml-[1em] mr-[1em] mt-[1em]">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} className="h-[4.4em] w-auto" alt="Company Logo" />
      </div>

      {/* Navigation and User Section */}
      <div className="flex items-center gap-6">
        {/* Navigation Links */}
        <ul className="flex text-white gap-6 text-sm font-medium">
          <li
            className="hover:underline cursor-pointer"
            onClick={() => {
              navigate("/app/Dashboard");
              closePopup();
            }}
          >
            {t("header.home")}
          </li>
          <li
            className="hover:underline cursor-pointer relative"
            onClick={() => {
              navigate("/app/tenant-requests");
              closePopup();
            }}
          >
            {t("header.tenantRequests")}
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => {
              navigate("/app/resources");
              closePopup();
            }}
          >
            {t("header.resources")}
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => {
              navigate("/app/messages");
              closePopup();
            }}
          >
            {t("header.messages")}
          </li>
        </ul>

        {/* Notification Icon with Popup toggle */}
        <div className="relative" ref={notificationRef}>
          {/* {unreadCount?.length > 0 && (
            <span className="absolute -top-2 text-sm bg-red-600 h-5 w-5 items-center flex justify-center text-white rounded-full">
              {unreadCount?.length}
            </span>
          )} */}
          <IoNotificationsOutline
            className="text-white text-2xl cursor-pointer"
            onClick={togglePopup}
          />
          {/* Notification Popup */}
          {isPopupOpen && (
            <div className="absolute top-12 z-10 right-0 w-[26em] p-4 bg-white shadow-lg rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold">
                {t("header.notifications")}
              </h3>
              <div className="mt-4 space-y-4">
                {notification.slice(0, 3).map((notification, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {notification.title}
                      </span>
                      <span className="text-[13px] font-medium">
                        {getDateFormat(notification.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1 pb-1">
                      <p className="text-[13px] mr-[3em]">
                        {notification.description}
                      </p>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="flex justify-center items-center ">
                  <button
                    onClick={() => {
                      navigate("/app/notifications");
                      closePopup();
                    }}
                    className="text-sm text-blue-600 font-medium px-4 py-1 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                  >
                    {t("header.viewAll")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <img
          src={userData?.profilePicture || mainlogowhite}
          className="h-10 w-10 rounded-full object-cover cursor-pointer"
          alt="User Avatar"
          onClick={toggleUserpopup}
        />

        {userPopup && (
          <div
            className="z-10 absolute top-[6em] right-10 w-[9em] p-4 bg-white shadow-lg rounded-lg border border-slate-200"
            ref={userPopupRef}
          >
            <div className="space-y-3">
              <span
                className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  navigate("/app/view-profile");
                  closePopup();
                }}
              >
                {t("header.viewProfile")}
              </span>
              <span
                className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  navigate("/app/subscription-plans");
                  closePopup();
                }}
              >
                {t("header.subscriptionPlans")}
              </span>
              <span
                className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  navigate("/app/settings");
                  closePopup();
                }}
              >
                {t("header.settings")}
              </span>
              <span
                onClick={() => {
                  setLogoutpopup(true);
                  closePopup();
                }}
                className="block text-[12px] font-[500] text-red-600 hover:text-red-700 cursor-pointer"
              >
                {t("header.logout")}
              </span>
            </div>
          </div>
        )}

        {logoutpopup && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
              <div className=" p-0 w-fit mx-auto rounded-full mb-3">
                <IoLogOut size={60} color="#FF3B30" />
              </div>
              <h2 className="font-semibold text-[#DC1D00] text-[20px] mb-2">
                {t("header.logoutTitle")}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {t("header.logoutMessage")}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  className="px-16 py-2 text-sm bg-gray-200 rounded-full"
                  onClick={() => setLogoutpopup(false)}
                >
                  {t("header.no")}
                </button>
                <button
                  onClick={() => {
                    logoutContext();
                  }}
                  className="px-16 py-2 text-sm bg-[#DC1D00] text-white rounded-full"
                >
                  {t("header.yes")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
