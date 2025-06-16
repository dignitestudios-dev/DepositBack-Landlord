import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5'; // Importing search icon

const SearchBar = ({ placeholder = "Search", className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className={`relative w-full max-w-lg mx-auto ${className}`}>
      <input
        type="text"
        className="w-full p-3 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <IoSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600"
        size={20}
      />
    </div>
  );
};

export default SearchBar;
