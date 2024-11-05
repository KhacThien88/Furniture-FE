import React from 'react';
import { FaFacebook, FaRegCopyright } from 'react-icons/fa';
import { FaSquareInstagram, FaSquareXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className='w-full bg-gray-100'>
      <div className='w-11/12 h-full mx-auto px-3 py-5 flex md:flex-row md:justify-center md:items-center flex-col justify-start items-start gap-3'>
        <div className='col flex-1'>
          <h1 className='logo font-bold text-2xl'>Furniture</h1>
          <p className='text-sm text-gray-500 italic py-3'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            sapiente ducimus accusamus autem hic est error sit quisquam animi
            omnis natus deserunt quaerat, dicta sint adipisci. Sint facilis
            reiciendis incidunt!
          </p>
        </div>
        <div className='col flex-1'>
          <h1 className='font-bold py-2 text-2xl title'>Quick Links</h1>
          <ul className='flex flex-col gap-3 w-fit'>
            <li className='font-bold hover:text-lime-400 cursor-pointer'>
              Home
            </li>
            <li className='font-bold hover:text-lime-400 cursor-pointer'>
              About
            </li>
            <li className='font-bold hover:text-lime-400 cursor-pointer'>
              Contact
            </li>
            <li className='font-bold hover:text-lime-400 cursor-pointer'>
              Shop
            </li>
          </ul>
        </div>
        <div className='col flex-1'>
          <h1 className='font-bold text-2xl title py-2'>Terms & Conditions</h1>
          <ul className='flex flex-col gap-3 w-fit'>
            <li className='font-bold hover:text-lime-400 cursor-pointer'>
              Privacy Policy
            </li>
            <li className='font-bold hover:text-lime-400 cursor-pointer'>
              Terms of use
            </li>
          </ul>
        </div>
        <div className='col flex-1'>
          <h1 className='font-bold text-2xl title py-2'>Social Links</h1>
          <ul className='flex text-2xl gap-3 w-fit'>
            <li className='font-bold hover:text-lime-400 cursor-pointer'>
              <button className='p-3 bg-lime-400 hover:bg-lime-500 transition-all duration-300 ease-linear rounded-sm hover:text-white'>
                {' '}
                <FaFacebook />
              </button>
            </li>
            <li className='font-bold hover:text-lime-400 cursor-pointer'>
              <button className='p-3 bg-lime-400 hover:bg-lime-500 transition-all duration-300 ease-linear rounded-sm hover:text-white'>
                <FaSquareInstagram />
              </button>
            </li>
            <li className='font-bold hover:text-lime-400 cursor-pointer'>
              <button className='p-3 bg-lime-400 hover:bg-lime-500 transition-all duration-300 ease-linear rounded-sm hover:text-white'>
                <FaSquareXTwitter />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex sm:flex-row justify-between items-center flex-col w-11/12 border-t border-gray-600 mx-auto py-3'>
        <h4 className='flex items-center font-semibold'>
          <FaRegCopyright /> All rights reserved Furniture 2024.
        </h4>
        <img
          src='/img/card.png'
          alt='card'
          className='w-full h-full max-w-[200px]'
        />
      </div>
    </div>
  );
};

export default Footer;
