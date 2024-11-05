import React from 'react';

const Newsletter = () => {
  return (
    <div className='w-full h-full py-14 px-2 flex justify-center items-center bg-gray-200'>
      <div className='max-w-md w-full'>
        <h1 className='py-5 md:text-2xl text-xl text-center font-bold'>
          Subscribe for Exclusive Updates
        </h1>
        <div className='flex w-full'>
          <input
            type='email'
            name='newsletteremail'
            id='newsletteremail'
            className='w-full p-2 focus:outline-none border border-gray-400 h-10'
          />
          <button className='bg-black hover:bg-slate-900 transition-all duration-300 ease-in text-white px-5'>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
