// All the helper functions should must be there.
// The functions that you're using multiple times must be there.
// e.g. formatDateToMMDDYYYY, formatEpochToMMDDYYYY, etc.

import moment from "moment/moment";
import { personalInfoValues } from "../init/authValues";
import { addPropertyValues } from "../init/propertyValues";

export const chatTime = (data) => {
  return moment(data.toDate()).format("hh:mm A");
};

export const phoneFormatter = (input) => {
  if (typeof input !== "string") {
    return ""; // or return input if you want to keep original value
  }

  let cleaned;
  cleaned = input.replace(/\D/g, ""); // Remove all non-numeric characters

  if (cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }
  if (cleaned.length > 3 && cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length > 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  } else if (cleaned.length > 0) {
    return `(${cleaned}`;
  }

  return cleaned;
};

// utils/formatFullName.js
export const formatFullName = (value) => {
  if (!value) return "";

  value = value.replace(/^\s+/, "");
  value = value.replace(/\s+/g, " ");
  value = value.replace(/\b\w/g, (char) => char.toUpperCase());

  return value;
};

// utils/formatSsnLast.js
export const formatSsnLast = (value, setErrors) => {
  if (!value) return "";

  value = value.replace(/\D/g, "");
  setErrors((prev) => ({ ...prev, ssn: "" }));

  return value.slice(0, 4);
};

export const getDateFormat = (date) => {
  return moment(date).format("MM-DD-YYYY");
};

export function fileReducer(state, action) {
  switch (action.type) {
    case "SET_FRONT":
      return {
        ...state,
        idFront: action.file,
        idFrontPreview: action.preview,
      };
    case "SET_BACK":
      return {
        ...state,
        idBack: action.file,
        idBackPreview: action.preview,
      };
    case "SET_PROFILE":
      return {
        ...state,
        profileImage: action.file,
        profilePreview: action.preview,
      };
    case "RESET":
      return personalInfoValues;
    default:
      return state;
  }
}

const formatInput = (value) =>
  value
    .replace(/^\s+/, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const validatePropertyField = (field, value) => {
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
      if (!value || !/^\d+$/.test(value)) {
        return "Due Date must be a valid number";
      }
      const day = Number(value);
      if (day < 1 || day > 31) {
        return "Due Date must be between 1 and 31";
      }
      return "";

    case "propertyType":
      if (!value) return "Property type is required";
      return "";
    case "depositAmount":
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
    default:
      return "";
  }
};

export const propertyFormReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      const { field, value } = action;
      const formattedValue =
        field === "propertyName" || field === "address"
          ? formatInput(value)
          : value;

      const error = validatePropertyField(field, formattedValue, state);
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
        const error = validatePropertyField(field, state.form[field], state);
        if (error) errors[field] = error;
      }
      return { ...state, errors };
    }

    case "RESET":
      return addPropertyValues;

    default:
      return state;
  }
};

export const requiredPropertyFields = [
  "address",
  "city",
  "depositAmount",
  "description",
  "dueDate",
  "propertyName",
  "propertyType",
  "rentAmount",
  "state",
  "zipCode",
];
