import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ImProfile } from 'react-icons/im';
const UserAvatar = ({ user, handleLogout }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div className='relative'>
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={toggleDropdown}
      >
        <img
          src={user.avatarUrl || '/img/Users/default.jpg'}
          alt={`${user.username}'s avatar`}
          className='w-12 h-12 rounded-full object-cover'
        />
        <span className='text-gray-800 font-medium'>{user.username}</span>
      </div>

      {dropdown && (
        <div className='absolute flex flex-col z-50 right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg'>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100'
          >
            <FiLogOut className='text-gray-500' />
            <span>Logout</span>
          </button>

          <Link
            to=''
            className='flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100'
          >
            <ImProfile className='text-gray-500' />
            <span>Profile</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
