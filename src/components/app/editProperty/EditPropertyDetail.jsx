import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import AddContactPersonModal from "./../propertyDetail/AddContactPersonModal";
import { ErrorToast } from "./../../global/Toaster";
import axios from "../../../axios";
import stateCityData from "../../global/CountryData";

const initialState = {
  form: {
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    rent: "",
    rentDueDate: "",
    type: "",
  },
  errors: {},
};

const validateField = (field, value, state) => {
  switch (field) {
    case "name":
      if (!value.trim()) return "Property name is required";
      return "";
    case "address":
      if (!value.trim()) return "Address is required";
      return "";
    case "state":
      if (!value) return "State is required";
      return "";
    case "city":
      if (!value) return "City is required";
      return "";
    case "zipcode":
      if (!/^\d{5}$/.test(value)) return "Zip Code must be 5 digits";
      return "";
    case "rent":
      if (!/^\d+(\.\d{1,2})?$/.test(value) || Number(value) <= 0)
        return "Enter a valid rent amount";
      return "";
    case "rentDueDate":
      if (!value || !/^\d+(\.\d{1,2})?$/.test(value) || Number(value) <= 0)
        return "Due Date is required";
      return "";
    case "deposit":
      // Allow empty value (optional field)
      if (!value) return "";

      // If entered, must be a valid number
      if (!/^\d+(\.\d{1,2})?$/.test(value) || Number(value) <= 0) {
        return "Enter valid deposit amount";
      }
      return "";
    case "lateFeeAmount":
      // Allow empty value (optional field)
      if (!value) return "";

      // If entered, must be a valid number
      if (!/^\d+(\.\d{1,2})?$/.test(value) || Number(value) <= 0) {
        return "Enter valid late fee amount";
      }
      return "";
    case "type":
      if (!value) return "Property type is required";
      return "";
    default:
      return "";
  }
};

const formatInput = (value) =>
  value
    .replace(/^\s+/, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      const { field, value } = action;
      const formattedValue =
        field === "propertyName" || field === "address"
          ? formatInput(value)
          : value;

      const error = validateField(field, formattedValue, state);
      const updatedErrors = { ...state.errors };
      if (error) {
        updatedErrors[field] = error;
      } else {
        delete updatedErrors[field];
      }

      return {
        ...state,
        form: {
          ...state.form,
          [field]: formattedValue,
          ...(field === "state" ? { city: "" } : {}), // Reset city if state changes
        },
        errors: updatedErrors,
      };
    }

    case "VALIDATE_FORM": {
      const errors = {};
      for (const field in state.form) {
        const error = validateField(field, state.form[field], state);
        if (error) errors[field] = error;
      }
      return { ...state, errors };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

const EditPropertyDetail = ({ nextStep, propertyDetail, stepOneData }) => {
  const navigate = useNavigate();

  const [personsData, setPersonsData] = useState([]);
  const [propertyMedia, setPropertyMedia] = useState([]);
  const [mediaError, setMediaError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [contactPersons, setContactPersons] = useState(false);

  const [state, dispatch] = useReducer(formReducer, initialState);

  const { form, errors } = state;

  const handleUploadPropertyimage = (e) => {
    setMediaError(null);
    const files = Array.from(e.target.files); // Get the selected files
    const images = files.filter((file) => file.type.startsWith("image/")); // Filter only image files

    // Ensure the total number of images does not exceed 5
    if (images.length + propertyMedia.length > 5) {
      setMediaError("You can upload up to 5 images only.");
      return; // Exit early if the limit is exceeded
    }

    // Update the state with the selected images if the limit is not exceeded
    setPropertyMedia((prev) => [...prev, ...images]);
  };

  const removeMedias = (index) => {
    setPropertyMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContactPerson = () => {
    if (propertyMedia?.length === 0) {
      ErrorToast("Upload Property Images");
      return;
    }
    if (!form.city) {
      ErrorToast("Please select the city");
      return;
    }
    if (Object.keys(errors).length > 0) {
      ErrorToast("Please fill all required fields");
      return;
    }

    setContactPersons(true);
  };

  const handleUpdateProperty = async () => {
    try {
      setLoading(true);

      // const dayOnly = form.dueDate
      //   ? new Date(form.dueDate).getDate().toString()
      //   : "";

      const formData = new FormData();
      formData.append("currentDate", new Date().toLocaleString());
      formData.append("name", form.name || "");
      formData.append("type", form.type || "");
      formData.append("description", form?.description || "");
      formData.append("address", form.address || "");
      formData.append("city", form.city || "");
      formData.append("state", form.state || "");
      formData.append("zipcode", form.zipcode || "");
      formData.append("deposit", form.deposit || "");
      formData.append("rent", form.rent || "");
      formData.append("rentDueDate", form.rentDueDate);
      formData.append("lateFeeAmount", form.lateFeeAmount);

      personsData.forEach((person, index) => {
        formData.append(`contactPersons[${index}][name]`, person.name);
        formData.append(`contactPersons[${index}][phone]`, person.phone);
      });

      propertyMedia.forEach((file) => {
        if (typeof file !== "string") {
          formData.append("images", file);
        }
      });
      propertyMedia.forEach((file) => {
        if (typeof file === "string") {
          formData.append("existingImages", file);
        }
      });

      const response = await axios.put(
        `/properties/${stepOneData?._id}`,
        formData
      );
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
      let images = stepOneData?.images;
      setPropertyMedia(images);
    }
  }, [stepOneData]);

  return (
    <div className="bg-[#F9FAFA] mt-10 rounded-xl shadow-lg p-8">
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
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
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
            value={form.name}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Property Type
          </label>
          <select
            value={form.type}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "type",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          >
            <option value="">Select Dropdown</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Land">Land</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Condo">Condo </option>
            <option value="Retail">Retail</option>
            <option value="Office"> Office </option>
            <option value="Townhouse">Townhouse</option>
            <option value="Duplex">Duplex</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
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
            htmlFor="zipcode"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Zip Code
          </label>
          <input
            type="text"
            placeholder="Zip Code"
            value={form.zipcode}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "zipcode",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          />
          {errors.zipcode && (
            <p className="text-red-500 text-sm">{errors.zipcode}</p>
          )}
        </div>

        {/* Rent Amount */}
        <div>
          <label
            htmlFor="rent"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Rent Amount
          </label>
          <input
            type="text"
            placeholder="Rent Amount"
            value={form.rent}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "rent",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          />
          {errors.rent && <p className="text-red-500 text-sm">{errors.rent}</p>}
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="rentDueDate"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            type="text"
            value={form.rentDueDate}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "rentDueDate",
                value: e.target.value,
              })
            }
            className="w-full p-3 border rounded-full"
          />
          {errors.rentDueDate && (
            <p className="text-red-500 text-sm">{errors.rentDueDate}</p>
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
          {errors.lateFeeAmount && (
            <p className="text-red-500 text-sm">{errors.lateFeeAmount}</p>
          )}
        </div>

        {/* Deposit Amount */}
        <div>
          <label
            htmlFor="deposit"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Deposit Amount
          </label>
          <input
            id="deposit"
            type="text"
            placeholder="Enter deposit amount"
            value={form.deposit}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "deposit",
                value: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.deposit && (
            <p className="text-red-500 text-sm">{errors.deposit}</p>
          )}
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
        {/* <button
          type="button"
          onClick={() => navigate("/app/dashboard")}
          className="px-[10em] py-3 rounded-full bg-gray-200 text-gray-700 font-medium"
        >
          Skip
        </button> */}
      </div>
      {contactPersons && (
        <AddContactPersonModal
          onClose={() => {
            handleUpdateProperty();
          }}
          loading={loading}
          personsData={personsData}
          setPersonsData={setPersonsData}
          type="edit"
        />
      )}
    </div>
  );
};

export default EditPropertyDetail;
