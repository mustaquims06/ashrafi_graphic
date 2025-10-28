// src/pages/BlogPage.js
import React from 'react';
import ScrollAnimation from '../components/ScrollAnimation';

const BlogPage = () => {
  const blogPosts = [
    {
      title: 'The Psychology of Color in Branding',
      excerpt: 'How color choices influence consumer perception and brand recognition.',
      date: 'March 15, 2023',
      category: 'Branding',
      image: 'https://via.placeholder.com/400x250?text=Color+Psychology'
    },
    {
      title: 'Sustainable Packaging Trends for 2023',
      excerpt: 'Exploring eco-friendly packaging solutions that don\'t compromise on design.',
      date: 'February 28, 2023',
      category: 'Packaging',
      image: 'https://via.placeholder.com/400x250?text=Sustainable+Packaging'
    },
    {
      title: 'Typography Tips for Digital Platforms',
      excerpt: 'Best practices for choosing and using fonts in digital design.',
      date: 'February 15, 2023',
      category: 'Digital Design',
      image: 'https://via.placeholder.com/400x250?text=Typography+Tips'
    },
    {
      title: 'The Evolution of Logo Design',
      excerpt: 'How logo design trends have changed over the decades and what\'s next.',
      date: 'January 30, 2023',
      category: 'Design Trends',
      image: 'https://via.placeholder.com/400x250?text=Logo+Design'
    },
    {
      title: 'Creating Effective Brand Guidelines',
      excerpt: 'Why comprehensive brand guidelines are essential for consistency.',
      date: 'January 15, 2023',
      category: 'Branding',
      image: 'https://via.placeholder.com/400x250?text=Brand+Guidelines'
    },
    {
      title: 'Designing for Accessibility',
      excerpt: 'How to create designs that are inclusive and accessible to all users.',
      date: 'December 20, 2022',
      category: 'UI/UX',
      image: 'https://via.placeholder.com/400x250?text=Accessibility'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Our Blog</h1>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Insights, tips, and trends from the world of graphic design and branding.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <ScrollAnimation 
              key={index} 
              animation="fade-in-up" 
              delay={0.1 * index}
            >
              <div className="card rounded-lg overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <span className="text-sm text-primary font-semibold">{post.category}</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="text-sm text-gray-500 mt-auto">{post.date}</div>
                </div>
                <div className="px-6 pb-6">
                  <button className="text-primary font-semibold hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-in-up" delay={0.8}>
          <div className="mt-12 text-center">
            <button className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
              Load More Articles
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default BlogPage;