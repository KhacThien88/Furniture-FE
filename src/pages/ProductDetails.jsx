// ProductDetails.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCart } from "../slices/cartSlice";
import Newsletter from "../components/Newsletter";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { Pagination } from "antd";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  useEffect(() => {
    // Lấy tất cả sản phẩm (giống trang Home)
    fetch(`${process.env.REACT_APP_LOCAL_API}/products`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => console.error("Error fetching all products:", error));

    // Lấy dữ liệu sản phẩm hiện tại
    fetch(`${process.env.REACT_APP_LOCAL_API}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.images?.[0]);
        setIsInCart(cart.some((item) => item._id === data._id));
      })
      .catch((error) => console.error("Error fetching product:", error));

    // Lấy danh sách đánh giá cho sản phẩm
    fetch(`${process.env.REACT_APP_LOCAL_API}/reviews?productId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id, cart]);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      const filtered = allProducts.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setRelatedProducts(filtered);
    }
  }, [product, allProducts]);

  const handleAddToCart = () => {
    dispatch(addCart({ ...product, quantity }));
    setIsInCart(true);
  };

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleImageClick = (image) => setSelectedImage(image);
  const currentReviews = reviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="w-full h-full flex flex-col items-center py-8">
        {product ? (
          <div className="w-11/12 bg-white shadow-lg rounded-lg overflow-hidden p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 w-full space-y-4">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
                <div className="flex justify-center space-x-4 mt-4">
                  {product.images?.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt={`${product.name} ${index + 1}`}
                      onClick={() => handleImageClick(item)}
                      className={`w-16 h-16 object-cover rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                        selectedImage === item ? "border-2 border-lime-600" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 w-full md:ml-8 mt-8 md:mt-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  {product.description}
                </p>
                <p className="text-2xl font-bold text-green-600 mb-6">
                  ${product.price}
                </p>
                <p className="text-xl font-bold mb-6">
                  Category:{" "}
                  <span className="text-base">{product.category}</span>
                </p>

                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={decrement}
                    className="w-10 h-10 bg-lime-600 text-white rounded-md flex items-center justify-center hover:bg-lime-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl">{quantity}</span>
                  <button
                    onClick={increment}
                    className="w-10 h-10 bg-lime-600 text-white rounded-md flex items-center justify-center hover:bg-lime-700 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-lg text-white text-lg font-semibold transition-colors ${
                    isInCart
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-lime-500 hover:bg-lime-600"
                  }`}
                  disabled={isInCart}
                >
                  {isInCart ? "Item in Cart" : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Section for Reviews */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
              {currentReviews.length > 0 ? (
                currentReviews.map((review, index) => (
                  <div key={index} className="mb-4 border-b pb-4">
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-yellow-500">
                      {"★".repeat(review.rating)}{" "}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available for this product.</p>
              )}
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={reviews.length}
                onChange={handlePageChange}
                className="py-5"
              />
            </div>

            {/* Section for Related Products */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Related Products</h3>
              <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct._id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}

        <div className="w-11/12 py-5">
          <Newsletter />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
