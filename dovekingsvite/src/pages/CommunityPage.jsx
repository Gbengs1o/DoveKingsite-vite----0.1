import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaTiktok, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useTheme } from '../ThemeContext';
import './CommunityPage.css';

const CommunityPage = () => {
  const { isDarkMode } = useTheme();

  const socialLinks = [
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@dovekings', label: 'YouTube' },
    { icon: <FaTiktok />, url: 'https://www.tiktok.com/@.dovekings?_t=8p5D50dlykw&_r=1', label: 'TikTok' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/dovekings_of_tech?igsh=dHQwc3JiOTNsMHoz', label: 'Instagram' },
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/david-ogunkoya-aa31991b7/', label: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com/Gbengs1o', label: 'GitHub' },
  ];

  return (
    <div className={`community-page ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="animated-background">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`animated-object shape-${i % 3}`}></div>
        ))}
      </div>
      <div className="content">
        <h1 className="title">Join Our Community</h1>
        <p className="description">Connect with us on social media and become part of our growing community!</p>
        
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <Link to="/SupportUsPage" className="support-button">
          Support Us
        </Link>
      </div>
    </div>
  );
};

export default CommunityPage;