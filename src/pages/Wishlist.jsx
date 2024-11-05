import React from 'react';
import WishlistList from '../components/wishlist/WishlistList';
import Newsletter from '../components/Newsletter';
const Wishlist = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center py-8'>
      <h1 className='text-xl text-center font-bold'>My Wishlist</h1>
      {/*  cart list */}
      <div className='w-11/12 py-5'>
        <WishlistList />
      </div>
      <div className='w-11/12 py-5'>
        <Newsletter />
      </div>
    </div>
  );
};

export default Wishlist;
