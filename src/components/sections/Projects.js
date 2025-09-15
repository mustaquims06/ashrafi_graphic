// src/components/sections/Projects.js
import React from 'react';
import ScrollAnimation from '../ScrollAnimation';

const Projects = () => {
  const projects = [
    {
      title: 'EcoBrand Identity',
      category: 'Branding',
      image: 'https://via.placeholder.com/400x300?text=EcoBrand'
    },
    {
      title: 'Food Packaging',
      category: 'Packaging',
      image: 'https://via.placeholder.com/400x300?text=Food+Packaging'
    },
    {
      title: 'Tech Conference',
      category: 'Print',
      image: 'https://via.placeholder.com/400x300?text=Tech+Conference'
    },
    {
      title: 'Fashion Campaign',
      category: 'Digital',
      image: 'https://via.placeholder.com/400x300?text=Fashion+Campaign'
    }
  ];

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Projects</h2>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Explore our portfolio of successful projects that showcase our creativity and expertise.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollAnimation 
              key={index} 
              animation="fade-in-up" 
              delay={0.2 * index}
            >
              <div className="card rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary font-semibold">{project.category}</span>
                  <h3 className="text-xl font-semibold mt-2">{project.title}</h3>
                  <button className="mt-4 text-primary font-semibold hover:underline">
                    View Project →
                  </button>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-in-up" delay={0.8}>
          <div className="text-center mt-12">
            <button className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
              View Full Portfolio
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Projects;