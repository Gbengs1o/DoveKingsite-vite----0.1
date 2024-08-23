import React from 'react';
import { Link } from 'react-router-dom';
import './storepage.css';
import { useTheme } from './../ThemeContext'; // Import useTheme

const Storepage = () => {
  const { isDarkMode } = useTheme(); // Use dark mode state

  return (
    <div className={`storepage-container ${
      isDarkMode ? 'bg-dark-gradient' : 'bg-light-gradient'
    }`}>
      <div className={`content-wrapper ${
        isDarkMode ? 'dark-content-wrapper' : 'light-content-wrapper'
      }`}>
        <h1 className={`main-title ${
          isDarkMode ? 'text-dark-main-title' : 'text-light-main-title'
        }`}>Welcome to Our AI Hub</h1>
        <div className="options-container">
          <div className={`option ${
            isDarkMode ? 'dark-option' : 'light-option'
          }`}>
            <h2 className={`option-title ${
              isDarkMode ? 'text-dark-option-title' : 'text-light-option-title'
            }`}>AI Code Store</h2>
            <p className={`option-description ${
              isDarkMode ? 'text-dark-option-description' : 'text-light-option-description'
            }`}>
              Access our store featuring codes for various AI apps we've built, both free and paid. Each comes with a detailed tutorial on implementation. Sign in to explore our collection.
            </p>
            <Link to="/ai-code-store">
              <button className={`cta-button ${
                isDarkMode ? 'dark-cta-button' : 'light-cta-button'
              }`}>Visit Store</button>
            </Link>
          </div>
          <div className={`option ${
            isDarkMode ? 'dark-option' : 'light-option'
          }`}>
            <h2 className={`option-title ${
              isDarkMode ? 'text-dark-option-title' : 'text-light-option-title'
            }`}>Our AI Apps</h2>
            <p className={`option-description ${
              isDarkMode ? 'text-dark-option-description' : 'text-light-option-description'
            }`}>
              Discover a range of AI applications we've created to serve people and reflect our goals. These apps showcase our commitment to improving lives through technology.
            </p>
            <Link to="/app-shop">
              <button className={`cta-button ${
                isDarkMode ? 'dark-cta-button' : 'light-cta-button'
              }`}>Explore Apps</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storepage;
