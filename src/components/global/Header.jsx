import React, { useContext, useState } from "react";
import logo from "../../assets/mainlogowhite.png";
import { IoLogOut, IoNotificationsOutline } from "react-icons/io5";
import user from "../../assets/user.png";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";

const Header = () => {
  const navigate = useNavigate("");
  const { logoutContext } = useContext(AppContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userPopup, setUserPopup] = useState(false);
  const [logoutpopup, setLogoutpopup] = useState(false);

  const togglePopup = () => {
    if (userPopup) setUserPopup(false);
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleUserpopup = () => {
    if (isPopupOpen) setIsPopupOpen(false);
    setUserPopup(!userPopup);
  };

  const notifications = [
    {
      title: "View Request Accepted",
      time: "7:30 PM",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      unreadCount: 1,
    },
    {
      title: "Lease Date Dispute Received",
      time: "7:30 PM",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      unreadCount: 1,
    },
    {
      title: "Tenant Moved Out",
      time: "7:30 PM",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      unreadCount: 0,
    },
    {
      title: "Title goes here",
      time: "7:30 PM",
      message:
        "Lorem ipsum dolor sit amet consectetur. In volutpat et mattis ut tristique viverra blandit.",
      unreadCount: 0,
    },
  ];

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
            }}
          >
            Home
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => {
              navigate("/app/tenant-requests");
            }}
          >
            Tenant Requests
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => {
              navigate("/app/resources");
            }}
          >
            Resources
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => {
              navigate("/app/messages");
            }}
          >
            Messages
          </li>
        </ul>

        {/* Notification Icon with Popup toggle */}
        <div className="relative">
          <IoNotificationsOutline
            className="text-white text-2xl cursor-pointer"
            onClick={togglePopup}
          />
          {/* Notification Popup */}
          {isPopupOpen && (
            <div className="absolute top-12 z-10 right-0 w-[26em] p-4 bg-white shadow-lg rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <div className="mt-4 space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {notification.title}
                      </span>
                      <span className="text-[13px] font-medium">
                        {notification.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1 pb-1">
                      <p className="text-[13px] mr-[3em]">
                        {notification.message}
                      </p>
                      {notification.unreadCount > 0 && (
                        <span className="text-sm bg-red-600 h-5 w-8 items-center flex justify-center text-white rounded-full">
                          {notification.unreadCount}
                        </span>
                      )}
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <img
          src={user}
          className="h-10 w-10 rounded-full object-cover cursor-pointer"
          alt="User Avatar"
          onClick={toggleUserpopup}
        />

        {userPopup && (
          <div className="absolute top-[6em] right-10 w-[9em] p-4 bg-white shadow-lg rounded-lg border border-slate-200">
            <div className="space-y-3">
              <span
                className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  navigate("/app/view-profile");
                }}
              >
                View Profile
              </span>
              <span
                className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  navigate("/app/subscription-plans");
                }}
              >
                Subscription Plans
              </span>
              <span
                className="block text-[12px] font-[500] hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  navigate("/app/settings");
                }}
              >
                Settings
              </span>
              <span
                onClick={() => {
                  setLogoutpopup(true);
                }}
                className="block text-[12px] font-[500] text-red-600 hover:text-red-700 cursor-pointer"
              >
                Log Out
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
                Logout
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to logout your account?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  className="px-16 py-2 text-sm bg-gray-200 rounded-full"
                  onClick={() => setLogoutpopup(false)}
                >
                  No
                </button>
                <button
                  onClick={() => {
                    logoutContext();
                  }}
                  className="px-16 py-2 text-sm bg-[#DC1D00] text-white rounded-full"
                >
                  Yes
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
