import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronDown, FiStar } from 'react-icons/fi';
import Ourvision from '../../assets/homepage/ourvision.png';
import Whatwebelieve from '../../assets/homepage/watwebelieve.png';
import Howweare from '../../assets/homepage/watweb.png';
import { useTheme } from '../../ThemeContext'; // Import useTheme

const categories = ['Web Apps', 'Mobile Apps', 'Softwares', 'Others'];

const AppCard = ({ name, description, icon, category, rating, date, isDarkMode }) => (
  <motion.div
    className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${
      isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    layout
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <img src={icon} alt={name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{name}</h3>
          <span className={`text-sm ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{category}</span>
        </div>
      </div>
      <p className={`text-gray-600 mb-4 ${isDarkMode ? 'text-gray-300' : ''}`}>{description}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FiStar className={`text-yellow-400 mr-1 ${isDarkMode ? 'text-yellow-300' : ''}`} />
          <span className={`font-semibold ${isDarkMode ? 'text-gray-100' : ''}`}>{rating}</span>
        </div>
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{date}</span>
      </div>
      <button className={`bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors duration-300 ${
        isDarkMode ? 'hover:bg-indigo-700' : 'hover:bg-indigo-700'
      }`}>
        Try Now
      </button>
    </div>
  </motion.div>
);

const AppShop = () => {
  const { isDarkMode } = useTheme(); // Use dark mode state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedYear, setSelectedYear] = useState('');
  const [apps, setApps] = useState([]);

  // Simulated data fetch
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const fetchedApps = [
      {
        id: 1,
        name: 'AI Writing Assistant',
        description: 'Enhance your writing with AI-powered suggestions and corrections.',
        icon: Ourvision,
        category: 'Web Apps',
        rating: 4.8,
        date: '2023-05-10',
      },
      {
        id: 2,
        name: 'Smart Home Controller',
        description: 'Control all your smart home devices from one intuitive mobile app.',
        icon: Whatwebelieve,
        category: 'Mobile Apps',
        rating: 4.6,
        date: '2022-11-20',
      },
      {
        id: 3,
        name: 'AI Image Generator',
        description: 'Create stunning images from text descriptions using advanced AI.',
        icon: Howweare,
        category: 'Softwares',
        rating: 4.9,
        date: '2023-03-15',
      },
      // Add more apps here...
    ];
    setApps(fetchedApps);
  }, []);

  const sortedApps = [...apps].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const filteredApps = sortedApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesYear = selectedYear === '' || new Date(app.date).getFullYear() === parseInt(selectedYear);
    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className={`text-5xl font-extrabold text-center mb-12 bg-clip-text ${
            isDarkMode ? 'text-gradient-to-r from-indigo-600 to-purple-600' : 'text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'
          }`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Amazing AI Apps
        </motion.h1>
        
        <div className="mb-12 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for apps..."
              className={`w-full pl-10 pr-4 py-3 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-indigo-300 text-gray-900'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-indigo-400'
            } text-xl`} />
          </div>
          <div className="relative">
            <select
              className={`appearance-none border-2 rounded-full px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-indigo-300 text-gray-900'
              }`}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <FiChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-indigo-400'
            }`} />
          </div>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                sortOrder === 'newest' ? (isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white') : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white border border-gray-300 text-gray-600')
              }`}
              onClick={() => setSortOrder('newest')}
            >
              Newest
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                sortOrder === 'oldest' ? (isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white') : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white border border-gray-300 text-gray-600')
              }`}
              onClick={() => setSortOrder('oldest')}
            >
              Oldest
            </button>
          </div>
          <div className="relative flex-grow">
            <input
              type="number"
              placeholder="Enter year..."
              className={`w-full pl-10 pr-4 py-3 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-indigo-300 text-gray-900'
              }`}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredApps.map(app => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                layout
              >
                <AppCard {...app} isDarkMode={isDarkMode} /> {/* Pass isDarkMode here */}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredApps.length === 0 && (
          <motion.p
            className={`text-center text-xl mt-12 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No apps found. Try adjusting your search or filter.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default AppShop;
