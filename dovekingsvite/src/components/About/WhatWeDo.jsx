import React, { useState, useEffect } from 'react';
import Logo from '../../assets/homepage/logotrans.png';
import { useTheme } from './../../ThemeContext';
import { motion } from 'framer-motion';

const WhatWeDo = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [buttonText, setButtonText] = useState('Now checkout Our Mission');
  const { isDarkMode } = useTheme();

  const contents = [
    {
      title: 'What we do',
      subheader: '',
      content: `(Let there be life, and there was life) What does any of this mean? We make digital products and services smarter by the incorporation of AI and other systematic technologies that make interaction with technology feel human - meaning better user interaction. Put simply, we make it hard for you to tell if it's a human or a machine behind the hood improving user experience. Above all, we make use of AI and other various technological systems to automate various tasks or, better still, make it possible. Put plainly, we make the process faster and effortless.`
    },
    {
      title: 'Our Mission',
      subheader: '',
      content: `It is ultimately an ambitious endeavor to create a world where technology serves people with the consciousness of our benefits in mind. Technology can already help get things done a lot faster. But AI is a whole game-changer when you make it smarter - that's the gift of AI. It gives our tools life. Our mission is simple: to make technology more effective. It really isn't more than that.
Imagine going to a site to purchase items, and that site not only educates you exactly the way a professional salesman will about the products (note, I said 'professional salesman,' meaning this is done with professionalism and caution), but also helps you pick the best one that suits your budget and needs, with your benefit in mind, not just to sell you stuff you don't need to make cash. Kindly picture this to know what we are capable of and how this can help you.
Now, imagine this tech in your hands as a business person. How advantageous will it be, knowing that your product is in good hands - yes, in the hands of our tech? They don't lie or steal, they're just there to get the job done, and will never complain. Just how much spare time will you have on your hands? And how much money will you have saved by scaling this process to different aspects of your business?
Hope you are starting to see the picture?`
    },
    {
      title: 'Our Vision',
      subheader: '',
      content: `If you thought our mission was plain and simple, our vision couldn't be any simpler, but just as effective. We plan on enhancing every single aspect of human life with the 'let there be life' movement. From the Medical to the Agricultural sector, we are going to be in it all. The reason? Simple: smarter technology means doctors can save lives more effectively, and it also means farmers can plant faster and better, resulting in more food. The list goes on. But how does this help you? Simple - whatever business you're doing, for whatever goal, we can make it yield more fruits. How? By saving you time, money, and above all, effort. All we have to do is give life to your tools and systems by making them smarter. Let's give you an example to better help you elaborate: You are a doctor, you run a clinic. We all know getting people registered and booking an appointment can be a tiresome task and a huge investment in time. Just leave that, and any other tiresome task, to us. We will just build a system that takes over and does the job well, might be even better than your employee who complains about it all the time. Now, imagine how much spare time you and your workers have on their hands to pay attention to other matters. Also, our systems are smart, so you can just talk to them if you need any adjustments. Good, now that we have that little example out of the way, picture this and what it can do for your business, whatever it may be.`
    }
  ];

  const handleButtonClick = () => {
    const nextContent = (currentContent + 1) % contents.length;
    setCurrentContent(nextContent);

    switch(nextContent) {
      case 0:
        setButtonText('Now checkout Our Mission');
        break;
      case 1:
        setButtonText('Now know our Vision');
        break;
      case 2:
        setButtonText('Now go back to understand better what we do');
        break;
      default:
        setButtonText('Now checkout Our Mission');
        break;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const logo = document.getElementById('logo');
      if (logo) {
        logo.style.transform = `rotate(${window.scrollY}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="flex justify-center mb-4">
        <div className={`relative w-24 h-24 ${!isDarkMode && 'bg-blue-500 rounded-full p-2'}`}>
          <img 
            id="logo" 
            src={Logo} 
            alt="Site Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold">{contents[currentContent].title}</h1>
      </div>

      <h2 className="text-xl font-semibold mb-4">{contents[currentContent].subheader}</h2>

      <p className="max-w-3xl mx-auto text-lg leading-relaxed mb-8">
        {contents[currentContent].content}
      </p>

      <div className="text-center mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-full text-white font-semibold transition-colors duration-300 ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={handleButtonClick}
        >
          {buttonText}
        </motion.button>
      </div>
    </div>
  );
};

export default WhatWeDo;