// src/pages/Homepage.js


import HomepageHeroSection from '../components/Home/HomepageHeroSection';
import CarouselMiddle from '../components/Home/CarouselMiddle';
import AboutMidHeroSection from '../components/Home/AboutMidHeroSection';
import OurValuesHeroSection from '../components/Home/OurValuesHeroSection';
import JoinUsHeroSection from '../components/Home/JoinUsHeroSection';
import DiscoverUsHeroSection from '../components/Home/DiscoverUsHeroSection';
import JoinDoveKingHeroSection from '../components/Home/JoinDoveKingHeroSection';


const Homepage = () => {
  return (
    <div>
      
      <HomepageHeroSection />
      
      <AboutMidHeroSection />
      
      <CarouselMiddle />
      
      <JoinUsHeroSection />

      <OurValuesHeroSection />
      
      
      <JoinDoveKingHeroSection />

      <DiscoverUsHeroSection />

      

      
    </div>
  );
};

export default Homepage;
