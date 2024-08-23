import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import { useTheme } from './../../ThemeContext'; // Correct import path

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const AboutHeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative overflow-hidden bg-cover bg-center min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900 opacity-70"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      ></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center"
      >
        <h1 className={`text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Connecting Hearts Through Technology
        </h1>
        <p className={`text-xl mb-8 max-w-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Embark on a journey where innovation meets compassion, creating meaningful impact in the digital age.
        </p>
        <Player
          src="https://lottie.host/86c6b451-8327-4f3d-a24c-6d47111b14cc/9aAliQybI8.json"
          className="mb-8"
          loop
          autoplay
          style={{ width: '300px', height: '300px' }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-full text-lg font-semibold ${isDarkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} hover:shadow-lg transition-all duration-300`}
          onClick={() => window.location.href='/contact'}
        >
          Start Your Journey
        </motion.button>
      </motion.div>
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};

export default AboutHeroSection;
