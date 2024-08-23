import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './../ThemeContext'; // Make sure to import the ThemeContext

const ErrorPage = () => {
  const { isDarkMode } = useTheme(); // Get the current theme state

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${
      isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'
    }`}>
      <h1 className={`text-4xl font-bold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>404</h1>
      <p className="text-lg mb-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/home" className={`text-blue-500 hover:text-blue-700 transition duration-300 ${
        isDarkMode ? 'text-indigo-400 hover:text-indigo-600' : 'text-blue-500 hover:text-blue-700'
      }`}>
        Go back to the homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
