import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { useTheme } from './../../ThemeContext';

const Serve1 = () => {
  const { isDarkMode } = useTheme();

  const services = [
    {
      title: "AI App Development",
      description: "We specialize in building various AI-powered applications for web and mobile platforms. Our expertise lies in creating cutting-edge AI solutions tailored to your specific needs.",
      cta: "Contact Us",
      link: "/contact",
      icon: "📱", // You can replace this with an actual icon component
    },
    {
      title: "AI Code Store",
      description: "Access our store featuring codes for various AI apps we've built, both free and paid. Each comes with a detailed tutorial on implementation. Sign in to explore our collection.",
      cta: "Visit Store",
      link: "/ai-code-store",
      icon: "🏪", // You can replace this with an actual icon component
    },
    {
      title: "Our AI Apps",
      description: "Discover a range of AI applications we've created to serve people and reflect our goals. These apps showcase our commitment to improving lives through technology.",
      cta: "Explore Apps",
      link: "/app-shop",
      icon: "🤖", // You can replace this with an actual icon component
    },
  ];

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className={`text-4xl font-extrabold text-center mb-16 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How Can You Benefit From Our Services?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ServiceCard
                {...service}
                className={`h-full transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-100'
                    : 'bg-white hover:bg-gray-50 text-gray-900 shadow-lg hover:shadow-xl'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Serve1;