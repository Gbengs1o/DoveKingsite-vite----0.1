import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';

import Ourvision from '../../assets/homepage/ourvision.png';
import Whatwebelieve from '../../assets/homepage/watwebelieve.png';
import Howweare from '../../assets/homepage/watweb.png';

const OurValuesHeroSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      image: Ourvision,
      number: '01',
      title: 'Innovation',
      description: 'Advancing innovative ideas for a better future',
    },
    {
      image: Whatwebelieve,
      number: '02',
      title: 'Collaboration',
      description: 'Promoting unity and teamwork in pursuit of a common objective',
    },
    {
      image: Howweare,
      number: '03',
      title: 'Empathy',
      description: 'Recognizing the role of humans in technological development',
    },
  ];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-blue-900' : 'bg-gradient-to-b from-blue-50 to-blue-100'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            OUR VALUES
            <span className="block w-24 h-1 bg-blue-500 mx-auto mt-4"></span>
          </h1>
          <h2 className={`text-xl sm:text-2xl ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
            Our defining characteristics are
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out
                ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
                ${activeCard === index ? 'ring-4 ring-blue-400 ring-opacity-50 transform scale-105' : ''}
                hover:shadow-2xl hover:scale-105
              `}
            >
              <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-5xl font-bold text-blue-500 mb-4">{card.number}</div>
                <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className={`
              inline-block px-8 py-3 text-lg font-semibold rounded-full transition-colors duration-300
              ${isDarkMode
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'}
            `}
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurValuesHeroSection;