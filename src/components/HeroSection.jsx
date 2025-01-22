import React from 'react';
import { Container, Button } from 'react-bootstrap';
import OurTeam from './HeroBars/OurTeam';
import OurStory from './HeroBars/OurStory';
import CallToAction from './CallToAction';
import OurPrices from './OurPrices';
import OurMainServices from './OurMainServices';
import OurGallery from './OurGallery';
import WhyChooseUs from './WhyChooseUs';


const HeroSection = () => {
  return (
    <>
      <div className="container-barb">
        <OurMainServices/>
        <OurStory/>
        {/* <OurTeam/> */}
        <OurPrices/>
        <OurGallery/>
        <WhyChooseUs/>
      </div>
    </>
  );
};

export default HeroSection;
