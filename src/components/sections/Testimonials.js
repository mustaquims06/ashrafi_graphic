import React, { useState, useEffect } from "react";
import ScrollAnimation from "../ScrollAnimation";
import { FaHeart } from "react-icons/fa";

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

  // Auto rotate slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      className="relative pt-20 pb-0 gradient-bg"
    >
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 gold-text heading-font">
            Client Feedback
          </h2>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <div className="max-w-xl mx-auto relative overflow-hidden">
            {/* Slider */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-6">
                  <div
                    className="card rounded-2xl p-6 shadow-lg"
                    style={{ backgroundColor: "var(--card-bg)" }}
                  >
                    <div className="flex items-center mb-3">
                      <h3 className="font-semibold text-lg">
                        {testimonial.name}
                      </h3>
                      <FaHeart className="ml-auto text-red-500 text-xl animate-pulse heart-icon" />
                    </div>
                    <p className="text-[var(--text-color)] text-md leading-relaxed italic">
                      “{testimonial.feedback}”
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2 pb-10">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                    index === current
                      ? "bg-[var(--primary)] scale-110"
                      : "bg-gray-400"
                  }`}
                  onClick={() => setCurrent(index)}
                ></span>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* Gradient Fade to Footer */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-b from-transparent to-gray-800"></div>
    </section>
  );
};

export default Testimonials;