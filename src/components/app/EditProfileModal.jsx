import React, { useContext, useEffect, useReducer, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import profilePic from "../../assets/user.png";
import frontID from "../../assets/idfront.png";
import backID from "../../assets/idfront.png";
import usaflag from "../../assets/usaflag.png";
import Input from "../../components/global/Input";
import plus from "../../assets/plus.png";
import { AppContext } from "../../context/AppContext";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../global/Toaster";
import { RiLoader5Line } from "react-icons/ri";
import { formatSsnLast, phoneFormatter } from "../../lib/helpers";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  ssn: "",
  emergencyContact: "",
  profileImage: "",
  frontIDImage: null,
  backIDImage: null,
  idFrontPreview: null,
  idBackPreview: null,
  profilePreview: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ALL":
      return { ...state, ...action.payload };
    case "SET_FRONT":
      return {
        ...state,
        frontIDImage: action.file,
        idFrontPreview: action.preview,
      };
    case "SET_BACK":
      return {
        ...state,
        backIDImage: action.file,
        idBackPreview: action.preview,
      };
    case "SET_PROFILE":
      return {
        ...state,
        profileImage: action.file,
        profilePreview: action.preview,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

const EditProfileModal = ({ onClose, userData }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Fullname, setFullname] = useState("");
  const [Ssnnumber, setSsnnumber] = useState("");

  const [errors, setErrors] = useState({
    fullname: "",
    ssn: "",
    frontIDImage: "",
    backIDImage: "",
    profileImage: "",
    phone: "",
    emergencyContact: "",
  });
  console.log("🚀 ~ EditProfileModal ~ errors:", errors);

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (type === "profile") {
      dispatch({ type: "SET_PROFILE", file, preview });
      setErrors((prev) => ({ ...prev, profileImage: "" }));
    } else if (type === "front") {
      dispatch({ type: "SET_FRONT", file, preview });
      setErrors((prev) => ({ ...prev, idFront: "" }));
    } else if (type === "back") {
      dispatch({ type: "SET_BACK", file, preview });
      setErrors((prev) => ({ ...prev, idBack: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      fullname: !state.fullName.trim() ? "Full name is required" : "",
      ssn: !state.ssn.trim()
        ? "SSN is required"
        : state.ssn.trim().length !== 4
        ? "SSN must be exactly 4 digits"
        : "",
      phone: !state.phone.trim()
        ? "Phone number is required"
        : state.phone.trim().length < 10
        ? "Phone number must be at least 10 digits"
        : "",
      emergencyContact: !state.emergencyContact.trim()
        ? "Emergency contact number is required"
        : state.emergencyContact.trim().length < 10
        ? "Emergency contact number must be at least 10 digits"
        : "",
      // idFront: !state.frontIDImage ? "Front ID is required" : "",
      // idBack: !state.backIDImage ? "Back ID is required" : "",
      // profileImage: !state.profileImage ? "Profile image is required" : "",
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData?.append("phoneNo", state?.phone);
      formData?.append("lastFourSSN", state?.ssn);
      formData?.append("language", "english");
      formData?.append("name", state?.fullName);
      formData?.append("emergencyContact", state?.emergencyContact);

      // Assuming formData is a FormData object
      if (state?.profileImage) {
        // Check if profileImage is a File object (i.e., a file)
        if (state?.profileImage instanceof File) {
          // If it's a file, append it to formData
          formData.append("profilePicture", state?.profileImage);
        } else {
          // Otherwise, it's a URL (string), so we skip appending it to formData
          try {
            new URL(state?.profileImage); // Tries to create a URL object
            // If it's a valid URL, do not append to formData
            console.log("Profile image is a URL, skipping append.");
          } catch (e) {
            // If it's neither a URL nor a file, handle accordingly
            console.error("Invalid profile image format.");
          }
        }
      }
      if (state?.backIDImage) {
        // Check if profileImage is a File object (i.e., a file)
        if (state?.backIDImage instanceof File) {
          // If it's a file, append it to formData
          formData.append("governmentIdBack", state?.backIDImage);
          console.log("Profile image is a file, appending to formData.");
        } else {
          // Otherwise, it's a URL (string), so we skip appending it to formData
          try {
            new URL(state?.backIDImage); // Tries to create a URL object
            // If it's a valid URL, do not append to formData
            console.log("Profile image is a URL, skipping append.");
          } catch (e) {
            // If it's neither a URL nor a file, handle accordingly
            console.error("Invalid profile image format.");
          }
        }
      }
      if (state?.frontIDImage) {
        // Check if profileImage is a File object (i.e., a file)
        if (state?.frontIDImage instanceof File) {
          // If it's a file, append it to formData
          formData.append("governmentIdFront", state?.frontIDImage);
          console.log("Profile image is a file, appending to formData.");
        } else {
          // Otherwise, it's a URL (string), so we skip appending it to formData
          try {
            new URL(state?.frontIDImage); // Tries to create a URL object
            // If it's a valid URL, do not append to formData
            console.log("Profile image is a URL, skipping append.");
          } catch (e) {
            // If it's neither a URL nor a file, handle accordingly
            console.error("Invalid profile image format.");
          }
        }
      }
      const response = await axios.put("/users", formData);
      if (response.status === 201 || response.status === 200) {
        onClose(true);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      dispatch({
        type: "SET_ALL",
        payload: {
          fullName: userData.name,
          email: userData.email,
          phone: userData.phoneNo,
          emergencyContact: userData.emergencyContact,
          ssn: userData.lastFourSSN,
          profileImage: userData.profilePicture,
          frontIDImage: userData.governmentIdFront,
          backIDImage: userData.governmentIdBack,
          language: userData.language,
        },
      });
    }
  }, [userData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
          <IoClose />
        </button>
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        <div className="flex gap-4 items-center mb-6">
          <div className="relative">
            <img
              src={state.profilePreview || state.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <label className="absolute -bottom-1 -right-1 rounded-full cursor-pointer">
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, "profile")}
              />
              <img src={plus} className="w-6 h-6" alt="" />
            </label>
          </div>
          <button
            className="text-sm font-medium text-blue-600 underline"
            onClick={() => document.getElementById("profileUpload").click()}
          >
            Update Profile Image
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-[6em]">
            <Input
              label="Full Name"
              type="text"
              value={state.fullName}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "fullName",
                  value: e.target.value,
                })
              }
              placeholder="Enter full name"
              className="bg-[#ECECEC] !w-[132%]"
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs">{errors.fullname}</p>
            )}

            <Input
              label="Email Address"
              type="email"
              disabled={true}
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "email",
                  value: e.target.value,
                })
              }
              placeholder="Enter email address"
              className="bg-[#ECECEC] !w-[132%]"
            />
          </div>

          <div className="pt-3">
            <span className="block text-[15px] text-gray-800 font-[500]">
              Phone Number
            </span>
            <div className="flex gap-[10px] justify-start items-center">
              <div className="bg-[#ECECEC] rounded-full p-3 pl-[13px] pr-[13px] flex items-center justify-center gap-3">
                <img src={usaflag} className="h-5 w-[2.1em]" alt="USA Flag" />
                <p>+1</p>
              </div>
              <Input
                label=""
                type="text"
                maxLength={14}
                value={phoneFormatter(state.phone)}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "phone",
                    value: e.target.value.replace(/\D/g, ""),
                  })
                }
                placeholder="Add phone number"
                className="!w-[37em] bg-[#ECECEC]"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>
          <div className="flex gap-[6em]">
            <div className="mt-3">
              <Input
                label="Last Four Digits Of SSN"
                type="text"
                value={state.ssn}
                maxLength={4}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "ssn",
                    value: formatSsnLast(e.target.value, setErrors),
                  })
                }
                placeholder="XXXX"
                className="bg-[#ECECEC] !w-[132%]"
              />
              {errors.ssn && (
                <p className="text-red-500 text-xs">{errors.ssn}</p>
              )}
            </div>
            <div className="mt-3">
              <div className="relative">
                <div className="absolute top-[43px] z-20">
                  <p className="text-sm pl-[1px]">+1</p>
                </div>
                <Input
                  label="Emergency Contact"
                  type="text"
                  maxLength={14}
                  value={phoneFormatter(state.emergencyContact)}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "emergencyContact",
                      value: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  placeholder="XXXX-XXXX-XXXX"
                  className="bg-[#ECECEC] !w-[132%]"
                />
              </div>
              {errors.emergencyContact && (
                <p className="text-red-500 text-xs">
                  {errors.emergencyContact}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm font-medium mb-2">Front ID Card</p>
              <div className="relative">
                <img
                  src={state?.idFrontPreview || state?.frontIDImage}
                  alt="Front ID"
                  className="h-28 mx-auto rounded-md"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(e, "front")}
                />
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="text-sm font-medium mb-2">Back ID Card</p>
              <div className="relative">
                <img
                  src={state?.idBackPreview || state?.backIDImage}
                  alt="Back ID"
                  className="h-28 mx-auto rounded-md"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(e, "back")}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white mt-6 py-3 rounded-full font-normal"
          >
            <div className="flex justify-center items-center">
              <span className="mr-1">Update Profile</span>
              {loading && <RiLoader5Line className="animate-spin text-lg" />}
            </div>
          </button>
        </form>

        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
              <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
                <FaCheck size={30} />
              </div>
              <h2 className="font-semibold text-lg mb-1">Request Accepted!</h2>
              <p className="text-sm text-gray-600">
                The tenant has accepted your request and now you have access to
                view this file.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;
