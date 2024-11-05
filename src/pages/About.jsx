import React from 'react';
import Newsletter from '../components/Newsletter';
const About = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center py-8'>
      {/* About */}
      <h1 className='text-4xl font-extrabold mb-6 text-gray-800'>About Us</h1>
      <p className='w-11/12 md:w-3/4 text-gray-700 text-center mb-12 leading-relaxed'>
        Welcome to our furniture shop, where quality meets elegance. We are
        dedicated to providing high-quality, beautiful furniture to transform
        your space into a home.
      </p>

      {/* Core Values Section */}
      <div className='flex flex-wrap justify-around w-11/12 md:w-3/4 mb-16'>
        <div className='text-center m-4 p-6 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105'>
          <h2 className='font-bold text-xl text-gray-800'>
            Quality Craftsmanship
          </h2>
          <p className='text-gray-600 mt-2'>
            Each piece is carefully crafted by skilled artisans using premium
            materials.
          </p>
        </div>
        <div className='text-center m-4 p-6 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105'>
          <h2 className='font-bold text-xl text-gray-800'>Timeless Designs</h2>
          <p className='text-gray-600 mt-2'>
            Our furniture blends classic styles with a modern touch.
          </p>
        </div>
        <div className='text-center m-4 p-6 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105'>
          <h2 className='font-bold text-xl text-gray-800'>
            Sustainable Sourcing
          </h2>
          <p className='text-gray-600 mt-2'>
            We source responsibly, with an emphasis on eco-friendly practices.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className='w-11/12 md:w-3/4 mb-16 bg-white rounded-lg shadow-lg p-8'>
        <h2 className='text-3xl font-bold mb-4 text-center text-gray-800'>
          Our Mission
        </h2>
        <p className='text-gray-700 text-center'>
          Our mission is to provide our customers with exceptional furniture
          pieces that not only elevate their homes but also reflect their
          personal styles. We strive to offer unique, high-quality products that
          are both affordable and sustainable.
        </p>
      </div>

      {/* Testimonials Section */}
      <div className='w-11/12 md:w-3/4 mb-16'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Customer Testimonials
        </h2>
        <div className='flex flex-col md:flex-row justify-around items-center'>
          <div className='bg-white shadow-md p-6 m-2 rounded-lg max-w-sm transform transition duration-300 hover:scale-105'>
            <p className='italic text-gray-600'>
              "I bought a dining table from this shop and couldn't be happier!
              Excellent quality and beautiful design." - Jane D.
            </p>
          </div>
          <div className='bg-white shadow-md p-6 m-2 rounded-lg max-w-sm transform transition duration-300 hover:scale-105'>
            <p className='italic text-gray-600'>
              "Great customer service and a fantastic range of furniture. I
              highly recommend!" - Mark S.
            </p>
          </div>
          <div className='bg-white shadow-md p-6 m-2 rounded-lg max-w-sm transform transition duration-300 hover:scale-105'>
            <p className='italic text-gray-600'>
              "The furniture I bought exceeded my expectations. Eco-friendly and
              stylish!" - Sarah L.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className='w-11/12 md:w-3/4 mb-16'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Meet Our Team
        </h2>
        <p className='text-gray-700 text-center mb-12'>
          Our team is a group of dedicated professionals passionate about
          design, quality, and customer satisfaction.
        </p>
        <div className='flex flex-wrap justify-around'>
          <div className='text-center m-4'>
            <img
              src='/img/TeamMembers/Member1.jpg'
              alt='Team Member 1'
              className='rounded-full w-32 h-32 mx-auto border-4 border-gray-300 shadow-lg'
            />
            <h3 className='font-bold text-lg mt-4'>John Doe</h3>
            <p className='text-gray-600'>Founder & Designer</p>
          </div>
          <div className='text-center m-4'>
            <img
              src='/img/TeamMembers/Member2.jpg'
              alt='Team Member 2'
              className='rounded-full w-32 h-32 mx-auto border-4 border-gray-300 shadow-lg'
            />
            <h3 className='font-bold text-lg mt-4'>Jane Smith</h3>
            <p className='text-gray-600'>Head of Sales</p>
          </div>
          <div className='text-center m-4'>
            <img
              src='/img/TeamMembers/Member3.jpg'
              alt='Team Member 3'
              className='rounded-full w-32 h-32 mx-auto border-4 border-gray-300 shadow-lg'
            />
            <h3 className='font-bold text-lg mt-4'>Emily Brown</h3>
            <p className='text-gray-600'>Customer Support</p>
          </div>
        </div>
      </div>

      <div className='w-11/12 py-5'>
        <Newsletter />
      </div>
    </div>
  );
};

export default About;
