// All the helper functions should must be there.
// The functions that you're using multiple times must be there.
// e.g. formatDateToMMDDYYYY, formatEpochToMMDDYYYY, etc.

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
