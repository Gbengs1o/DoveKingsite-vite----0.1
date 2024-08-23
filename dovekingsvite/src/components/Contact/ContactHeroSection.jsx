import React from 'react';
import { useTheme } from '../../ThemeContext'; // Import useTheme
import { Link } from 'react-router-dom'; // Import Link

const ContactHeroSection = () => {
  const { isDarkMode } = useTheme(); // Use dark mode state

  return (
    <section className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' : 'bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-100'
    }`}>
      <div
        className={`absolute inset-0 bg-cover bg-center opacity-10 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}
        style={{ backgroundImage: "url('/path/to/your/soft-pattern.jpg')" }}
      ></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 ${
          isDarkMode ? 'text-white' : 'text-indigo-800'
        }`}>
          We're Here to Listen and Help
        </h1>
        <p className={`text-xl sm:text-2xl mb-8 ${
          isDarkMode ? 'text-gray-300' : 'text-indigo-600'
        }`}>
          Your thoughts and ideas matter to us. Let's start a conversation.
        </p>
        <div className={`bg-opacity-90 rounded-lg shadow-xl p-8 mb-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <p className={`text-lg mb-6 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Whether you have a question, suggestion, or just want to chat, we're always excited to hear from you. Your input helps us grow and improve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#contact-form"
              className={`bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
                isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : ''
              }`}
            >
              Reach Out Now
            </a>
            <Link
              to="/FAQPage"
              className={`bg-purple-100 text-black-700 px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-200 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
                isDarkMode ? 'bg-purple-800 text-purple-300 hover:bg-purple-700' : ''
              }`}
            >
              Check Our FAQs
            </Link>
          </div>
        </div>
        <div className={`flex justify-center items-center space-x-6 ${
          isDarkMode ? 'text-gray-300' : 'text-indigo-800'
        }`}>
          <div className="text-center">
            <p className="font-bold text-3xl mb-2">24/7</p>
            <p className="text-sm">Support</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-3xl mb-2">100%</p>
            <p className="text-sm">Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-3xl mb-2">&lt; 1hr</p>
            <p className="text-sm">Response Time</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
