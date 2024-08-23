import React, { useState, useEffect } from 'react';
import './MidSectionContact.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp, FaLinkedinIn, FaTelegramPlane, FaPinterestP, FaTiktok, FaGithub } from 'react-icons/fa';
import { useTheme } from '../../ThemeContext';

const MidSectionContact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('Error occurred. Please try again later.');
    }
  };

  const socialLinks = [
    
    { icon: <FaInstagram />, url: 'https://www.instagram.com/dovekings_of_tech?igsh=dHQwc3JiOTNsMHoz', label: 'Instagram' },
    
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@dovekings', label: 'YouTube' },
    { icon: <FaWhatsapp />, url: 'https://wa.link/ienrd4', label: 'WhatsApp' },
    { icon: <FaGithub />, url: 'https://github.com/Gbengs1o', label: 'WhatsApp' },
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/david-ogunkoya-aa31991b7/', label: 'LinkedIn' },
    { icon: <FaTiktok />, url: 'https://www.tiktok.com/@.dovekings?_t=8p5D50dlykw&_r=1', label: 'Telegram' },
    
    
  ];

  return (
    <section id="contact-form" className={`contact-section flex flex-col md:flex-row justify-center items-center py-16 px-4 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-100'
    }`}>
      <div className={`contact-info w-full md:w-1/2 p-6 animate-on-scroll ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <h2 className={`text-3xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-indigo-800'
        }`}>Our Contact Information</h2>
        <p className="mb-4">Reach out to us with any questions or inquiries.</p>
        <p className="mb-2"><strong>A:</strong> No1 Kudayisi street Ibadan</p>
        <p className="mb-2"><strong>P:</strong> 08050488519</p>
        <p className="mb-2"><strong>E:</strong> firewole8@gmail.com</p>
        <div className="mt-4">
          <p className="mb-2">Connect with Us:</p>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`social-icon ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-indigo-500 hover:text-indigo-700'
                }`}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className={`contact-form w-full md:w-1/2 p-6 rounded-lg animate-on-scroll ${
        isDarkMode ? 'bg-gray-800 text-gray-300 shadow-lg' : 'bg-white shadow-lg'
      }`}>
        <h2 className={`text-2xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-indigo-700'
        }`}>SAY HI!</h2>
        <h3 className={`text-xl font-bold mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-900'
        }`}>Send Us a Message Today</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className={`block ${
              isDarkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`form-input w-full px-4 py-2 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700 placeholder-gray-400' : 'border-gray-300'
              }`}
            />
          </div>
          <div>
            <label className={`block ${
              isDarkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`form-input w-full px-4 py-2 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700 placeholder-gray-400' : 'border-gray-300'
              }`}
            />
          </div>
          <div>
            <label className={`block ${
              isDarkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className={`form-input w-full px-4 py-2 border rounded-lg ${
                isDarkMode ? 'border-gray-600 bg-gray-700 placeholder-gray-400' : 'border-gray-300'
              }`}
            ></textarea>
          </div>
          <button type="submit" className={`submit-button w-full py-2 rounded-lg ${
            isDarkMode ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-indigo-500 text-white hover:bg-indigo-700'
          }`}>SEND</button>
        </form>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </section>
  );
};

export default MidSectionContact;
