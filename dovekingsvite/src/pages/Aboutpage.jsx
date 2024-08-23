

import AboutHeroSection from '../components/About/AboutHeroSection';
import WhatWeDo from '../components/About/WhatWeDo';
import OurStoryAbout from '../components/About/OurStoryAbout';
import ServicesAbout from '../components/About/ServicesAbout';
import RollingPictureCarousel from '../components/About/RollingPictureCarousel';
import HelpUsAboutSection from '../components/About/HelpUsAboutSection';
import JoinDoveKingHeroSection from '../components/Home/JoinDoveKingHeroSection';
// Correct path

const AboutPage = () => {
  return (
    <div>

      <AboutHeroSection />
      <WhatWeDo />
      <OurStoryAbout />
      <ServicesAbout />
      
      <RollingPictureCarousel />

      <JoinDoveKingHeroSection />
      
      <HelpUsAboutSection />
     
     


    
    </div>
  );
};

export default AboutPage;
