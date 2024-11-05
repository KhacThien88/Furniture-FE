import React from 'react';
import ProductList from '../components/shop/ProductList';
import Newsletter from '../components/Newsletter';

const Shop = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='w-11/12 py-4'>
        <ProductList />
      </div>
      <div className='w-11/12 py-5'>
        <Newsletter />
      </div>
    </div>
  );
};

export default Shop;
