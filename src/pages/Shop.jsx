import React, { useEffect, useState } from 'react';
import ProductList from '../components/shop/ProductList';
import Newsletter from '../components/Newsletter';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Shop = () => {
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    // kiểm tra trạng thái searchbar từ url
    if (location.state?.showSearchBar) {
      setShowSearchBar(true);
    }
  }, [location.state]);
  const handleCloseSearchBar = () => {
    setSearchText('');
    setShowSearchBar(false);
  };

  return (
    <>
      {showSearchBar && (
        <div className='w-full bg-gray-200 py-4 flex justify-center items-center'>
          <SearchBar
            onClose={handleCloseSearchBar}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
      )}
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='w-11/12 py-4'>
          <ProductList searchText={searchText} />
        </div>
        <div className='w-11/12 py-5'>
          <Newsletter />
        </div>
      </div>
    </>
  );
};

export default Shop;
