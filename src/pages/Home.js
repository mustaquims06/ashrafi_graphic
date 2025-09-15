// src/pages/Home.js
import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Projects from '../components/sections/Projects';
import Statistics from '../components/sections/Statistics';
import Testimonials from '../components/sections/Testimonials';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Projects />
      <Statistics />
      <Testimonials />
    </div>
  );
};

export default Home;