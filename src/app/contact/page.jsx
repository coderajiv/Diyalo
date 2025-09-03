"use client";

import { useState, useTransition } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaSpinner } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitted: false, error: false, message: '' });
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitted: true, error: true, message: 'Please fill out all fields.' });
      return;
    }

    startTransition(() => {
      // Simulate sending a message
      console.log('Contact Form Submitted:', formData);
      
      // In a real app, you would send the data to a server here.
      // For now, we'll just simulate a success state.
      setTimeout(() => {
        setStatus({ submitted: true, error: false, message: 'Thank you for your message! We will get back to you shortly.' });
        setFormData({ name: '', email: '', message: '' });
      }, 1000); // 1-second delay to show loading state
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Please fill out the form below or contact us directly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-xl">
          {/* Contact Information Section */}
          <div className="flex flex-col justify-center space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-2xl text-blue-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Our Address</h3>
                <p className="text-gray-600">Megha Market, Shahid Chowk, Chitwan</p>
                <p className="text-gray-600">Bagmati Province, Nepal</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaPhone className="text-2xl text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Call Us</h3>
                <p className="text-gray-600">+977 9843920374, 9855035776</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-2xl text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Email Us</h3>
                <p className="text-gray-600">rajivdhungana38@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            {status.submitted ? (
              <div className={`p-6 rounded-lg text-center flex flex-col items-center justify-center h-full ${status.error ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
                <h3 className="text-2xl font-semibold">{status.error ? 'Oops!' : 'Thank You!'}</h3>
                <p className="mt-2">{status.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
                >
                  {isPending ? <FaSpinner className="animate-spin" /> : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}