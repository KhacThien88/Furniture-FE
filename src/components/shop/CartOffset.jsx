import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

// add product in cart
const CartOffset = () => {
  const [open, setOpen] = useState(false);

  const cartList = useSelector((state) => state.cart.items);

  //console.log('cartList: ', cartList);

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className='bg-lime-100 h-10 w-10 flex justify-center items-center rounded-full hover:bg-lime-300 transition-all duration-300 ease-linear relative'
      >
        <RiShoppingCartLine />

        <span
          className={`${
            cartList.length === 0 && 'hidden'
          } absolute -top-1 -right-1 text-sm text-white bg-red-500 w-4 h-4 flex justify-center items-center rounded-full`}
        >
          {cartList.length > 0 ? cartList.length : ''}
        </span>
      </button>
      <div
        className={`w-full fixed top-0 right-0 h-screen max-h-screen z-50 ${
          open ? 'block' : 'hidden'
        }`}
      >
        <div
          className={`bg-white z-[100] w-full max-w-sm h-full ml-auto relative ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className='w-full flex justify-center items-center px-3 py-2 border-b border-gray-200'>
            <div className='w-11/12'>
              <h1 className='font-bold'>My Cart</h1>
            </div>
            <div className='w-1/12'>
              <button
                onClick={() => setOpen(false)}
                className='p-3'
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>

          {/* list of product in cart */}
          <div className='w-full p-5'>
            <ul>
              {cartList.length === 0 ? (
                <p className='font-semibold text-xl text-center'>
                  Your Cart is Empty!
                </p>
              ) : (
                cartList.map((item) => (
                  <CartItem
                    key={item._id}
                    data={item}
                  />
                ))
              )}
            </ul>
          </div>
        </div>

        <div
          className={`h-full w-full z-[60] fixed top-0 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default CartOffset;
