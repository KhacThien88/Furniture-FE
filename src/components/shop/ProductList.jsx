// ProductList.js
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import SortDropdown from "./SortDropdown";

import Loading from "../Loading";
import FilterList from "./FilterList";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    fetch("https://furniture-be-od3w.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setInitialData(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSortChange = (sortedData) => {
    setData(sortedData);
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
  };

  return (
    <>
      <div className="flex justify-between py-3">
        <FilterList onFilter={handleFilter} />
        <SortDropdown initialData={initialData} sortedData={handleSortChange} />
      </div>
      {data.length > 0 ? (
        <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-3 gap-3">
          {data.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductList;
