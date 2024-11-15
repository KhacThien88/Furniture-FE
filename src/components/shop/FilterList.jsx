// Filter.js
import React, { useState } from 'react';

const FilterList = ({ onFilter, clearFilter }) => {
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [material, setMaterial] = useState('');

  const handleFilterChange = () => {
    onFilter({ priceRange, category, manufacturer, material });
  };

  const handleClearFilter = () => {
    setPriceRange('');
    setCategory('');
    setManufacturer('');
    setMaterial('');
    clearFilter();
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

      {/* Filter by manufacturer */}
      <select
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
        className='p-2 border focus:outline-none'
      >
        <option value=''>Select Manufacturer</option>
        <option value='Vitra'>Vitra</option>
        <option value='IKEA'>IKEA</option>
        <option value='Herman Miller'>Herman Miller</option>
        <option value='Hawworth'>Hawworth</option>
        <option value='Maiden Home'>Maiden Home</option>
        <option value='Knoll'>Knoll</option>
      </select>

      {/* Filter by material */}
      <select
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className='p-2 border focus:outline-none'
      >
        <option value=''>Select Material</option>
        <option value='Wood'>Wood</option>
        <option value='Fabric'>Fabric</option>
        <option value='Glass'>Glass</option>
        <option value='Metal'>Metal</option>
        <option value='Plastic'>Plastic</option>
        <option value='Ceramic '>Ceramic </option>
      </select>
      <button
        onClick={handleFilterChange}
        className='p-2 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded'
      >
        Apply Filters
      </button>

      <button
        onClick={handleClearFilter}
        className='p-2 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded'
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterList;
