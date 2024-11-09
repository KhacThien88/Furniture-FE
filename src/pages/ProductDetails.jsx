import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCart } from '../slices/cartSlice';
import Newsletter from '../components/Newsletter';
import Loading from '../components/Loading';

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

  useEffect(() => {
    // Fetch product data from API
    fetch(`https://furniture-be-od3w.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.images?.[0]); // Set initial selected image to the first image
        const cartItem = cart.find((item) => item._id === data._id);
        if (cartItem) {
          setIsInCart(true);
        }
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id, cart]);

  const handleAddToCart = () => {
    dispatch(addCart({ ...product, quantity }));
    setIsInCart(true);
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <div className='w-full h-full flex flex-col items-center py-8'>
        {product ? (
          <div className='w-11/12 bg-white shadow-lg rounded-lg overflow-hidden p-8'>
            <div className='flex flex-col md:flex-row items-center'>
              <div className='md:w-1/2 w-full space-y-4'>
                <img
                  src={selectedImage}
                  alt={product.name}
                  className='w-full h-auto object-cover rounded-lg shadow-md'
                />
                <div className='flex justify-center space-x-4 mt-4'>
                  {product.images?.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt={`${product.name} ${index + 1}`}
                      onClick={() => handleImageClick(item)} // Update selected image on click
                      className={`w-16 h-16 object-cover rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                        selectedImage === item ? 'border-2 border-lime-600' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className='md:w-1/2 w-full md:ml-8 mt-8 md:mt-0'>
                <h2 className='text-3xl font-bold text-gray-800 mb-4'>
                  {product.name}
                </h2>
                <p className='text-lg text-gray-600 mb-4'>
                  {product.description}
                </p>
                <p className='text-2xl font-bold text-green-600 mb-6'>
                  ${product.price}
                </p>

                <p className='text-xl font-bol mb-6'>
                  Category:{' '}
                  <span className='text-base mr-2'> {product.category}</span>
                </p>

                <div className='flex items-center space-x-4 mb-4'>
                  <button
                    onClick={decrement}
                    className='w-10 h-10 bg-lime-600 text-white rounded-md flex items-center justify-center hover:bg-lime-700 transition-colors'
                  >
                    -
                  </button>
                  <span className='text-xl'>{quantity}</span>
                  <button
                    onClick={increment}
                    className='w-10 h-10 bg-lime-600 text-white rounded-md flex items-center justify-center hover:bg-lime-700 transition-colors'
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-lg text-white text-lg font-semibold transition-colors ${
                    isInCart
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-lime-500 hover:bg-lime-600'
                  }`}
                  disabled={isInCart}
                >
                  {isInCart ? 'Item in Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}

        <div className='w-11/12 py-5'>
          <Newsletter />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
