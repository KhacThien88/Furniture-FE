// src/pages/Signup.js
import React from 'react';
import AuthForm from '../components/AuthForm';
import Newsletter from '../components/Newsletter';

const Signup = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center py-8'>
      <AuthForm mode='signup' />
      <div className='w-11/12 py-5'>
        <Newsletter />
      </div>
    </div>
  );
};

export default Signup;
