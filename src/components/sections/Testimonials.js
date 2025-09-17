// src/components/sections/Testimonials.js
import React, { useState, useEffect } from "react";
import ScrollAnimation from "../ScrollAnimation";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "Mirani Group Official",
      feedback:
        "Best A.I Video Maker For Programs. Very Good Quality, Very Impressive.",
    },
    {
      name: "TK Production Islamic",
      feedback: "Thumbnail Quality Like A Professional.",
    },
    {
      name: "Kaki Media",
      feedback:
        "Best All round Designer Of Islamic feed. I am very happy with your service. You always provide timely support.",
    },
    {
      name: "Ahemad Razvi",
      feedback:
        "The Poster / Reels Quality is Amazing. I am very happy for our Service.",
    },
  ];

  // ✅ Auto scroll every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer); // cleanup
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Client Feedback
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <div className="max-w-xl mx-auto relative overflow-hidden">
            {/* Slider wrapper */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-full px-6"
                >
                  <div className="card rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800">
                    <div className="flex items-center mb-3">
                      <h3 className="font-semibold text-lg">
                        {testimonial.name}
                      </h3>
                      <span className="ml-auto text-red-500 text-xl animate-pulse">
                        ❤️
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed italic">
                      “{testimonial.feedback}”
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                    index === current ? "bg-primary scale-110" : "bg-gray-400"
                  }`}
                  onClick={() => setCurrent(index)}
                ></span>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Testimonials;