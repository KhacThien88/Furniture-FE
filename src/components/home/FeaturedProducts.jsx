import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { FaArrowRightLong } from 'react-icons/fa6';

const FeaturedProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        //console.log('Response status:', res.status); // Kiểm tra status code
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-lg font-semibold text-gray-600 animate-pulse'>
          Loading product List...
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1
     py-3 gap-3'
      >
        {data.length > 0 &&
          data.slice(0, 6).map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
      <div className='flex w-full justify-center items-center'>
        <button className='flex gap-2 items-center justify-center mx-auto font-bold hover:text-lime-400 transition-all duration-500 ease-linear'>
          view more <FaArrowRightLong />{' '}
        </button>
      </div>
    </>
  );
};

export default FeaturedProducts;
