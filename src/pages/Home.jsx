import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import HeroSlider from "../components/home/HeroSlider";
import Categories from "../components/home/Categories";
import OfferBanners from "../components/home/OfferBanners";
import BestSeller from "../components/home/BestSeller";
import Newsletter from "../components/Newsletter";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const pageSize = 6;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PRODUCTION_API}/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(categoryName.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentData = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full">
        <HeroSlider />
      </div>
      <div className="w-11/12 py-5">
        <div className="title_container py-2">
          <h1 className="title font-bold md:text-3xl text-xl">
            Find Your Style: Furniture Categories
          </h1>
        </div>
        <Categories onSelectCategory={handleSelectCategory} />
      </div>
      <div className="w-11/12 py-5">
        <div className="title_container py-2">
          <h1 className="title font-bold text-center md:text-3xl text-xl">
            {selectedCategory
              ? `Products for ${selectedCategory}`
              : "All Products"}
          </h1>
        </div>
        <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-3 gap-3">
          {currentData.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredProducts.length}
          onChange={handlePageChange}
          className="py-5"
        />
      </div>
      <div className="w-11/12 py-5">
        <OfferBanners />
      </div>
      <div className="w-11/12 py-5">
        <div className="title_container py-2">
          <h1 className="title font-bold text-center md:text-3xl text-xl">
            Discover our Best Seller
          </h1>
        </div>
        <BestSeller />
      </div>
      <div className="w-11/12 py-5">
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
