import { useEffect, useReducer, useState } from "react";
import { ErrorToast } from "../../global/Toaster";

const initialState = {
  form: {
    propertyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    rentAmount: "",
    dueDate: "",
    propertyType: "",
  },
  errors: {},
};

const validateField = (field, value, state) => {
  console.log("🚀 ~ validateField ~ state:", state);
  switch (field) {
    case "propertyName":
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
    case "zipCode":
      if (!/^\d{5}$/.test(value)) return "Zip Code must be 5 digits";
      return "";
    case "rentAmount":
      if (!/^\d+(\.\d{1,2})?$/.test(value) || Number(value) <= 0)
        return "Enter a valid rent amount";
      return "";
    case "dueDate":
      if (!value) return "Due Date is required";
      if (new Date(value) < new Date()) return "Due Date cannot be in the past";
      return "";
    case "propertyType":
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

const DetailStepOne = ({ nextStep, propertyDetail, stepOneData }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const { form, errors } = state;

  // Example state list
  const states = {
    California: ["Los Angeles", "San Diego", "San Francisco"],
    Texas: ["Houston", "Dallas", "Austin"],
    Florida: ["Miami", "Orlando", "Tampa"],
  };

  const [description, setDescription] = useState("");

  const [depositAmount, setDepositAmount] = useState("");
  const [lateFeePolicy, setLateFeePolicy] = useState("");
  const [propertymedia, setPropertyMedia] = useState([]);

  const handleUploadPropertyimage = (e) => {
    const files = Array.from(e.target.files);
    const images = files.filter((file) => file.type.startsWith("image/"));
    setPropertyMedia((prev) => [...prev, ...images]);
  };

  const removeMedias = (index) => {
    setPropertyMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const hasEmptyFields = Object.values(state.form).some((value) => {
      // Handles null, undefined, empty string, or array with no items
      if (typeof value === "string") return value.trim() === "";
      if (Array.isArray(value)) return value.length === 0;
      return !value;
    });

    if (!hasEmptyFields && Object.keys(state.errors).length === 0) {
      nextStep();
      propertyDetail(state.form);
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

      <div className="mt-6 flex flex-wrap gap-3">
        {propertymedia.map((file, index) => (
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
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            {Object.keys(states).map((st) => (
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
            {states[form.state]?.map((city) => (
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
            type="date"
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
            id="lateFeePolicy"
            type="text"
            placeholder="e.g., $25 after 5 days"
            value={lateFeePolicy}
            onChange={(e) => setLateFeePolicy(e.target.value)}
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
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={handleNext}
          className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
        >
          Next
        </button>
        <button className="px-[10em] py-3 rounded-full bg-gray-200 text-gray-700 font-medium">
          Skip
        </button>
      </div>
    </div>
  );
};

export default DetailStepOne;
