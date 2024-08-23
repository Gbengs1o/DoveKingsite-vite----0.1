import React from 'react';
import { useTheme } from './../../ThemeContext'; // Import useTheme for dark mode
import { Link } from 'react-router-dom'; // Import Link


const HelpUsAboutSection = () => {
  const { isDarkMode } = useTheme(); // Use dark mode state

  return (
    <div className={`py-12 px-4 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
    }`}>
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          HOW DOES THIS HELP ME?
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        <p className="mb-4">
          Transform your website into an interactive, human-like entity with advanced AI technologies. Enhance user engagement and satisfaction by making interactions feel more natural and intuitive.
        </p>
        <p className="mb-4">
          Build trust and credibility with your audience through seamless interactions. Utilize advanced analytics and engagement tools to continuously improve the user experience, meeting the evolving needs of your customers.
        </p>
        <p className="mb-4">
          Achieve your business goals more effectively with a technology-driven approach. Streamline processes, enhance customer satisfaction, and gain a competitive edge in the digital landscape.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p className="mb-4">
          If you still have questions about our technology, services, or anything at all, ask our AI Dovey or contact us.
        </p>
        <Link to="/contact">
        <button className={`py-2 px-4 rounded transition duration-300 ${
          isDarkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}>
          Contact Us
        </button>
        </Link>

      </div>
    </div>
  );
};

export default HelpUsAboutSection;
