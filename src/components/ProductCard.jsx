import React from 'react';
import { FaRegEye, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../slices/cartSlice';
import { addWishlist } from '../slices/wishlistSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const cartList = useSelector((state) => state.cart.items);
  const wishlistList = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addCart(product));
  };

  const handleAddToWishlist = () => {
    dispatch(addWishlist(product));
  };

  const isInWishlist = wishlistList.some((item) => item._id === product._id);
  const isInCart = cartList.some((item) => item._id === product._id);

  return (
    <div className='w-full group cursor-pointer h-full'>
      <div className='relative overflow-hidden'>
        <img
          src={product.images[0]}
          alt={product.name}
        />

        <div className='p-2 text-xl flex flex-col gap-3 absolute -right-20 top-2 group-hover:right-2 transition-all ease-in-out duration-500'>
          <button
            onClick={handleAddToWishlist}
            className={`${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-lime-200 hover:bg-lime-400'
            }  transition-all duration-200 ease-linear p-3 rounded-full`}
          >
            <FaRegHeart />
          </button>
          <Link
            to={`/product-details/${product._id}`}
            state={{ product, isInCart }}
            className='bg-lime-200 hover:bg-lime-400 transition-all duration-200 ease-linear p-3 rounded-full'
          >
            <FaRegEye />
          </Link>
        </div>
        <div className='absolute -bottom-20 group-hover:bottom-2 transition-all ease-in-out duration-500 w-full'>
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`w-11/12 block mx-auto transition-all duration-200 ease-linear py-2 ${
              isInCart
                ? 'bg-gray-200 hover:bg-gray-400'
                : 'bg-lime-200 hover:bg-lime-400'
            }`}
          >
            {isInCart ? 'Item In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className='py-3'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold'>{product.name}</h1>
          <h4 className='font-bold text-lime-500'>$ {product.price}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
