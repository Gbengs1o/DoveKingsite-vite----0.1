import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';

const JoinDoveKingHeroSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`
        py-16 px-4 sm:px-6 lg:px-8
        ${isDarkMode
          ? 'bg-gradient-to-b from-gray-900 to-gray-800'
          : 'bg-gradient-to-b from-blue-50 to-white'}
      `}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className={`
          text-3xl sm:text-4xl font-extrabold tracking-tight mb-4
          ${isDarkMode ? 'text-white' : 'text-gray-900'}
        `}>
          READY TO DIVE IN?
        </h2>
        <p className={`
          text-xl sm:text-2xl font-semibold mb-8
          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
        `}>
          Join DoveKings and Experience Innovation at Its Best
        </p>
        <Link
          to="/CommunityPage"
          className={`
            inline-flex items-center justify-center px-8 py-3
            border border-transparent text-base font-medium rounded-full
            shadow-sm transition-colors duration-300
            ${isDarkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'}
          `}
        >
          EXPLORE MORE
        </Link>
      </div>
    </div>
  );
};

export default JoinDoveKingHeroSection;