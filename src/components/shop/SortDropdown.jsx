import React from 'react';

const SortDropdown = ({ initialData, sortedData }) => {
  const handleSortChange = (e) => {
    let sortedProducts = [...initialData]; // create a list of sorted products
    if (e.target.value === 'priceAscending') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (e.target.value === 'priceDescending') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (e.target.value === 'nameAToZ') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (e.target.value === 'nameZToA') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      sortedProducts = initialData; // Reset to initial data
    }
    sortedData(sortedProducts); // Update sorted data
  };

  return (
    <div className='flex justify-end py-3'>
      <select
        name='sortDropdown'
        id='sortDropdown'
        className='p-2 border focus:outline-none'
        onChange={handleSortChange}
      >
        <option>Select...</option>
        <option value='priceAscending'>Price: Low to High</option>
        <option value='priceDescending'>Price: High to Low</option>
        <option value='nameAToZ'>Name: A to Z</option>
        <option value='nameZToA'>Name: Z to A</option>
      </select>
    </div>
  );
};

export default SortDropdown;
