// src/pages/Home.js
import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';

import Statistics from '../components/sections/Statistics';
import Testimonials from '../components/sections/Testimonials';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Statistics />
      <Testimonials />
    </div>
  );
};

export default Home;