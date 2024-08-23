import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStore, FaBlog, FaHome, FaInfoCircle, FaCog, FaEnvelope, FaSun, FaMoon, FaEye, FaEyeSlash, FaRobot } from 'react-icons/fa';
import Logo from '../assets/navbar/logotrans.png';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext'; // Import useTheme hook

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme(); // Access theme state and toggle function

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navbar after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Define navigation items
  const navItems = [
    { name: 'Home', icon: FaHome, path: '/home' },
    { name: 'About', icon: FaInfoCircle, path: '/about' },
    { name: 'Services', icon: FaCog, path: '/services' },
    { name: 'Contact', icon: FaEnvelope, path: '/contact' },
    { name: 'Store', icon: FaStore, path: '/store' },
    { name: 'Blog', icon: FaBlog, path: '/blog' },
  ];

  // Mobile navbar component
  const MobileNavbar = () => (
    <div className="flex justify-between items-center w-full py-4 px-4 rounded-2xl">
      <ThemeToggle /> {/* Theme toggle button */}
      <LogoButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMobile={true} /> {/* Logo button */}
      <VisibilityToggle isVisible={isVisible} setIsVisible={setIsVisible} /> {/* Visibility toggle button */}
    </div>
  );

  const DesktopNavbar = () => (
    <div className="container mx-auto px-9 py-2 flex items-center justify-between rounded-2xl">
      <div className="flex items-center space-x-9">
        <LogoButton onClick={toggleTheme} isMobile={false} />
        {navItems.map((item) => (
          <NavItem key={item.name} item={item} isScrolled={isScrolled} isDarkMode={isDarkMode} />
        ))}
        <AskAIButton isMobile={false} isDarkMode={isDarkMode} />
        <VisibilityToggle isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>
    </div>
  );
  
  
  

  // Main Navbar component
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
          <MobileNavbar /> {/* Mobile navbar */}
        </div>
        <div className="hidden lg:block">
          <DesktopNavbar /> {/* Desktop navbar */}
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
              <AskAIButton isMobile={true} isDarkMode={isDarkMode} /> {/* Ask AI button for mobile */}
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
             // Reset to light mode on visibility toggle
          }}
          className="fixed top-4 right-4 z-50 p-2 bg-blue-500 text-white rounded-full shadow-lg"
        >
          <FaEye />
        </motion.button>
      )}
    </>
  );
};

// Individual navigation item component
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

// Theme toggle button component
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Access theme state and toggle function

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme} // Toggle theme on click
      className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
    >
      {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
    </motion.button>
  );
};

// Visibility toggle button component
const VisibilityToggle = ({ isVisible, setIsVisible }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={() => setIsVisible(!isVisible)} // Toggle visibility on click
    className={`p-1 rounded-full ${isVisible ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
  >
    {isVisible ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
  </motion.button>
);

// Logo button component
const LogoButton = ({ onClick, isMobile }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center cursor-pointer ${isMobile ? 'mx-auto' : ''}`}
    onClick={onClick} // Trigger action on logo click
  >
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full shadow-lg">
      <img src={Logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain" />
    </div>
  </motion.div>
);

// Ask AI button component
const AskAIButton = ({ isMobile, isDarkMode }) => (
  <Link to="/" className="no-underline">
    <motion.div
      className={`flex items-center justify-center space-x-1 font-medium text-sm 
        ${isMobile ? 'w-full py-2 px-4' : 'py-1 px-3'} 
        bg-gradient-to-r from-blue-500 to-purple-600 text-white
        rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-500 transition-colors duration-300`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaRobot className="text-lg" />
      <span>Ask AI</span>
    </motion.div>
  </Link>
);
export default Navbar;
