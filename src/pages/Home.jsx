import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import OfferBanners from '../components/home/OfferBanners';
import BestSeller from '../components/home/BestSeller';
import Newsletter from '../components/Newsletter';
const Home = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='w-full'>
        <HeroSlider />
      </div>
      <div className='w-11/12 py-5'>
        <div className='title_container py-2'>
          <h1 className='title font-bold md:text-3xl text-xl'>
            Find Your Style:Furniture Categories
          </h1>
        </div>
        <Categories />
      </div>
      <div className='w-11/12 py-5'>
        <div className='title_container py-2'>
          <h1 className='title font-bold text-center md:text-3xl text-xl'>
            Discover Our Featured Products
          </h1>
        </div>
        <FeaturedProducts />
      </div>
      <div className='w-11/12 py-5'>
        <OfferBanners />
      </div>
      <div className='w-11/12 py-5'>
        <div className='title_container py-2'>
          <h1 className='title font-bold text-center md:text-3xl text-xl'>
            Discover our Best Seller
          </h1>
        </div>
        <BestSeller />
      </div>
      <div className='w-11/12 py-5'>
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
