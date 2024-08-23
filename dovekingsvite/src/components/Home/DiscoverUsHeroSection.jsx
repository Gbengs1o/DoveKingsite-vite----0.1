import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import { useTheme } from './../../ThemeContext'; // Import theme context

const DiscoverUsHeroSection = () => {
  const { isDarkMode } = useTheme(); // Get theme mode from context

  return (
    <div className={`relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Content */}
      <div className={`relative z-10 text-center p-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <h1 className={`text-3xl font-bold mb-4 underline ${isDarkMode ? 'text-white' : 'text-black'}`}>
          WHY CHOOSE US
        </h1>
        <h2 className={`text-xl mb-12 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
          Discover the DoveKings Distinction
        </h2>

        <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-8">
          {/* Cards Container */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-8">
            {/* Column 1 */}
            <div className={`card ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-6 w-full md:max-w-xs text-center flex flex-col items-center`}>
              <div className={`p-4 border-4 ${isDarkMode ? 'border-blue-300' : 'border-blue-500'}`}>
                <Player
                  src="https://lottie.host/44abb35b-5b6d-435e-9157-eb61d83c780c/9vs2hLkZVN.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '150px', height: '150px' }}
                  loop
                  autoplay
                />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>User-Centric Design</h3>
              <p className={`text-black-400 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                Creating seamless experiences that prioritize user needs and aspirations
              </p>
            </div>

            {/* Column 2 */}
            <div className={`card ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-6 w-full md:max-w-xs text-center flex flex-col items-center`}>
              <div className={`p-4 border-4 ${isDarkMode ? 'border-blue-300' : 'border-blue-500'}`}>
                <Player
                  src="https://lottie.host/6690ae59-bb38-45e3-bdfd-9c57781d81a2/WCIQF5Lbsm.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '150px', height: '150px' }}
                  loop
                  autoplay
                />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Global Impact</h3>
              <p className={`text-black-400 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                Driving positive change on a global scale through innovative technological solutions
              </p>
            </div>

            {/* Column 3 */}
            <div className={`card ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-6 w-full md:max-w-xs text-center flex flex-col items-center`}>
              <div className={`p-4 border-4 ${isDarkMode ? 'border-blue-300' : 'border-blue-500'}`}>
                <Player
                  src="https://lottie.host/6c27b604-1a63-45a4-b62c-12dd020e2dd4/MRucBKVUmv.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '150px', height: '150px' }}
                  loop
                  autoplay
                />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Tech-Human Harmony</h3>
              <p className={`text-black-400 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                Enhancing human-tech interactions for a more empathetic world
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Link */}
        <div className="text-center mt-8">
          <Link
            to="/store"
            className={`inline-block px-6 py-2 rounded-full font-semibold transition-colors ${isDarkMode ? 'bg-blue-700 text-white hover:bg-blue-600' : 'bg-blue-800 text-white hover:bg-blue-700'}`}
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscoverUsHeroSection;
