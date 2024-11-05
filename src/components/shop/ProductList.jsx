import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import SortDropdown from './SortDropdown';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]); // Store initial data

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        //console.log('Response status:', res.status); // Kiểm tra status code
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log('data: ', data);
        setInitialData(data);
      })
      .catch((err) => console.error('Fetch error:', err));
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
      <SortDropdown
        initialData={initialData}
        sortedData={setData}
      />
      <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-3 gap-3'>
        {data.length > 0 &&
          data.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductList;
