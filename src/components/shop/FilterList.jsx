import React from 'react';

const FilterList = ({
  options,
  onFilterChange,
  onClearFilters,
  selectedFilters,
}) => {
  return (
    <div className='p-4 border rounded-md shadow-md w-full max-w-md'>
      <h2 className='text-lg font-bold mb-4'>Filter Options</h2>

      {/* Hiển thị danh sách bộ lọc */}
      {Object.keys(options).map((filterKey) => (
        <div
          key={filterKey}
          className='mb-4'
        >
          <h3 className='font-semibold text-gray-700 capitalize'>
            {filterKey}
          </h3>
          <div className='flex flex-col space-y-2'>
            {options[filterKey].map((option) => (
              <label
                key={option}
                className='inline-flex items-center'
              >
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600'
                  checked={
                    selectedFilters[filterKey]?.includes(option) || false
                  }
                  onChange={(e) =>
                    onFilterChange(filterKey, option, e.target.checked)
                  }
                />
                <span className='ml-2 text-gray-800'>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Nút xóa tất cả bộ lọc */}
      <button
        onClick={onClearFilters}
        className='mt-4 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600'
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterList;
