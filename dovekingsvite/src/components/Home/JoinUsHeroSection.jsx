import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import './JoinUsHeroSection.css';

const JoinUsHeroSection = () => {
  const messages = ["Need Help", "Contact Us."];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="relative h-[50vh] overflow-hidden join-us-hero-section">
      {/* Background Color */}
      <div className="absolute inset-0 -z-10 hero-background"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-black dark:text-white p-8">
        <h1 className={`text-4xl font-bold mb-4 ${currentMessageIndex === 1 ? 'small-text' : ''}`}>
          <span className="fade-text underline-text">{messages[currentMessageIndex]}</span>
        </h1>
        <Player
          src="https://lottie.host/78fd2751-4ac9-40cb-995e-4bfd49a60e1d/4KS14o5J6j.json"
          className="mt-4 lottie-player"
          loop
          autoplay
        />
        <Link
          to="/contact"
          className="text-xl font-semibold underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors mt-4"
        >
          CONTACT US
        </Link>
      </div>
    </div>
  );
};

export default JoinUsHeroSection;
