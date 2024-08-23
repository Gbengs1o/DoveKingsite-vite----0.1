import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiUser, FiTag, FiArrowRight } from 'react-icons/fi';
import Ourvision from '../../assets/homepage/ourvision.png';
import Whatwebelieve from '../../assets/homepage/watwebelieve.png';
import Howweare from '../../assets/homepage/watweb.png';
import { useTheme } from './../../ThemeContext';

const BlogCard = ({ title, excerpt, author, date, category, image, onClick }) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div 
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      onClick={onClick}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className={`absolute top-0 right-0 m-2 px-2 py-1 text-xs font-semibold rounded ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}>
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{excerpt}</p>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <FiUser className="mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-1" />
            <span>{date}</span>
          </div>
        </div>
        <button 
          className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          onClick={onClick}
        >
          Read More
        </button>
      </div>
    </motion.div>
  );
};

const FeaturedPost = ({ title, excerpt, author, date, category, image, onClick }) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div 
      className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
      onClick={onClick}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img src={image} alt={title} className="h-48 w-full object-cover md:w-48" />
        </div>
        <div className="p-8">
          <div className={`uppercase tracking-wide text-sm font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {category}
          </div>
          <h2 className="mt-2 text-2xl font-bold">{title}</h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{excerpt}</p>
          <div className="mt-4 flex justify-between items-center text-sm">
            <div className="flex items-center">
              <FiUser className="mr-1" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-1" />
              <span>{date}</span>
            </div>
          </div>
          <button 
            className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            onClick={onClick}
          >
            Read More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterYear, setFilterYear] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Simulated data fetch
    const fetchedPosts = [
      {
        id: 1,
        title: "The Future of AI in Healthcare",
        excerpt: "Exploring how artificial intelligence is revolutionizing medical diagnosis and treatment...",
        author: "Dr. Jane Smith",
        date: "2023-05-15",
        category: "Healthcare",
        image: Ourvision
      },
      {
        id: 2,
        title: "Machine Learning for Climate Change Prediction",
        excerpt: "How advanced algorithms are helping scientists forecast and mitigate climate change...",
        author: "Prof. John Doe",
        date: "2023-05-10",
        category: "Environment",
        image: Whatwebelieve
      },
      {
        id: 3,
        title: "AI in Everyday Life",
        excerpt: "How AI is being integrated into daily activities and improving efficiency...",
        author: "Alex Johnson",
        date: "2023-05-12",
        category: "Technology",
        image: Howweare
      },
      // Add more blog posts here...
    ];
    setPosts(fetchedPosts);
    setFeaturedPost(fetchedPosts[0]); // Set the first post as featured
  }, []);

  const handlePostClick = (post) => {
    // Navigate to individual blog post page
    console.log(`Navigating to post: ${post.title}`);
  };

  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => 
      filterYear === "" || new Date(post.date).getFullYear().toString() === filterYear
    )
    .sort((a, b) => 
      sortOrder === "newest" 
        ? new Date(b.date) - new Date(a.date) 
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="mb-12">
        <motion.h1
          className="text-4xl font-bold text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our AI Insights
        </motion.h1>
      </div>

      <div className="mb-8 flex flex-wrap justify-between items-center">
        <input 
          type="text" 
          placeholder="Search posts..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full md:w-1/3 px-4 py-2 rounded-full mb-4 md:mb-0 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
        />
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-semibold ${sortOrder === 'newest' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`} 
            onClick={() => setSortOrder('newest')}
          >
            Newest
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-semibold ${sortOrder === 'oldest' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`} 
            onClick={() => setSortOrder('oldest')}
          >
            Oldest
          </button>
        </div>
        <input 
          type="text" 
          placeholder="Filter by Year" 
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className={`w-full md:w-1/4 px-4 py-2 rounded-full mt-4 md:mt-0 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
        />
      </div>

      {featuredPost && (
        <div className="mb-12">
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Featured Post</h2>
          <FeaturedPost {...featuredPost} onClick={() => handlePostClick(featuredPost)} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogCard {...post} onClick={() => handlePostClick(post)} />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className={`px-6 py-3 rounded-full text-lg font-semibold flex items-center justify-center mx-auto transition-colors duration-300 ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          Load More Posts
          <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Blog;