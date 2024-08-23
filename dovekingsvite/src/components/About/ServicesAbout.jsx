import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from './../../ThemeContext'; // Correct import path

const ServiceCard = ({ title, description, ctaText, ctaLink, icon }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className={`rounded-lg shadow-lg p-6 w-80 m-4 border transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800 text-white border-gray-600 hover:shadow-gray-700'
          : 'bg-white text-gray-800 border-gray-200 hover:shadow-lg'
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className={`text-xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h3>
      <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
      <div className="text-center">
        <Link
          to={ctaLink}
          className={`py-2 px-4 rounded transition duration-300 ${
            isDarkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {ctaText}
        </Link>
      </div>
    </motion.div>
  );
};

const AIAppIcon = () => (
  <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.5s" repeatCount="indefinite" />
  </svg>
);

const CodeStoreIcon = () => (
  <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.5s" repeatCount="indefinite" />
  </svg>
);

const AIAppsIcon = () => (
  <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.5s" repeatCount="indefinite" />
  </svg>
);

const ServicesAbout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`py-12 px-4 transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          How Can You Benefit From Us <span className="text-blue-500">(Services)</span>
        </h2>
        <div className="flex flex-wrap justify-center">
          <ServiceCard
            title="AI App Development"
            description="We specialize in building various AI-powered applications for web and mobile platforms. Our expertise lies in creating cutting-edge AI solutions tailored to your specific needs."
            ctaText="Contact Us"
            ctaLink="/contact"
            icon={<AIAppIcon />}
          />
          <ServiceCard
            title="AI Code Store"
            description="Access our store featuring codes for various AI apps we've built, both free and paid. Each comes with a detailed tutorial on implementation. Sign in to explore our collection."
            ctaText="Visit Store"
            ctaLink="/ai-code-store"
            icon={<CodeStoreIcon />}
          />
          <ServiceCard
            title="Our AI Apps"
            description="Discover a range of AI applications we've created to serve people and reflect our goals. These apps showcase our commitment to improving lives through technology."
            ctaText="Explore Apps"
            ctaLink="/app-shop"
            icon={<AIAppsIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesAbout;
