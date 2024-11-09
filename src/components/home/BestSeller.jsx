import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { FaArrowRightLong } from 'react-icons/fa6';
import Loading from '../Loading';

const BestSeller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://furniture-be-od3w.onrender.com/api/products')
      .then((res) => {
        //console.log('Response status:', res.status); // Kiểm tra status code
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-3 gap-3'>
          {data.slice(3, 9).map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
      <div className='flex w-full justify-center items-center'>
        <button className='flex gap-2 items-center justify-center mx-auto font-bold hover:text-lime-400 transition-all duration-500 ease-linear'>
          view more <FaArrowRightLong />{' '}
        </button>
      </div>
    </>
  );
};

export default BestSeller;
