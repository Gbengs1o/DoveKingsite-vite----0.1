import React, { useState, useEffect, useContext } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HeroBackground from '../../assets/homepage/Herobackground.png';
import Logo from '../../assets/homepage/logotrans.png';
import Ourvision from '../../assets/homepage/elevate potential with tech.png';
import Whatwedo from '../../assets/homepage/build and upgrade.png';
import Howweare from '../../assets/homepage/innovation.png';
import { useTheme } from './../../ThemeContext'; // Import the custom hook for theme context

const CarouselMiddle = () => {
  const { isDarkMode } = useTheme(); // Get the current theme mode
  const [contentIndex, setContentIndex] = useState(0);

  const contents = [
    {
      title: "Why We Do This?",
      description: "Please forget all the negative hype on AI or technology in general. It is just a tool, and we believe it is our best tool yet.",
      image: Howweare
    },
    {
      title: "What We Do?",
      description: "Build and upgrade in a nutshell. Need a site, app, system, or already have one? We just make it work better with our knowledge in advanced tech, mostly AI. Reach out to us and we will build it .",
      image: Whatwedo
    },
    {
      title: "Our Vision",
      description: "Plain and simple, we  push technology to do what it was meant to do - help humanity get things done better and faster. Nothing too fancy.",
      image: Ourvision
    }
  ];

  const handleNextContent = () => {
    setContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
  };

  const handlePreviousContent = () => {
    setContentIndex((prevIndex) => (prevIndex - 1 + contents.length) % contents.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNextContent, 20000); // 20000 ms = 20 seconds
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const { title, description, image } = contents[contentIndex];

  return (
    <div
      className={`flex items-center justify-between w-full p-6 ${
        isDarkMode
          ? 'bg-gradient-to-b from-gray-800 via-gray-900 to-black'
          : 'bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800'
      }`}
    >
      {/* Left Arrow */}
      <button
        className={`text-white text-2xl p-2 rounded-full ${
          isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
        }`}
        onClick={handlePreviousContent}
      >
        <FaArrowLeft />
      </button>

      {/* Center Section */}
      <div className="flex-1 text-center px-6">
        <div>
          <h1
            className={`text-3xl font-bold mb-4 underline ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            {title}
          </h1>
          <div className="mt-6">
            <img
              src={image}
              alt="Content visual"
              className="mx-auto w-full max-w-lg rounded-lg shadow-lg"
            />
          </div>
          <h2
            className={`text-xl mb-6 mt-4 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}
          >
            {description}
          </h2>
          <Link
            to="/services"
            className={`inline-block px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-800 hover:bg-gray-200'
            }`}
          >
            VIEW SERVICES
          </Link>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {contents.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === contentIndex ? 'bg-white' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        className={`text-white text-2xl p-2 rounded-full ${
          isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
        }`}
        onClick={handleNextContent}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default CarouselMiddle;
