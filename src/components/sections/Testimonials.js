// src/components/sections/Testimonials.js
import React, { useState } from 'react';
import ScrollAnimation from '../ScrollAnimation';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Ashrafi Graphics transformed our brand identity completely. Their attention to detail and creative approach exceeded our expectations.",
      author: "Sarah Johnson",
      company: "EcoSolutions CEO"
    },
    {
      quote: "Working with Ashrafi Graphics was a game-changer for our product packaging. Sales increased by 30% after the redesign.",
      author: "Michael Chen",
      company: "FreshFoods Marketing Director"
    },
    {
      quote: "The team at Ashrafi Graphics understands how to communicate brand values through visual design. They're simply the best in the business.",
      author: "Lisa Rodriguez",
      company: "TechInnovate Brand Manager"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Client Testimonials</h2>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Hear what our clients have to say about working with us.
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-up" delay={0.4}>
          <div className="max-w-4xl mx-auto">
            <div className="card rounded-lg p-8 md:p-12 text-center">
              <div className="text-4xl mb-2">"</div>
              <p className="text-xl italic mb-8">
                {testimonials[currentTestimonial].quote}
              </p>
              <div>
                <p className="font-semibold text-lg">{testimonials[currentTestimonial].author}</p>
                <p className="text-gray-600 dark:text-gray-300">{testimonials[currentTestimonial].company}</p>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Testimonials;