import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './../../ThemeContext'; // Correct import path

const AboutMidHeroSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative flex items-center justify-center w-full p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className={`text-4xl font-bold mb-4 underline ${isDarkMode ? 'text-white' : 'text-black'}`}>
          About us
        </h1>
        <h2 className={`text-2xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
        Money Saved, Done in No Time.
        </h2>
        <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
        That's basically it - all technology helps us achieve things better, faster, and cheaper in some cases. But of recent, we have had a miraculous breakthrough. Machines can now, to a certain level, think, operate, and carry out tasks on a level equal to or better than people.
        Yes, I am talking about AI. Even though it is new, it has a lot of potential. It could be all your business needs. How?

           </p>
        <Link
          to="/about"
          className={`inline-block text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-800'
          }`}
        >
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default AboutMidHeroSection;
