import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartOffset from './shop/CartOffset';
import WishlistOffset from './shop/WishlistOffset';
import { BsMenuButtonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/userSlice';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('user: ', user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Cart', path: '/cart' },
    { label: 'Wishlist', path: '/wishlist' },
  ];

  return (
    <>
      <div className='w-full flex justify-center py-8 items-center shadow-md'>
        <div className='w-10/12 flex justify-between items-center px-2'>
          {/* Logo */}
          <div className='flex items-center'>
            <h1 className='logo font-bold text-2xl'>Furniture</h1>
          </div>

          {/* Desktop Navigation Links */}
          <ul className='hidden sm:flex gap-4'>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className='hover:text-lime-500'
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className='sm:hidden text-2xl text-lime-500'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <BsMenuButtonFill />
          </button>

          {/* Auth Buttons */}
          {user ? (
            <div className='hidden sm:flex gap-2 items-center'>
              <UserAvatar
                user={user}
                handleLogout={handleLogout}
              />
            </div>
          ) : (
            <div className='hidden sm:flex gap-2 items-center'>
              <Link
                to='/login'
                className='text-white px-4 py-2 rounded-full bg-lime-500 hover:bg-lime-700'
              >
                Log In
              </Link>
              <Link
                to='/signup'
                className='text-white px-4 py-2 rounded-full bg-lime-500 hover:bg-lime-700'
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Wishlist & Cart Icons */}
          <div className='hidden sm:flex text-xl gap-2 items-center ml-4'>
            <WishlistOffset />
            <CartOffset />
          </div>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {menuOpen && (
        <div className='sm:hidden flex flex-col items-center bg-white shadow-md w-full py-2'>
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className='py-2 text-lime-500 w-full text-center hover:bg-gray-100'
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile Auth Links */}
          {user ? (
            <UserAvatar
              user={user}
              handleLogout={handleLogout}
            />
          ) : (
            <div className='flex flex-col gap-2 mt-4'>
              <Link
                to='/login'
                className='text-white px-4 py-2 rounded-full bg-lime-500 text-center'
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to='/signup'
                className='text-white px-4 py-2 rounded-full bg-lime-500 text-center'
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
