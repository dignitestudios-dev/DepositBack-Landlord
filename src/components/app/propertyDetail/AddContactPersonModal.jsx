import React, { useState } from "react";
import Input from "../../global/Input";
import { phoneFormatter } from "../../../lib/helpers";
import usaflag from "../../../assets/usaflag.png";
import { RiLoader5Line } from "react-icons/ri";

const AddContactPersonModal = ({
  setContactPersons,
  onClose,
  loading,
  personsData,
  setPersonsData,
  type,
}) => {
  const [addNumber, setAddNumber] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddPerson = () => {
    if (!fullName.trim() || !phoneNumber.trim()) return;

    const newPerson = {
      name: fullName,
      phone: phoneNumber,
    };

    setPersonsData((prev) => [...prev, newPerson]);

    // reset form
    setFullName("");
    setPhoneNumber("");
    setAddNumber(false);
  };

  const removePerson = (index) => {
    setPersonsData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      onClick={() => setContactPersons(false)}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-full max-w-[26em] text-center shadow-lg relative"
      >
        <div className="flex justify-start">
          <h2 className="text-2xl font-[600] mb-2">Add Contact Persons</h2>
        </div>

        {addNumber ? (
          <div>
            {/* Name input */}
            <div className="flex flex-col w-full">
              <label className="mb-1 text-sm font-medium text-gray-700 text-left">
                Enter Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full py-2.5 px-3 border rounded-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Phone input */}
            <div className="flex flex-col w-full mt-4">
              <label className="mb-1 text-sm font-medium text-gray-700 text-left">
                Phone Number
              </label>
              <div className="flex gap-[10px] items-center mb-4 ">
                <div className="bg-gray-100 rounded-full py-[9px] pl-[6px] pr-[10px] flex items-center gap-2">
                  <img src={usaflag} className="h-4 w-[1.8em]" alt="" />
                  <p>+ 1</p>
                </div>
                <Input
                  label=""
                  type="tel"
                  placeholder="Add phone number"
                  value={phoneFormatter(phoneNumber)}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="!w-[20em] py-[10px] mb-1"
                  maxLength={14}
                />
              </div>
            </div>

            {/* Add button */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleAddPerson}
                className=" px-4 py-2 bg-blue-700 text-white rounded-3xl text-sm"
              >
                Add
              </button>
              <button
                onClick={() => setAddNumber(false)}
                className="px-4 py-2 bg-gray-200 rounded-3xl text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Add new phone option */}
            <div className="flex justify-start">
              <h3 className="text-xs font-medium">Add Phone Number</h3>
            </div>

            <div
              className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-4 text-center cursor-pointer block"
              onClick={() => setAddNumber(true)}
            >
              <p className="text-blue-500 text-sm">Add New Phone Number</p>
            </div>

            {/* List of persons */}
            {personsData.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {personsData.map((person, index) => (
                  <div
                    key={index}
                    className="relative w-full rounded border p-2 flex flex-col items-start justify-center text-sm bg-gray-50"
                  >
                    <div className="font-medium">{person.name}</div>
                    <div className="text-xs text-gray-500">{person.phone}</div>
                    <button
                      className="absolute -top-2 -right-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center shadow"
                      onClick={() => removePerson(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  disabled={loading}
                  type="button"
                  onClick={() => onClose()}
                  className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
                >
                  <div className="flex justify-center items-center">
                    <span className="mr-1">Next</span>
                    {loading && (
                      <RiLoader5Line className="animate-spin text-lg" />
                    )}
                  </div>
                </button>
              </div>
            )}
            {type === "edit" && (
              <button
                disabled={loading}
                onClick={() => onClose()}
                className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
              >
                <div className="flex justify-center items-center">
                  <span className="mr-1">Skip</span>
                  {loading && (
                    <RiLoader5Line className="animate-spin text-lg" />
                  )}
                </div>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddContactPersonModal;
