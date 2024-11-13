import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaTimes } from 'react-icons/fa';

const SearchBar = ({ onClose, searchText, setSearchText }) => {
  return (
    <div className='flex space-x-2'>
      <div className='flex items-center bg-gray-100 rounded-full p-2 w-full max-w-md'>
        <input
          type='text'
          placeholder='Search by name ...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='bg-transparent outline-none px-4 flex-grow text-gray-700'
        />
        <button className='text-gray-400 hover:text-gray-600 mx-2'>
          <CiSearch size={20} />
        </button>
      </div>
      <button
        onClick={onClose}
        className='text-gray-400 hover:text-gray-600'
      >
        <FaTimes size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
