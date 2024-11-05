import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteWishlist } from '../../slices/wishlistSlice';
const WishlistItem = ({ data }) => {
  const dispatch = useDispatch();

  const handleDeleteWishlistItem = () => {
    dispatch(deleteWishlist(data._id));
  };
  return (
    <li className='bg-gray-50 py-3 px-2 my-3 flex gap-4 items-center group cursor-pointer'>
      <div>
        <img
          src={data.images[0]}
          alt={data.name}
          className='w-24 h-24 overflow-hidden object-cover'
        />
      </div>
      <div className='space-y-2 flex-1'>
        <h1 className='font-bold text-lg'>{data.name}</h1>
        <p className='text-lime-300 text-sm'>$ {data.price}</p>
      </div>
      <div>
        <button
          onClick={handleDeleteWishlistItem}
          className='opacity-0 group-hover:opacity-100 text-red-500'
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </li>
  );
};

export default WishlistItem;
