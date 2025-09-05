import { useEffect, useReducer, useState } from "react";
import { ErrorToast } from "../../global/Toaster";
import { useNavigate } from "react-router";
import AddContactPersonModal from "./AddContactPersonModal";
import axios from "../../../axios";
import { addPropertyValues, propertyTypes } from "../../../init/propertyValues";
import {
  propertyFormReducer,
  requiredPropertyFields,
} from "../../../lib/helpers";
import stateCityData from "../../global/CountryData";

const DetailStepOne = ({ nextStep, propertyDetail, stepOneData }) => {
  const navigate = useNavigate();
  // const [lateFeePolicy, setLateFeePolicy] = useState("");
  const [personsData, setPersonsData] = useState([]);
  const [propertyMedia, setPropertyMedia] = useState([]);
  const [mediaError, setMediaError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [contactPersons, setContactPersons] = useState(false);

  const [state, dispatch] = useReducer(propertyFormReducer, addPropertyValues);

  const { form, errors } = state;

  const handleUploadPropertyimage = (e) => {
    setMediaError(null);
    const files = Array.from(e.target.files);
    const images = files.filter((file) => file.type.startsWith("image/"));
    setPropertyMedia((prev) => [...prev, ...images]);
  };

  const removeMedias = (index) => {
    setPropertyMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContactPerson = () => {
    const hasEmptyFields = requiredPropertyFields.some((field) => {
      return !state.form[field] || state.form[field].trim() === "";
    });

    if (propertyMedia.length === 0) {
      setMediaError("Upload Property Images");
      return;
    }

    if (!hasEmptyFields && Object.keys(state.errors).length === 0) {
      setContactPersons(true);
    } else {
      ErrorToast("Please fill in all valid/required fields.");
    }
  };

  const handleNext = async () => {
    // const hasEmptyFields = Object.values(state.form).some((value) => {
    //   // Handles null, undefined, empty string, or array with no items
    //   if (typeof value === "string") return value.trim() === "";
    //   if (Array.isArray(value)) return value.length === 0;
    //   return !value;
    // });

    if (propertyMedia.length === 0) {
      setMediaError("Upload Property Images");
      return;
    }

    if (Object.keys(state.errors).length === 0) {
      try {
        setLoading(true);

        // const dayOnly = form.dueDate
        //   ? new Date(form.dueDate).getDate().toString()
        //   : "";

        const formData = new FormData();
        formData.append("name", form.propertyName || "");
        formData.append("type", form.propertyType || "");
        formData.append("description", form?.description || "");
        formData.append("address", form.address || "");
        formData.append("city", form.city || "");
        formData.append("state", form.state || "");
        formData.append("zipcode", form.zipCode || "");
        formData.append("deposit", form.depositAmount || "");
        formData.append("rent", form.rentAmount || "");
        formData.append("dueDate", form.dueDate);
        if (form.lateFeeAmount && form.lateFeeAmount.trim() !== "") {
          formData.append("lateFeeAmount", form.lateFeeAmount);
        }

        personsData.forEach((person, index) => {
          formData.append(`contactPersons[${index}][name]`, person.name);
          formData.append(`contactPersons[${index}][phone]`, person.phone);
        });

        // Step Two files
        propertyMedia.forEach((file) => {
          formData.append("images", file);
        });

        const response = await axios.post("/properties", formData);
        if (response.status === 200) {
          let { uniquePropertyCode, id } = response.data.data;

          setContactPersons(false);
          nextStep();
          propertyDetail({
            ...state.form,
            propertyCode: uniquePropertyCode,
            propertyId: id,
          });
        }
      } catch (error) {
        console.log("🚀 ~ handlePropertySubmit ~ error:", error.response.data);
        ErrorToast(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      ErrorToast("Please fill in all valid/required fields.");
    }
  };

  useEffect(() => {
    if (stepOneData && Object.keys(stepOneData).length > 0) {
      Object.entries(stepOneData).forEach(([field, value]) => {
        dispatch({
          type: "UPDATE_FIELD",
          field,
          value,
        });
      });
    }
  }, [stepOneData]);

  return (
    <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-6">
        Upload Images
      </h3>
      <div className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 text-center cursor-pointer block">
        <label
          htmlFor="fileUpload"
          className="rounded-lg p-10 text-center cursor-pointer"
        >
          <p className="text-black">Upload “Property Images”</p>
          <p className="text-sm text-gray-400">Up to 20MB • JPG, PNG</p>
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            multiple
            onChange={handleUploadPropertyimage}
            className="hidden"
          />
        </label>
      </div>
      {mediaError && <p className="text-red-500 text-xs">{mediaError}</p>}

      <div className="mt-6 flex flex-wrap gap-3">
        {propertyMedia.map((file, index) => (
          <div
            key={index}
            className="relative w-28 h-28 rounded overflow-hidden"
          >
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-full object-cover rounded"
            />
            <button
              className="absolute top-1 right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
              onClick={() => removeMedias(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Form Fields */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Property Name
          </label>
          <input
            type="text"
            placeholder="Property Name"
            value={form.propertyName}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "propertyName",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          />
          {errors.propertyName && (
            <p className="text-red-500 text-sm">{errors.propertyName}</p>
          )}
        </div>
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Property Type
          </label>
          <select
            value={form.propertyType}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "propertyType",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          >
            <option value="">Select Dropdown</option>
            {propertyTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <p className="text-red-500 text-sm">{errors.propertyType}</p>
          )}
        </div>
      </div>

      <div className="pt-6">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          placeholder="Place holder goes here"
          rows="4"
          value={form.description}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "description",
              value: e.target.value,
            })
          }
          className="w-full p-3 border border-gray-300 rounded-2xl"
        ></textarea>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "address",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block mb-1 text-sm font-medium">State</label>
          <select
            value={form.state}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "state",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          >
            <option value="">Select State</option>
            {Object.keys(stateCityData).map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
        </div>
        {/* <div>
          <label
            htmlFor="state"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            State
          </label>
          <input
            id="state"
            type="text"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* City */}
        <div>
          <label className="block mb-1 text-sm font-medium">City</label>
          <select
            value={form.city}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "city",
                value: e.target.value,
              })
            }
            disabled={!form.state}
            className="w-full p-3 border rounded-full"
          >
            <option value="">Select City</option>
            {stateCityData[form.state]?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        {/* <div>
          <label
            htmlFor="city"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* Zip Code */}
        <div>
          <label
            htmlFor="zipCode"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Zip Code
          </label>
          <input
            type="text"
            placeholder="Zip Code"
            value={form.zipCode}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "zipCode",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm">{errors.zipCode}</p>
          )}
        </div>

        {/* Rent Amount */}
        <div>
          <label
            htmlFor="rentAmount"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Rent Amount
          </label>
          <input
            type="text"
            placeholder="Rent Amount"
            value={form.rentAmount}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "rentAmount",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          />
          {errors.rentAmount && (
            <p className="text-red-500 text-sm">{errors.rentAmount}</p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="dueDate"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            type="text"
            value={form.dueDate}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "dueDate",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate}</p>
          )}
        </div>

        {/* Late Fee Policy (Optional) */}
        <div>
          <label
            htmlFor="lateFeePolicy"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Late Fee Policy (Optional)
          </label>
          <input
            id="lateFeeAmount"
            type="text"
            placeholder="e.g., $25 after 5 days"
            // value={lateFeePolicy}
            // onChange={(e) => setLateFeePolicy(e.target.value)}
            value={form.lateFeeAmount}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "lateFeeAmount",
                value: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Deposit Amount */}
        <div>
          <label
            htmlFor="depositAmount"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Deposit Amount
          </label>
          <input
            id="depositAmount"
            type="text"
            placeholder="Enter deposit amount"
            value={form.depositAmount}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "depositAmount",
                value: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleContactPerson}
          className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => navigate("/app/dashboard")}
          className="px-[10em] py-3 rounded-full bg-gray-200 text-gray-700 font-medium"
        >
          Skip
        </button>
      </div>
      {contactPersons && (
        <AddContactPersonModal
          setContactPersons={setContactPersons}
          onClose={() => {
            handleNext();
          }}
          loading={loading}
          personsData={personsData}
          setPersonsData={setPersonsData}
        />
      )}
    </div>
  );
};

export default DetailStepOne;
