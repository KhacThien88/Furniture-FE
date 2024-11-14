// Filter.js
import React, { useState } from 'react';

const FilterList = ({ onFilter }) => {
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState('');

  const handleFilterChange = () => {
    onFilter({ priceRange, category });
  };

  return (
    <div className='flex gap-4 py-3'>
      {/* Filter by price */}
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className='p-2 border focus:outline-none'
      >
        <option value=''>Select Price Range</option>
        <option value='0-100'>$0 - $100</option>
        <option value='100-200'>$100 - $200</option>
        <option value='200-300'>$200 - $300</option>
        <option value='300+'>$300+</option>
      </select>

      {/* Filter by category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className='p-2 border focus:outline-none'
      >
        <option value=''>Select Category</option>
        <option value='Lamps'>Lamps</option>
        <option value='Tables'>Tables</option>
        <option value='Chairs'>Chairs</option>
        <option value='Dressers'>Dressers</option>
        <option value='Cots'>Cots</option>
        <option value='Night Stands'>Night Stands</option>
        <option value='Sofas'>Sofas</option>
        <option value='Shelves'>Shelves</option>
      </select>
      <button
        onClick={handleFilterChange}
        className='p-2 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded'
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterList;
