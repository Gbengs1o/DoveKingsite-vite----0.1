import React, { useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaYoutube, FaWhatsapp, FaTelegramPlane, FaPinterestP, FaTiktok, FaPhone, FaGithub } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
   
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/david-ogunkoya-aa31991b7/', label: 'LinkedIn', hoverColor: 'hover:bg-blue-700' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/dovekings_of_tech/', label: 'Instagram', hoverColor: 'hover:bg-pink-600' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@dovekings', label: 'YouTube', hoverColor: 'hover:bg-red-600' },
    { icon: <FaWhatsapp />, url: 'https://wa.link/ienrd4', label: 'WhatsApp', hoverColor: 'hover:bg-green-500' },
    { icon: <FaGithub />, url: 'https://github.com/Gbengs1o', label: 'WhatsApp', hoverColor: 'hover:bg-green-500' },
    
    { icon: <FaTiktok />, url: 'https://www.tiktok.com/@.dovekings?_t=8p5D50dlykw&_r=1', label: 'Pinterest', hoverColor: 'hover:bg-red-700' },
  ];

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <footer className="footer bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Description */}
          <div className="footer-brand">
            <h1 className="text-3xl font-bold mb-4">DoveKings</h1>
            <p className="text-gray-300 mb-4">Innovating at its best.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/home" className="hover:text-blue-400 transition duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition duration-300">Services</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-contact">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href="mailto:firewole8@gmail.com" className="hover:text-blue-400 transition duration-300">firewole8@gmail.com</a>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>No 1 kudayisi street ibadan</span>
              </li>
            
              <li className="flex items-center">
               <FaPhone className="mr-2" />
                <a href="tel:+2348050488519" className="hover:text-blue-400 transition duration-300">08050488519</a>
              </li>

            </ul>
          </div>

          {/* Social Media and Newsletter */}
          <div className="footer-social">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gray-700 p-2 rounded-full transition duration-300 ${link.hoverColor}`}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Copyright Information */}
        <div className="footer-copyright text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DoveKings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
