import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import { FaArrowRight } from 'react-icons/fa'; // Import arrow icon

const ServiceCard = ({ title, description, cta, link }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className={`rounded-lg shadow-lg p-8 mb-8 transition-all duration-300 hover:shadow-xl ${
        isDarkMode 
          ? 'bg-gray-800 text-gray-100 border border-gray-700' 
          : 'bg-white text-gray-800 border border-gray-200'
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className={`text-2xl font-bold mb-4 ${
        isDarkMode ? 'text-indigo-400' : 'text-indigo-700'
      }`}>
        {title}
      </h3>
      <p className={`text-base mb-6 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {description}
      </p>
      <Link
        to={link}
        className={`inline-flex items-center font-semibold py-2 px-4 rounded-full transition-all duration-300 ${
          isDarkMode 
            ? 'bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-lg' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
        }`}
      >
        {cta}
        <FaArrowRight className="ml-2" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;