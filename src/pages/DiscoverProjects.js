// src/pages/DiscoverProjects.js
import React from "react";
import "../styles/index.css";

const DiscoverProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Creative Poster Design",
      description: "Unique poster design with premium gold theme.",
      image: "/assets/discover/project1.png",
    },
    {
      id: 2,
      title: "Brand Logo Design",
      description: "Luxury-inspired brand logos with a professional touch.",
      image: "/assets/discover/project2.png",
    },
    {
      id: 3,
      title: "Digital Marketing Banner",
      description: "Stylish banners to boost online presence.",
      image: "/assets/discover/project3.png",
    },
  ];

  return (
    <div className="min-h-screen gradient-bg p-8">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-center gold-text mb-12">
        Discover Our Projects
      </h1>

      {/* Project Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="card rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold gold-text">
                {project.title}
              </h2>
              <p className="text-sm mt-2">{project.description}</p>
              <button className="mt-4 px-4 py-2 bg-[var(--primary)] text-black rounded-lg font-semibold hover:bg-yellow-500 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverProjects;
