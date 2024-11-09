import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import SortDropdown from './SortDropdown';
import Loading from '../Loading';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]); // Store initial data

  useEffect(() => {
    fetch('https://furniture-be-od3w.onrender.com/api/products')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log('data: ', data);
        setInitialData(data);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <>
      <SortDropdown
        initialData={initialData}
        sortedData={setData}
      />
      {data.length > 0 ? (
        <div className='w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-3 gap-3'>
          {data.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductList;
