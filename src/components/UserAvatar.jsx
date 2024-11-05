import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi'; // Thư viện icon react-icons

const UserAvatar = ({ user, handleLogout }) => {
  const [dropdown, setDropdown] = useState(false);

  const getInitials = (name) => {
    return name.split(' ')[0].toUpperCase();
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div className='relative'>
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={toggleDropdown}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={`${user.username}'s avatar`}
            className='w-8 h-8 rounded-full object-cover'
          />
        ) : (
          <div className='w-12 h-12 rounded-full bg-lime-500 flex items-center justify-center text-white font-bold'>
            {getInitials(user.username)}
          </div>
        )}
      </div>

      {dropdown && (
        <div className='absolute z-50 right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg'>
          <button
            onClick={handleLogout}
            className='flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100'
          >
            <FiLogOut className='text-gray-500' />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
