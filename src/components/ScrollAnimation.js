// src/components/ScrollAnimation.js
import React, { useEffect, useRef } from 'react';

const ScrollAnimation = ({ children, className = '', animation = 'fade-in-up', delay = 0, threshold = 0.1 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(animation);
            entry.target.style.opacity = '1';
          }, delay * 1000);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animation, delay, threshold]);

  return (
    <div
      ref={ref}
      className={`opacity-0 transition-all duration-700 ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;