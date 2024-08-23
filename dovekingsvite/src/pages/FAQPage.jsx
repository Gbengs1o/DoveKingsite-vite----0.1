import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './../ThemeContext';
import { FaChevronDown } from 'react-icons/fa';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className={`mb-4 rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <motion.button
        className={`w-full text-left p-4 flex justify-between items-center font-semibold ${
          isDarkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const { isDarkMode } = useTheme();
  const faqs = [
    {
      question: "What AI services do you offer?",
      answer: "We offer a wide range of AI services including custom AI application development, machine learning model training, natural language processing solutions, and AI integration for existing systems."
    },
    {
      question: "How can I access your AI Code Store?",
      answer: "Our AI Code Store is accessible through our website. Simply create an account, log in, and you'll be able to browse and purchase AI code snippets and full applications."
    },
    {
      question: "Do you provide support for your AI apps?",
      answer: "Yes, we offer comprehensive support for all our AI applications. This includes documentation, tutorials, and direct assistance from our technical team for any issues or questions you may have."
    },
    {
      question: "Can you develop custom AI solutions for my business?",
      answer: "Absolutely! We specialize in creating tailored AI solutions to meet the unique needs of businesses across various industries. Contact us to discuss your specific requirements."
    },
    {
      question: "What programming languages do you use for AI development?",
      answer: "We primarily use Python for AI and machine learning development due to its extensive libraries and frameworks. However, we're proficient in multiple languages and can adapt based on project requirements."
    }
  ];

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;