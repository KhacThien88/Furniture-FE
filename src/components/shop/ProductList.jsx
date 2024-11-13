import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ProductCard from "../../components/ProductCard";
import SortDropdown from "./SortDropdown";
import Loading from "../Loading";
import FilterList from "./FilterList";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${process.env.REACT_APP_LOCAL_API}/products`, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setData(response);
        setInitialData(response);
        setLoading(false);
      }
    };
    xhr.onerror = () => console.error("Failed to fetch data");
    xhr.send();
  }, []);

  const handleSortChange = (sortedData) => {
    setData(sortedData);
    setCurrentPage(1); // Reset to page 1 after sorting
  };

  const handleFilter = ({ name, priceRange }) => {
    let filteredData = [...initialData];
    if (name) {
      filteredData = filteredData.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (priceRange) {
      if (priceRange === "0-100") {
        filteredData = filteredData.filter(
          (product) => product.price >= 0 && product.price <= 100
        );
      } else if (priceRange === "100-200") {
        filteredData = filteredData.filter(
          (product) => product.price > 100 && product.price <= 200
        );
      } else if (priceRange === "200-300") {
        filteredData = filteredData.filter(
          (product) => product.price > 200 && product.price <= 300
        );
      } else if (priceRange === "300+") {
        filteredData = filteredData.filter((product) => product.price > 300);
      }
    }

    setData(filteredData);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="flex justify-between py-3">
        <FilterList onFilter={handleFilter} />
        <SortDropdown initialData={initialData} sortedData={handleSortChange} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-3 gap-3">
            {currentData.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.length}
            onChange={handlePageChange}
            className="py-5"
          />
        </>
      )}
    </>
  );
};

export default ProductList;
