import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllWishlists, deleteWishlist } from '../../slices/wishlistSlice';

const WishlistList = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const handleDeleteWishlistItem = (id) => {
    dispatch(deleteWishlist(id));
  };

  const handleDeleteAllWishlistItems = () => {
    dispatch(deleteAllWishlists());
  };

  return (
    <>
      <table className='w-full h-full text-xs md:text-sm text-gray-500'>
        <thead className='bg-gray-300 font-bold'>
          <tr>
            <th className='py-3'>ID</th>
            <th className='py-3'>Name</th>
            <th className='py-3'>Price</th>
            <th className='py-3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.length === 0 ? (
            <tr>
              <td
                colSpan='5'
                className='text-center text-md py-4'
              >
                <p>The Wishlit is Empty</p>
              </td>
            </tr>
          ) : (
            wishlist.map((item, index) => (
              <tr
                key={item._id}
                className='text-center hover:bg-gray-100'
              >
                <td className='py-3'>{index + 1}</td>
                <td className='py-3'>{item.name}</td>
                <td className='py-3'>$ {item.price.toFixed(2)}</td>
                <td className='py-3'>
                  <button
                    onClick={() => handleDeleteWishlistItem(item._id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {wishlist.length > 0 && (
        <div className='flex justify-end m-2'>
          <button
            onClick={handleDeleteAllWishlistItems}
            className='text-red-500 hover:text-red-700 flex items-center text-sm'
          >
            <FaRegTrashAlt className='mr-1' /> Empty Cart
          </button>
        </div>
      )}
    </>
  );
};

export default WishlistList;
