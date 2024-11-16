import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import ProductCard from '../../components/ProductCard';
import SortDropdown from './SortDropdown';
import Loading from '../Loading';
import FilterList from './FilterList';

const ProductList = ({ searchText }) => {
  const [data, setData] = useState([]); // Original data
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(9); // Items per page

  const options = {
    price: ['$0-$100', '$100-$200', '$200-$300', 'over $300'],
    category: [
      'Lamps',
      'Tables',
      'Chairs',
      'Dressers',
      'Cots',
      'Night Stands',
      'Sofas',
      'Shelves',
    ],
    manufacturer: [
      'Vitra',
      'IKEA',
      'Herman Miller',
      'Hawworth',
      'Maiden Home',
      'Knoll',
    ],
    material: ['Wood', 'Plastic', 'Metal', 'Fabric', 'Glass', 'Ceramic'],
  };

  const handleFilterChange = (filterKey, value, isChecked) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (isChecked) {
        if (!updatedFilters[filterKey]) {
          updatedFilters[filterKey] = [];
        }
        updatedFilters[filterKey].push(value);
      } else {
        updatedFilters[filterKey] = updatedFilters[filterKey].filter(
          (item) => item !== value
        );
        if (updatedFilters[filterKey].length === 0) {
          delete updatedFilters[filterKey];
        }
      }
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setCurrentPage(1);
  };

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${process.env.REACT_APP_PRODUCTION_API}/products`, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setData(response);
        setFilteredData(response);
        setLoading(false);
      }
    };
    xhr.onerror = () => console.error('Failed to fetch data');
    xhr.send();
  }, []);

  useEffect(() => {
    let updatedData = [...data];
    // Filter based on selectedFilters
    Object.keys(selectedFilters).forEach((filterKey) => {
      const filterValues = selectedFilters[filterKey];
      if (filterValues.length > 0) {
        updatedData = updatedData.filter((product) => {
          if (filterKey === 'price') {
            // Filter by price
            return filterValues.some((priceRange) => {
              if (priceRange === '$0-$100')
                return product.price >= 0 && product.price <= 100;
              if (priceRange === '$100-$200')
                return product.price >= 100 && product.price <= 200;
              if (priceRange === '$200-$300')
                return product.price >= 200 && product.price <= 300;
              if (priceRange === 'over $300') return product.price > 300;
              return false;
            });
          } else {
            // Filter by other attributes (category, manufacturer, material)
            return filterValues.includes(product[filterKey]);
          }
        });
      }
    });

    // Filter by searchText
    if (searchText) {
      updatedData = updatedData.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredData(updatedData); // update filtered data  based on all attributes
  }, [selectedFilters, searchText, data]);

  const handleSortChange = (sortedData) => {
    setFilteredData(sortedData); // Update filtered data after sorting
  };

  // Get paginated data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <SortDropdown
        initialData={filteredData}
        sortedData={handleSortChange}
      />
      <div className='flex gap-6 w-full'>
        <div className='py-3 w-1/6'>
          <FilterList
            options={options}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            selectedFilters={selectedFilters}
          />
        </div>
        {loading ? (
          <div className='flex items-center justify-center w-full h-full'>
            <Loading />
          </div>
        ) : (
          <div className='w-5/6'>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-3 gap-3'>
              {paginatedData.length > 0 ? (
                paginatedData.map((product) => (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div>
                  <h1 className='text-lime-500 font-bold'>
                    No products found!
                  </h1>
                </div>
              )}
            </div>
            <div className='flex justify-center mt-4'>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredData.length}
                onChange={(page, pageSize) => {
                  setCurrentPage(page);
                  setPageSize(pageSize);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
