import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import ProductCard from '../../components/ProductCard';
import SortDropdown from './SortDropdown';
import Loading from '../Loading';
import FilterList from './FilterList';

const ProductList = ({ searchText }) => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${process.env.REACT_APP_PRODUCTION_API}/products`, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setData(response);
        setInitialData(response);
        setLoading(false);
      }
    };
    xhr.onerror = () => console.error('Failed to fetch data');
    xhr.send();
  }, []);

  const handleSortChange = (sortedData) => {
    setData(sortedData);
    setCurrentPage(1); // Reset to page 1 after sorting
  };

  const handleFilter = ({ priceRange, category, manufacturer, material }) => {
    let filteredData = [...initialData];
    if (priceRange) {
      if (priceRange === '0-100') {
        filteredData = filteredData.filter(
          (product) => product.price >= 0 && product.price <= 100
        );
      } else if (priceRange === '100-200') {
        filteredData = filteredData.filter(
          (product) => product.price > 100 && product.price <= 200
        );
      } else if (priceRange === '200-300') {
        filteredData = filteredData.filter(
          (product) => product.price > 200 && product.price <= 300
        );
      } else if (priceRange === '300+') {
        filteredData = filteredData.filter((product) => product.price > 300);
      }
    }

    if (category) {
      filteredData = filteredData.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (manufacturer) {
      filteredData = filteredData.filter((product) =>
        product.manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
      );
    }

    if (material) {
      filteredData = filteredData.filter((product) =>
        product.material.toLowerCase().includes(material.toLowerCase())
      );
    }
    setData(filteredData);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  const clearFilter = () => {
    setData(initialData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter products based on the search text, only when searchText is not empty
  const filteredByNameData = searchText
    ? data.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : data; // If no searchText, show all products

  const currentData = filteredByNameData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className='flex justify-between py-3'>
        <FilterList
          onFilter={handleFilter}
          clearFilter={clearFilter}
        />
        <SortDropdown
          initialData={initialData}
          sortedData={handleSortChange}
        />
      </div>

      {loading ? (
        <Loading />
      ) : filteredByNameData.length === 0 ? (
        // Nếu không có sản phẩm sau khi lọc và tìm kiếm
        <div className='text-center py-10'>
          <h2 className='text-lime-500'>No products found!</h2>
        </div>
      ) : (
        <>
          <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-3 gap-3'>
            {currentData.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Hiển thị phân trang chỉ khi có sản phẩm */}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredByNameData.length}
            onChange={handlePageChange}
            className='py-5'
          />
        </>
      )}
    </>
  );
};

export default ProductList;
