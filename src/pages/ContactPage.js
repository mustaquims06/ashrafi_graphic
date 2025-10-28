// src/pages/ContactPage.js
import React, { useState } from "react";
import ScrollAnimation from "../components/ScrollAnimation";
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false); // ✅ For Success Modal

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Server response:', data); // Debug log

      setShowModal(true);
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again. ' + error.message);
    }
  };

  // Dropdown options
  const serviceOptions = [
    { value: "", label: "Select a Service (optional)" },
    { value: "graphic-design", label: "🎨 Graphic Design" },
    { value: "video-editing", label: "🎬 Video Editing" },
    { value: "music-distribution", label: "🎵 Music Distribution" },
  ];

  return (
    <div className="pt-24 pb-16 bg-[var(--bg-color)]">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 gold-text">
            Contact Us
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in-up" delay={0.2}>
          <p className="text-xl text-center text-[var(--text-color)] mb-12 max-w-3xl mx-auto">
            Have a project in mind? Want to learn more about our services?
            <br />
            Drop us a message below!
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <ScrollAnimation animation="slide-in-left" delay={0.2}>
            <div className="card rounded-lg p-8 shadow-md bg-[var(--card-bg)]">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-[var(--text-color)]"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent
                               bg-[var(--card-bg)] text-[var(--text-color)]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-[var(--text-color)]"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent
                               bg-[var(--card-bg)] text-[var(--text-color)]"
                  />
                </div>

                {/* Subject (Dropdown) */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 font-medium text-[var(--text-color)]"
                  >
                    Subject (optional)
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent
                               bg-[var(--card-bg)] text-[var(--text-color)]"
                  >
                    {serviceOptions.map((opt, i) => (
                      <option key={i} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 font-medium text-[var(--text-color)]"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent
                               bg-[var(--card-bg)] text-[var(--text-color)]"
                  ></textarea>
                </div>

                {/* Themed Button */}
                <button
                  type="submit"
                  className="w-full bg-[var(--primary)] text-white px-6 py-3 
                             rounded-lg font-semibold shadow-md
                             hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                             transition-all duration-300"
                >
                  🚀 Send Message
                </button>
              </form>
            </div>
          </ScrollAnimation>

          {/* Contact Info */}
          <ScrollAnimation animation="slide-in-right" delay={0.3}>
            <div className="card rounded-lg p-8 shadow-md bg-[var(--card-bg)] space-y-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div>
                <h3 className="text-lg font-semibold mb-2 gold-text">📍 Address</h3>
                <p className="text-[var(--text-color)]">
                  Doodh Bazar <br />
                  Nashik, MAHARASHTRA
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 gold-text">📞 Phone</h3>
                <p className="text-[var(--text-color)]">(+91) 8007869205</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 gold-text">📧 Email</h3>
                <p className="text-[var(--text-color)]">ashrafigraphicservices@gmail.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 gold-text">⏰ Business Hours</h3>
                <p className="text-[var(--text-color)]">
                  Mon-Fri: 9am - 6pm <br />
                  Sat: 10am - 4pm <br />
                  Sun: Closed
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* ✅ Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-[var(--card-bg)] rounded-lg shadow-xl p-8 w-[90%] max-w-md text-center 
                       transform transition-all duration-300 scale-100 animate-pop"
          >
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2 gold-text">Message Sent!</h2>
            <p className="text-[var(--text-color)] mb-6">
              Thank you for reaching out. We’ll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg 
                         hover:scale-[1.05] active:scale-[0.95] transition-transform"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;