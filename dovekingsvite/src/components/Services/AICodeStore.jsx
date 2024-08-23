import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Ourvision from '../../assets/homepage/ourvision.png';
import Whatwebelieve from '../../assets/homepage/watwebelieve.png';
import { useTheme } from '../../ThemeContext'; // Ensure this import is correct

const categories = ['Mobile Codes', 'Web Codes', 'Designs', 'Apps'];

const CodeItem = ({ title, date, description, image, category, isPaid, isDarkMode }) => (
  <motion.div
    className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}
    whileHover={{ scale: 1.03 }}
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className={`p-6 ${
      isDarkMode ? 'text-gray-100' : 'text-gray-800'
    }`}>
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>{date}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          isPaid ? (isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800') 
                 : (isDarkMode ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800')
        }`}>
          {isPaid ? 'Paid' : 'Free'}
        </span>
      </div>
      <h3 className={`text-xl font-bold mb-2 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-800'
      }`}>{title}</h3>
      <p className={`mb-4 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>{description}</p>
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${
          isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
        }`}>{category}</span>
        <button className={`font-semibold py-2 px-4 rounded-full transition-colors duration-300 ${
          isPaid ? (isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700')
                : (isDarkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700')
        }`}>
          {isPaid ? 'Buy Now' : 'Download'}
        </button>
      </div>
    </div>
  </motion.div>
);

const AICodeStore = () => {
  const { isDarkMode } = useTheme(); // Use dark mode state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedYear, setSelectedYear] = useState('');
  const [items, setItems] = useState([]);

  // Simulated data fetch
  useEffect(() => {
    const fetchedItems = [
      {
        id: 1,
        title: 'AI Chat Bot',
        date: '2023-08-15',
        description: 'A sophisticated AI chatbot for customer service integration.',
        image: Ourvision,
        category: 'Apps',
        isPaid: true,
      },
      {
        id: 2,
        title: 'Neural Network Visualizer',
        date: '2023-07-22',
        description: 'Interactive web-based tool for visualizing neural networks.',
        image: Whatwebelieve,
        category: 'Web Codes',
        isPaid: false,
      },
      {
        id: 3,
        title: 'Baby give it to me',
        date: '2024-07-25',
        description: 'monkey.',
        image: Whatwebelieve,
        category: 'Designs',
        isPaid: false,
      },
      {
        id: 4,
        title: 'home',
        date: '2024-07-28',
        description: 'monkey love.',
        image: Whatwebelieve,
        category: 'Mobile Codes',
        isPaid: false,
      },
      // Add more items here...
    ];
    setItems(fetchedItems);
  }, []);

  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const filteredItems = sortedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesYear = selectedYear === '' || new Date(item.date).getFullYear() === parseInt(selectedYear);
    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className={`text-4xl font-extrabold text-center mb-8 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Code Store
        </motion.h1>
        
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for codes..."
              className={`w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
          </div>
          <div className="relative">
            <select
              className={`appearance-none border rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500'
              }`}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <FiFilter className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
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
              className={`w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 ${
                isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100 focus:ring-indigo-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500'
              }`}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CodeItem {...item} isDarkMode={isDarkMode} /> {/* Pass isDarkMode here */}
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className={`text-center mt-8 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>No items found. Try adjusting your search or filter.</p>
        )}
      </div>
    </div>
  );
};

export default AICodeStore;
