import React from "react";

export default function DiscoverProjects() {
  const projects = [
    {
      title: "3D Program Poster",
      description: "High-quality 3D posters designed with modern aesthetics and gold theme.",
      image: "/assets/projects/project1.jpg", 
    },
    {
      title: "Brand Logo Design",
      description: "Creative Islamic and modern brand logo designs for strong identity.",
      image: "/assets/projects/project2.jpg",
    },
    {
      title: "Music Distribution Poster",
      description: "Stylish posters for music distribution across digital platforms.",
      image: "/assets/projects/project3.jpg",
    },
  ];

  return (
    <section className="bg-black min-h-screen py-16 text-white">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <h2 className="text-4xl font-bold text-center mb-12 gold-text">
          Discover Our Projects
        </h2>

        {/* Projects List */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-6"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full md:w-2/3 lg:w-1/2 rounded-lg shadow-lg border-2 border-yellow-600"
              />

              {/* Text */}
              <div>
                <h3 className="text-2xl font-semibold gold-text mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  {project.description}
                </p>
              </div>

              {/* Divider line */}
              <div className="w-24 h-1 bg-yellow-600 mx-auto mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
