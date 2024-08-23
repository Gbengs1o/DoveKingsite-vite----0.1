import React, { useState, useEffect, useRef } from 'react';
import HeroBackground from '../../assets/homepage/Herobackground.png';
import Logo from '../../assets/homepage/logotrans.png';
import { useTheme } from './../../ThemeContext'; // Import the custom hook for theme context
import '../../assets/homepage/Parallax.css';
import './HomepageHeroSection.css';

const HomepageHeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useRef(null);
  const nextSectionRef = useRef(null);
  const { isDarkMode } = useTheme(); // Get the current theme mode

  const messages = [
    "Get things done faster and better 👍😊",
"The best part is you don't have to be there 🌟",
"Save time, Zero Efforts, and make more money 🤔"  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    const handleScroll = () => {
      if (parallaxRef.current) {
        setScrollY(parallaxRef.current.scrollTop);
      }
    };

    const parallaxElement = parallaxRef.current;
    if (parallaxElement) {
      parallaxElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      clearInterval(interval);
      if (parallaxElement) {
        parallaxElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [messages.length]);

  const handleScrollToNextSection = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div ref={parallaxRef} className={`parallax-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div 
          className="parallax-layer bg-layer" 
          style={{ 
            backgroundImage: isDarkMode ? 'none' : `url(${HeroBackground})`,
            backgroundColor: isDarkMode ? '#1a1a1a' : 'transparent',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
        
        <div className="parallax-layer stars-layer">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}></div>
          ))}
        </div>
        
        <div className="parallax-layer content-layer" style={{
          transform: `translateY(${scrollY * -0.2}px)`
        }}>
          <div className={`container ${isDarkMode ? 'dark-container' : ''}`}>
            <img src={Logo} alt="Logo" className="animated-logo" />
            <h1 className="welcome-text">Welcome To The Future</h1>
            <p className="tagline">
              <span className="fade-text">{messages[currentMessageIndex]}</span>
            </p>
            <button className="cta-btn" onClick={handleScrollToNextSection}>Explore Now</button>
          </div>
        </div>
        
        <div className="parallax-layer floating-elements" style={{
          transform: `translateY(${scrollY * 0.3}px)`
        }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`floating-element element-${i + 1}`}></div>
          ))}
        </div>
        
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow"></div>
        </div>
      </div>
      
      <div ref={nextSectionRef} className="next-section">
        {/* Content of the next section */}
      </div>
    </>
  );
};

export default HomepageHeroSection;
