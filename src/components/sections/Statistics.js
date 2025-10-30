// src/components/sections/Statistics.js
import React from "react";
import ScrollAnimation from "../ScrollAnimation";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Statistics = () => {
  const stats = [
    { value: 1000, suffix: "+", label: "Projects Completed" },
    { value: 500, suffix: "+", label: "Happy Clients" },
    { value: 5, suffix: "+", label: "Years Experience" },
  ];

  // Intersection Observer hook
  const { ref, inView } = useInView({
    triggerOnce: true, // runs only once
    threshold: 0.3,    // 30% of the section must be visible
  });

  return (
    <section ref={ref} className="py-16 gradient-bg flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <ScrollAnimation
              key={index}
              animation="fade-in-up"
              delay={0.2 * index}
            >
              <div className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105">
                {/* Animated Counter */}
                <div className="text-4xl md:text-5xl font-bold gold-text mb-2 transition duration-300 hover:text-yellow-400 hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                  {inView && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={1.5}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
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
