import React, { useState, useEffect } from 'react';
import { useTheme } from './../../ThemeContext'; // Correct import path
import HeroBackground from '../../assets/aboutpage/ourstory/Herobackground.png';
import Logo from '../../assets/aboutpage/ourstory/logotrans.png';

const OurStoryAbout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDarkMode } = useTheme(); // Get dark mode status from context
  const slides = [HeroBackground, Logo]; // Add more images to this array as needed

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 sm:p-6 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-100 to-white'}`}>
      <div className={`max-w-6xl w-full flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]`}>
        {/* Slideshow */}
        <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto relative overflow-hidden group">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-110`}
            />
          ))}
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-black opacity-40' : 'bg-black opacity-0 group-hover:opacity-20'} transition-opacity duration-300`}></div>
        </div>

        {/* Content */}
        <div className={`w-full lg:w-1/2 p-6 sm:p-8 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600' : 'bg-gradient-to-r from-blue-200 via-blue-100 to-white'} transition-all duration-300 ${isDarkMode ? 'hover:from-gray-700 hover:via-gray-600 hover:to-gray-500' : 'hover:from-blue-300 hover:via-blue-200 hover:to-blue-100'}`}>
          <h1 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 transition-colors duration-300 ${isDarkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-800 hover:text-blue-600'}`}>Discover the Story Behind DoveKings</h1>
          <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 transition-colors duration-300 ${isDarkMode ? 'text-blue-200 hover:text-blue-300' : 'text-blue-700 hover:text-blue-500'}`}>Let there be life, and there was life</h2>
          <div className={`text-sm sm:text-base space-y-3 sm:space-y-4 transition-all duration-300 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'}`}>
            <p className="hover:translate-x-1">
            DoveKings was originally started as a side hustle by me and my brother. We built sites for local businesses around that, along with a wide range of services. This brought money, although not much at the time, but it kept us going.

            </p>
            <p className="hover:translate-x-1">
            But we have always been dreamers, and although we clearly didn't know what yet, we wanted to do something innovative with DoveKings. Then something happened - I have little sisters who would come asking me for help with schoolwork all the time. But me managing the new business and all, there wasn't much time at all. Then I had an idea - at that time, AI technology was just at its peak of being recognized by a global audience. But we in the tech space already knew about it by then.
            
            
            </p>
            <p className="hover:translate-x-1">
            So I built them an AI-powered app that helped them out. I was so astonished by the results - it helped them with their homework just fine, in fact, I wasn't even needed that much, if at all. The AI was called 'Aunty Funke.' That was an eye-opener for me, and I knew finally what DoveKings could do to truly impact the world.

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryAbout;
