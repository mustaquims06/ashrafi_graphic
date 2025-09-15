// src/pages/AboutPage.js
import React from 'react';
import ScrollAnimation from '../components/ScrollAnimation';

const AboutPage = () => {
  const team = [
    {
      name: 'Alex Ashrafi',
      role: 'Creative Director',
      bio: 'With over 10 years of experience in the design industry, Alex leads our creative vision and ensures every project meets our high standards.',
      image: 'https://via.placeholder.com/300x300?text=Alex+Ashrafi'
    },
    {
      name: 'Sarah Johnson',
      role: 'Senior Designer',
      bio: 'Sarah specializes in brand identity and packaging design, bringing creativity and strategic thinking to every project.',
      image: 'https://via.placeholder.com/300x300?text=Sarah+Johnson'
    },
    {
      name: 'Michael Chen',
      role: 'Digital Design Specialist',
      bio: 'Michael excels at creating engaging digital experiences and UI designs that combine aesthetics with functionality.',
      image: 'https://via.placeholder.com/300x300?text=Michael+Chen'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">About Ashrafi Graphics</h1>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto mb-16">
          <ScrollAnimation animation="fade-in-up" delay={0.2}>
            <div className="card rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4 gold-text">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2013, Ashrafi Graphics began as a small studio with a big vision: to create exceptional design that helps businesses stand out and connect with their audiences.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Over the years, we've grown into a full-service design agency, but we've maintained our commitment to quality, creativity, and client satisfaction. Every project we undertake is approached with the same passion and attention to detail that characterized our earliest work.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ScrollAnimation animation="fade-in-up" delay={0.3}>
              <div className="card rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 gold-text">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To be the leading creative force in the design industry, known for innovative solutions that drive our clients' success and set new standards for excellence.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in-up" delay={0.4}>
              <div className="card rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 gold-text">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To deliver exceptional design solutions that effectively communicate our clients' messages, enhance their brands, and help them achieve their business objectives.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        <ScrollAnimation animation="fade-in-up" delay={0.5}>
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <ScrollAnimation 
              key={index} 
              animation="fade-in-up" 
              delay={0.2 * index + 0.6}
            >
              <div className="card rounded-lg overflow-hidden text-center">
                <div className="h-60 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;