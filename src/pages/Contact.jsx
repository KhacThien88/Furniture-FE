import React from 'react';
import Newsletter from '../components/Newsletter';

const Contact = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center py-8'>
      {/* Contact Heading */}
      <h1 className='text-4xl font-bold mb-4 text-gray-800'>Contact Us</h1>
      <p className='text-gray-600 mb-8 w-11/12 md:w-2/3 text-center leading-relaxed'>
        Have questions or need assistance? Feel free to reach out to us, and
        we'll get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <div className='w-11/12 md:w-1/2 bg-white rounded-lg shadow-md p-8 mb-10'>
        <form className='flex flex-col'>
          <label className='text-gray-700 font-semibold mb-2'>Name</label>
          <input
            type='text'
            className='mb-4 p-3 border rounded-lg outline-none focus:border-lime-500'
            placeholder='Your Name'
          />

          <label className='text-gray-700 font-semibold mb-2'>Email</label>
          <input
            type='email'
            className='mb-4 p-3 border rounded-lg outline-none focus:border-lime-500'
            placeholder='Your Email'
          />

          <label className='text-gray-700 font-semibold mb-2'>Message</label>
          <textarea
            className='mb-6 p-3 border rounded-lg outline-none focus:border-lime-500'
            rows='5'
            placeholder='Your Message'
          />

          <button
            type='submit'
            className='bg-lime-500 text-white font-semibold py-3 rounded-lg hover:bg-lime-600 transition duration-300'
          >
            Send Message
          </button>
        </form>
      </div>

      <div className='w-11/12 py-5'>
        <Newsletter />
      </div>
    </div>
  );
};

export default Contact;
