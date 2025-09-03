import React, { useState } from "react";
import {
  FaArrowLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  IoNotificationsOutline,
  IoEarthOutline,
  IoCallOutline,
} from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { CiCreditCard1 } from "react-icons/ci";
import { CgLoadbarDoc } from "react-icons/cg";
import { RiErrorWarningLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import hand from "../../assets/hand.png";
import NotificationSettings from "../../components/app/settings/NotificationSettings";
import ChangePassword from "../../components/app/settings/ChangePassword";
import DeleteAccount from "../../components/app/settings/DeleteAccount";
import ChangeNumber from "../../components/app/settings/ChangeNumber";
import Language from "../../components/app/settings/Language";
import PaymentSetting from "../../components/app/settings/PaymentSetting";
import PrivacyPolicy from "../../components/app/settings/PrivacyPolicy";

const settingsMenu = [
  {
    key: "notifications",
    label: "Notification Settings",
    icon: <IoNotificationsOutline />,
  },
  { key: "languages", label: "Languages", icon: <IoEarthOutline /> },
  { key: "change_password", label: "Change Password", icon: <MdLockOutline /> },
  { key: "change_number", label: "Change Number", icon: <IoCallOutline /> },
  { key: "payment", label: "Payment Method", icon: <CiCreditCard1 /> },
  { key: "terms", label: "Terms & Conditions", icon: <CgLoadbarDoc /> },
  { key: "privacy", label: "Privacy Policy", icon: <RiErrorWarningLine /> },
  {
    key: "delete",
    label: "Delete Account",
    icon: <RxCrossCircled />,
    danger: true,
  },
];

const Setting = () => {
  const navigate = useNavigate();
  const [selectedSetting, setSelectedSetting] = useState(null);
 
  
const renderSettingContent = () => {
    switch (selectedSetting) {
      case "notifications":
        return (
          <NotificationSettings />
        );
      case "privacy":
      case "terms":
        return (
          <PrivacyPolicy/>
        );
      case "payment":
        return (
          <PaymentSetting/>
        );
      case "languages":
        return (
          <Language />
        );
      case "change_password":
        return (
         <ChangePassword/>
        );
      case "change_number":
        return (
          <ChangeNumber />
        );
      case "delete":
        return (
          <DeleteAccount />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="flex justify-center">
                <img src={hand} className="w-auto h-[90px]" alt="" />
              </div>

              <p className="mt-2">No setting selected to show</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-0 text-[#333]">
      <div className="flex gap-4 items-center mb-6">
        <button onClick={() => navigate("/app/Dashboard")}>
          <FaArrowLeft size={25} />
        </button>
        <h2 className="text-[28px] font-[600] leading-[48px] capitalize">
          Settings
        </h2>
      </div>

      <div className="flex gap-8 bg-[#F9FAFA] p-3 rounded-3xl">
        {/* Left Menu */}
        <div className="w-[480px] p-4 space-y-3">
          {settingsMenu.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedSetting(item.key)}
              className={`w-full flex items-center bg-white justify-between text-left px-4 py-4 rounded hover:bg-blue-50 ${
                item.danger ? "text-red-500" : ""
              } ${
                selectedSetting === item.key ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              <div className="flex items-center gap-3 text-black font-[500]">
                {item.icon}
                {item.label}
              </div>
              <FaChevronRight />
            </button>
          ))}
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white rounded-xl shadow min-h-[400px]">
          {renderSettingContent()}
        </div>
      </div>

    </div>
  );
};

export default Setting;
