// src/components/sections/Statistics.js
import React from "react";
import ScrollAnimation from "../ScrollAnimation";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// 👑 React Icons import
import { FaTasks, FaUsers, FaClock } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    { value: 1000, suffix: "+", label: "Projects Completed", icon: <FaTasks className="stat-icon mb-3" /> },
    { value: 500, suffix: "+", label: "Happy Clients", icon: <FaUsers className="stat-icon mb-3" /> },
    { value: 5, suffix: "+", label: "Years Experience", icon: <FaClock className="stat-icon mb-3" /> },
  ];

  // Intersection Observer hook
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  });

  return (
    <section ref={ref} id="statistics" className="py-20 gradient-bg flex items-center justify-center relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <ScrollAnimation key={index} animation="fade-in-up" delay={0.2 * index}>
              <div className="stat-card flex flex-col items-center justify-center">
                
                {/* ✅ Icon */}
                {stat.icon}

                {/* ✅ Animated Counter */}
                <div className="stat-number">
                  {inView && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={1.5}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                
                <div className="stat-label">{stat.label}</div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;