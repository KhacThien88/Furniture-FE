import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCart,
  deleteAllCarts,
  updateCartQuantity,
} from '../../slices/cartSlice';

const CartList = () => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleDeleteCartItem = (id) => {
    dispatch(deleteCart(id));
  };

  const handleDeleteAllCartItems = () => {
    dispatch(deleteAllCarts());
  };

  const handleUpdateCartItemQuantity = (id, quantity) => {
    dispatch(updateCartQuantity({ id, quantity }));
  };

  return (
    <>
      <table className='w-full h-full text-xs md:text-sm text-gray-500'>
        <thead className='bg-gray-300 font-bold'>
          <tr>
            <th className='py-3'>ID</th>
            <th className='py-3'>Name</th>
            <th className='py-3'>Quantity</th>
            <th className='py-3'>Price</th>
            <th className='py-3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartList.length === 0 ? (
            <tr>
              <td
                colSpan='5'
                className='text-center text-md py-4'
              >
                <p>The Cart is Empty</p>
              </td>
            </tr>
          ) : (
            cartList.map((item, index) => (
              <tr
                key={item._id}
                className='text-center hover:bg-gray-100'
              >
                <td className='py-3'>{index + 1}</td>
                <td className='py-3'>{item.name}</td>
                <td className='py-3'>
                  <input
                    type='number'
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateCartItemQuantity(
                        item._id,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className='w-20 p-2 bg-gray-50'
                  />
                </td>
                <td className='py-3'>$ {item.price.toFixed(2)}</td>
                <td className='py-3'>
                  <button
                    onClick={() => handleDeleteCartItem(item._id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot className='bg-gray-50 w-full'>
          <tr className='w-full'>
            <td
              colSpan='2'
              className=''
            >
              Total Quantity:{' '}
              <span className='font-semibold'>{totalQuantity}</span>
            </td>
            <td
              colSpan='3'
              className='p-3 text-green-500 text-right '
            >
              Total Amount: ${totalAmount.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      {cartList.length > 0 && (
        <div className='flex justify-end m-2'>
          <button
            onClick={handleDeleteAllCartItems}
            className='text-red-500 hover:text-red-700 flex items-center text-sm'
          >
            <FaRegTrashAlt className='mr-1' /> Empty Cart
          </button>
        </div>
      )}
    </>
  );
};

export default CartList;
