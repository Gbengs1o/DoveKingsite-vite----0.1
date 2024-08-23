import React, { useState, useEffect, useCallback } from 'react';
import Affordable from '../../assets/aboutpage/about future courosel/affordablerobotics.png';
import SpaceExploration from '../../assets/aboutpage/about future courosel/SpaceExploration.png';
import Agriculture from '../../assets/aboutpage/about future courosel/Agriculture.png';
import Medicine from '../../assets/aboutpage/about future courosel/Medicine.png';
import { useTheme } from './../../ThemeContext';
import { Link } from 'react-router-dom'; // Import Link

const slides = [
  {
    image: Affordable,
    title: "Affordable Robotics",
    description: "We're diving into robotics to build affordable solutions that significantly improve everyday life.",
  },
  {
    image: Medicine,
    title: "Lively Tech in Medicine",
    description: "Our smart technology aims to revolutionize the medical sector, helping doctors analyze diseases and make sense of data, ultimately saving lives and reducing costs.",
  },
  {
    image: Agriculture,
    title: "Sustainable Agriculture",
    description: "We're exploring innovative ways to produce food at scale with minimal impact on the ecosystem, ensuring a sustainable future for all.",
  },
  {
    image: SpaceExploration,
    title: "Space Exploration",
    description: "Our ambitious plans include venturing into space travel and exploration, pushing the boundaries of human knowledge and capability.",
  },
];

const FuturePlansSlideshow = () => {
  const { isDarkMode } = useTheme(); // Use dark mode state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    setIsAutoPlaying(false);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  }, []);

  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className={`relative h-screen w-full overflow-hidden transition-all duration-300 ${
      isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-700' : 'bg-gradient-to-b from-blue-500 to-blue-800'
    }`}>
      <h1 className="text-center text-4xl font-bold py-4 text-white">
        We Are Going Far
      </h1>

      {isDarkMode && (
        <>
          <div className="absolute top-0 left-0 w-full h-1 bg-white"></div> {/* White line for dark mode at the top */}
        </>
      )}

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className={`max-w-4xl w-full rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-90'
        }`}>
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-6 text-center">
            <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-blue-800'
            }`}>
              {slides[currentSlide].title}
            </h2>
            <p className={`text-lg mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {slides[currentSlide].description}
            </p>
            <Link to="/SupportUsPage">
              <button className={`font-bold py-2 px-6 rounded-full transition duration-300 ${
                isDarkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                Support Us
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <button 
        onClick={prevSlide} 
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition duration-300 text-2xl font-bold ${
          isDarkMode ? 'bg-gray-700 bg-opacity-70 text-white hover:bg-opacity-90' : 'bg-white bg-opacity-50 text-blue-800 hover:bg-opacity-75'
        }`}
      >
        &#8249;
      </button>
      <button 
        onClick={nextSlide} 
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition duration-300 text-2xl font-bold ${
          isDarkMode ? 'bg-gray-700 bg-opacity-70 text-white hover:bg-opacity-90' : 'bg-white bg-opacity-50 text-blue-800 hover:bg-opacity-75'
        }`}
      >
        &#8250;
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                isDarkMode ? (index === currentSlide ? 'bg-white' : 'bg-gray-500') : (index === currentSlide ? 'bg-blue-800' : 'bg-gray-400')
              }`}
            ></div>
          ))}
        </div>
      </div>

      {isDarkMode && (
        <>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white"></div> {/* White line for dark mode at the bottom */}
        </>
      )}
    </div>
  );
};

export default FuturePlansSlideshow;
