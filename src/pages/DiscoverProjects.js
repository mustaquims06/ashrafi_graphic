import React from "react";
import "../styles/index.css";

// Graphic Design - Posters
import poster1 from "../assets/discover/poster1.jpg";
import poster2 from "../assets/discover/poster2.png";
import poster3 from "../assets/discover/poster3.jpg";
import poster4 from "../assets/discover/poster4.png";

// Graphic Design - Logos
import logo1 from "../assets/discover/logo1.jpg";
import logo2 from "../assets/discover/logo2.jpg";
import logo3 from "../assets/discover/logo3.png";
import logo4 from "../assets/discover/logo4.jpg";

// Graphic Design - Thumbnail
import thumbnail1 from "../assets/discover/thumbnail1.jpg";
import thumbnail2 from "../assets/discover/thumbnail2.jpg";
import thumbnail3 from "../assets/discover/thumbnail3.png";
import thumbnail4 from "../assets/discover/thumbnail4.jpg";

export default function DiscoverProjects() {
  const services = [
    {
      id: 1,
      title: "Graphic Design - Posters",
      photos: [poster1, poster2, poster3, poster4],
    },
    {
      id: 2,
      title: "Graphic Design - Logos",
      photos: [logo1, logo2, logo3, logo4],
    },
    {
      id: 3,
      title: "Graphic Design - Thumbnails",
      photos: [thumbnail1, thumbnail2, thumbnail3, thumbnail4],
    },
  ];

  return (
    <div className="min-h-screen gradient-bg p-8">
      <h1 className="text-4xl font-bold text-center gold-text mb-12">
        Discover Our Projects
      </h1>

      <div className="space-y-16 max-w-6xl mx-auto">
        {services.map((service) => (
          <div key={service.id}>
            {/* Service Heading */}
            <h2 className="text-2xl font-bold mb-6 text-center gold-text">
              {service.title}
            </h2>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {service.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="w-full aspect-square bg-white rounded-xl shadow-md flex items-center justify-center overflow-hidden hover:scale-105 transition-transform"
                >
                  <img
                    src={photo}
                    alt={`${service.title} ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
