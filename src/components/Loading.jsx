import React from 'react';

const Loading = () => {
  return (
    <div className='flex justify-center items-center space-x-2 h-screen'>
      <div className='w-3 h-3 bg-green-500 rounded-full animate-bounce'></div>
      <div className='w-3 h-3 bg-green-500 rounded-full animate-bounce animation-delay-200'></div>
      <div className='w-3 h-3 bg-green-500 rounded-full animate-bounce animation-delay-400'></div>
    </div>
  );
};

export default Loading;
