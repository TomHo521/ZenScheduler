import React from 'react';
import { Container, Button } from 'react-bootstrap';
import TeamCard from './HeroBars/TeamCard';
import LocationCard from './findUs/LocationCard';
import ContactCard from './findUs/ContactCard';
import HoursOpenCard from './findUs/HoursOpenCard';

const FindUs = () => {
  return (
    <>
      <div className='findUs'>
        <LocationCard/>
        <ContactCard/>
        <HoursOpenCard/>
       
      </div>
    </>
  );
};

export default FindUs;
