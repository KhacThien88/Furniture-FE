import React from 'react';

const SortDropdown = ({ initialData, sortedData }) => {
  const handleSortChange = (e) => {
    let sortedProducts = [...initialData];

    if (e.target.value === 'priceAscending') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (e.target.value === 'priceDescending') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (e.target.value === 'nameAToZ') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (e.target.value === 'nameZToA') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (e.target.value === 'newest') {
      sortedProducts.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );
    } else if (e.target.value === 'oldest') {
      sortedProducts.sort(
        (a, b) => new Date(a.createAt) - new Date(b.createAt)
      );
    }

    sortedData(sortedProducts); // Gọi hàm cập nhật dữ liệu sau khi sắp xếp
  };

  return (
    <div className='flex justify-end py-3'>
      <select
        name='sortDropdown'
        id='sortDropdown'
        className='p-2 border focus:outline-none'
        onChange={handleSortChange}
      >
        <option value='default'>Sort by</option>
        <option value='priceAscending'>Price: Low to High</option>
        <option value='priceDescending'>Price: High to Low</option>
        <option value='nameAToZ'>Name: A to Z</option>
        <option value='nameZToA'>Name: Z to A</option>
        <option value='newest'>Newest</option>
        <option value='oldest'>Oldest</option>
      </select>
    </div>
  );
};

export default SortDropdown;
