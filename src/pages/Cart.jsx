import React from 'react';
import CartList from '../components/cart/CartList';
import Newsletter from '../components/Newsletter';

const Cart = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center py-8'>
      <h1 className='text-xl text-center font-bold'>My Cart</h1>
      {/*  cart list */}
      <div className='w-11/12 py-5'>
        <CartList />
      </div>
      <div className='w-11/12 py-5'>
        <Newsletter />
      </div>
    </div>
  );
};

export default Cart;
