// src/components/sections/Statistics.js
import React from 'react';
import ScrollAnimation from '../ScrollAnimation';

const Statistics = () => {
  const stats = [
    { value: '100+', label: 'Projects Completed' },
    { value: '50+', label: 'Happy Clients' },
    { value: '10+', label: 'Years Experience' },
    { value: '15+', label: 'Industry Awards' }
  ];

  return (
    <section className="py-16 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollAnimation 
              key={index} 
              animation="fade-in-up" 
              delay={0.2 * index}
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold gold-text mb-2">{stat.value}</div>
                <div className="text-lg font-medium">{stat.label}</div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;