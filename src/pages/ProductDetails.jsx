import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCart, updateCartQuantity } from '../slices/cartSlice';
import Newsletter from '../components/Newsletter';

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    // Fetch product data from API
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data); // Directly set `data` as `product`
        const cartItem = cart.find((item) => item._id === data._id);
        if (cartItem) {
          setIsInCart(true);
          setQuantity(cartItem.quantity);
        }
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id, cart]);

  const handleAddToCart = () => {
    dispatch(addCart({ ...product, quantity }));
    setIsInCart(true);
  };

  const handleUpdateCartItemQuantity = (id, quantity) => {
    dispatch(updateCartQuantity({ id, quantity }));
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (isInCart) handleUpdateCartItemQuantity(product._id, newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (isInCart) handleUpdateCartItemQuantity(product._id, newQuantity);
    }
  };

  if (!product) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-lg font-semibold text-gray-600 animate-pulse'>
          Loading product details...
        </p>
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-col items-center py-8'>
      <div className='w-11/12 bg-white shadow-lg rounded-lg overflow-hidden p-8'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 w-full space-y-4'>
            <img
              src={product.images?.[0]}
              alt={product.name}
              className='w-full h-auto object-cover rounded-lg shadow-md'
            />
            <div className='flex justify-center space-x-4 mt-4'>
              {product.images?.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt={`${product.name} ${index + 1}`}
                  className='w-16 h-16 object-cover rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105'
                />
              ))}
            </div>
          </div>
          <div className='md:w-1/2 w-full md:ml-8 mt-8 md:mt-0'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              {product.name}
            </h2>
            <p className='text-lg text-gray-600 mb-4'>{product.description}</p>
            <p className='text-2xl font-bold text-green-600 mb-6'>
              ${product.price}
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

      <div className='w-11/12 py-5'>
        <Newsletter />
      </div>
    </div>
  );
};

export default ProductDetails;
