import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStore, FaBlog, FaHome, FaInfoCircle, FaCog, FaEnvelope, FaSun, FaMoon, FaEye, FaEyeSlash, FaRobot } from 'react-icons/fa';
import Logo from '../assets/navbar/logotrans.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Hide navbar after 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', icon: FaHome, path: '/' },
    { name: 'About', icon: FaInfoCircle, path: '/about' },
    { name: 'Services', icon: FaCog, path: '/services' },
    { name: 'Contact', icon: FaEnvelope, path: '/contact' },
    { name: 'Store', icon: FaStore, path: '/store' },
    { name: 'Blog', icon: FaBlog, path: '/blog' },
  ];

  const handleDesktopLogoClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  const MobileNavbar = () => (
    <div className="flex justify-between items-center w-full py-4 px-4 rounded-2xl">
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <LogoButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMobile={true} />
      <VisibilityToggle isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  );

  const DesktopNavbar = () => (
    <div className="container mx-auto px-4 py-2 flex items-center justify-between rounded-2xl">
      <div className="flex items-center space-x-9">
        <LogoButton onClick={handleDesktopLogoClick} isMobile={false} />
        {navItems.map((item) => (
          <NavItem key={item.name} item={item} isScrolled={isScrolled} isDarkMode={isDarkMode} />
        ))}
        <AskAIButton isMobile={false} isDarkMode={isDarkMode} />
        <VisibilityToggle isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>
      <div className="flex items-center space-x-2"></div>
    </div>
  );

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl ${
          isScrolled ? (isDarkMode ? 'bg-gray-900 shadow-lg' : 'bg-white shadow-lg') : 'bg-transparent'
        } ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
      >
        <div className="lg:hidden">
          <MobileNavbar />
        </div>
        <div className="hidden lg:block">
          <DesktopNavbar />
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden fixed top-24 left-4 right-4 w-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-40 rounded-2xl`}
          >
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                className={`flex items-center space-x-4 px-6 py-4 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'} transition-colors duration-300 rounded-lg`}
                whileHover={{ x: 10 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <Link to={item.path}>
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
            <div className="px-6 py-4">
              <AskAIButton isMobile={true} isDarkMode={isDarkMode} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            setIsVisible(true);
            setIsDarkMode(false);
          }}
          className="fixed top-4 right-4 z-50 p-2 bg-blue-500 text-white rounded-full shadow-lg"
        >
          <FaEye />
        </motion.button>
      )}
    </>
  );
};

const NavItem = ({ item, isScrolled, isDarkMode }) => (
  <motion.div
    className={`flex items-center space-x-1 font-medium text-sm ${
      isScrolled
        ? isDarkMode
          ? 'text-white'
          : 'text-gray-800'
        : 'text-white'
    } hover:text-blue-400 transition-colors duration-300 rounded-lg`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <item.icon className="text-lg" />
    <Link to={item.path}>
      <span>{item.name}</span>
    </Link>
  </motion.div>
);

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={() => setIsDarkMode(!isDarkMode)}
    className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
  >
    {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
  </motion.button>
);

const VisibilityToggle = ({ isVisible, setIsVisible }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={() => setIsVisible(!isVisible)}
    className={`p-1 rounded-full ${isVisible ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
  >
    {isVisible ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
  </motion.button>
);

const LogoButton = ({ onClick, isMobile }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center cursor-pointer ${isMobile ? 'mx-auto' : ''}`}
    onClick={onClick}
  >
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full shadow-lg">
      <img src={Logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain" />
    </div>
  </motion.div>
);

const AskAIButton = ({ isMobile, isDarkMode }) => (
  <motion.div
    className={`flex items-center justify-center space-x-1 font-medium text-sm 
      ${isMobile ? 'w-full py-2 px-4' : 'py-1 px-3'} 
      bg-gradient-to-r from-blue-500 to-purple-600 text-white
      rounded-full shadow-lg transition-colors duration-300`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <FaRobot className="text-sm" />
    <Link to="/ask-ai">
      <span>Ask AI</span>
    </Link>
  </motion.div>
);

export default Navbar;

































import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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
          Embark on a journey where innovation meets compassion, creating meaningful connections in the digital age.
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
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};

export default AboutHeroSection;
