// Filter.js
import React, { useState } from "react";

const FilterList = ({ onFilter }) => {
  const [name, setName] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleFilterChange = () => {
    onFilter({ name, priceRange });
  };

  return (
    <div className="flex gap-4 py-3">
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border focus:outline-none"
      />
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="p-2 border focus:outline-none"
      >
        <option value="">Select Price Range</option>
        <option value="0-100">$0 - $100</option>
        <option value="100-200">$100 - $200</option>
        <option value="200-300">$200 - $300</option>
        <option value="300+">$300+</option>
      </select>
      <button
        onClick={handleFilterChange}
        className="p-2 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterList;
