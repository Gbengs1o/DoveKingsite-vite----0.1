import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaRegDotCircle, FaTiktok, FaWhatsapp, FaGithub, FaYoutube } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { Link } from 'react-router-dom'; 

const SupportUsPage = () => {
  const { isDarkMode } = useTheme();
  const [floatingElements, setFloatingElements] = useState([]);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 50;

      if (scrollY > threshold) {
        setFloatingElements([
          { x: Math.random() * 80 - 40, y: Math.random() * 80 - 40, size: Math.random() * 2 + 1, color: 'blue-600' },
          { x: Math.random() * 80 - 40, y: Math.random() * 80 - 40, size: Math.random() * 2 + 1, color: 'purple-600' },
          { x: Math.random() * 80 - 40, y: Math.random() * 80 - 40, size: Math.random() * 2 + 1, color: 'green-600' },
          { x: Math.random() * 80 - 40, y: Math.random() * 80 - 40, size: Math.random() * 2 + 1, color: 'pink-600' },
          { x: Math.random() * 80 - 40, y: Math.random() * 80 - 40, size: Math.random() * 2 + 1, color: 'yellow-600' },
        ]);
      } else {
        setFloatingElements([]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const floatingVariants = {
    visible: { x: (props) => props.x, y: (props) => props.y, scale: (props) => props.size, transition: { duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } },
  };

  const spacerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <div
      className={`bg-${isDarkMode ? 'gray-900' : 'white'} text-${isDarkMode ? 'gray-300' : 'gray-800'} min-h-screen relative overflow-hidden`}
    >
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute w-${element.size} h-${element.size} rounded-full bg-${element.color} opacity-30`}
          variants={floatingVariants}
          initial="visible"
          custom={{ x: element.x, y: element.y, size: element.size }}
        />
      ))}

      {/* Hero Section */}
      <motion.section
        className="h-screen flex flex-col items-center justify-center px-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Support Us</h1>
        <p className="text-lg mb-8">
          Join us in our mission to make a difference. Support us in one of the following ways:
        </p>
      </motion.section>

      {/* Call-to-Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 relative z-10">
        {/* Donation Card */}
        <motion.div
          className={`bg-${isDarkMode ? 'gray-800' : 'gray-200'} rounded-lg p-8 shadow-lg`}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <h2 className="text-3xl font-bold mb-4">Contribution</h2>
          <p className="text-lg mb-8">
            Your contributions will help us continue our work and make a lasting impact. You can do this by clicking the link below
            to send us funds to aid our work or tools and gadgets that could do the same.
          </p>
          <motion.a
            href="https://paystack.com/pay/acyg3nfcl-"
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-${isDarkMode ? 'blue-600' : 'blue-800'} hover:bg-${isDarkMode ? 'blue-700' : 'blue-900'} text-white py-3 px-6 rounded-full font-semibold inline-flex items-center`}
            whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: 'easeOut' } }}
          >
            Contribute Now
          </motion.a>
        </motion.div>

        {/* Services Card */}
        <motion.div
          className={`bg-${isDarkMode ? 'gray-800' : 'gray-100'} rounded-lg p-8 shadow-lg`}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Purchase Our Services</h2>
          <p className="text-lg mb-8">
            Explore our range of services and find the perfect solution for your needs. Support the growth by utilizing our services.
          </p>
          <Link to="/services">
            <motion.button
              className={`bg-${isDarkMode ? 'green-600' : 'green-500'} hover:bg-${isDarkMode ? 'green-700' : 'green-700'} text-black py-3 px-6 rounded-full font-semibold inline-flex items-center`}
              whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
              View Services
            </motion.button>
          </Link>
        </motion.div>
{/* Social Media Card */}
<motion.div
          className={`bg-${isDarkMode ? 'gray-800' : 'gray-200'} rounded-lg p-8 shadow-lg`}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
          <p className="text-lg mb-8">
            Stay connected with us on our social media platforms.
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://www.tiktok.com/@.dovekings?_t=8p5D50dlykw&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-${isDarkMode ? 'blue-500' : 'blue-800'} hover:text-${isDarkMode ? 'blue-400' : 'blue-900'}`}
              whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
              <FaTiktok size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/Gbengs1o"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-${isDarkMode ? 'purple-500' : 'purple-800'} hover:text-${isDarkMode ? 'purple-400' : 'purple-900'}`}
              whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/dovekings_of_tech?igsh=dHQ"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-${isDarkMode ? 'green-600' : 'green-800'} hover:text-${isDarkMode ? 'green-500' : 'green-900'}`}
              whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
            
            
              <FaInstagram size={24} />
            </motion.a>


            <motion.a
              href="https://www.youtube.com/@dovekings"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-${isDarkMode ? 'green-600' : 'green-800'} hover:text-${isDarkMode ? 'green-500' : 'green-900'}`}
              whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
            
            
              <FaYoutube size={24} />
            </motion.a>





            <motion.a
              href="https://www.linkedin.com/in/david-ogunkoya-aa31991b7/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-${isDarkMode ? 'blue-600' : 'blue-800'} hover:text-${isDarkMode ? 'blue-500' : 'blue-900'}`}
              whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: 'easeOut' } }}
            >
              <FaLinkedin size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Spacer */}
      <motion.div
        className="text-center py-16 text-lg relative z-10"
        initial="hidden"
        animate="visible"
        variants={spacerVariants}
        transition={{ delay: 0.6 }}
      >
        <FaRegDotCircle size={64} className="mx-auto mb-8 text-yellow-600" />
        Thank you for your support!
      </motion.div>

      {/* Floating Dots */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-${isDarkMode ? 'gray-400' : 'gray-600'} opacity-10`}
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: `${Math.random() * window.innerWidth}px`,
              y: `${Math.random() * window.innerHeight}px`,
              scale: [1, 1.5, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 10,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            <FaRegDotCircle />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SupportUsPage;