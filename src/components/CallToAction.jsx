import React from 'react';
import { Container, Button } from 'react-bootstrap';
import TeamCard from './HeroBars/TeamCard';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <>
      <div className='callToAction'>
        
        <div className="bookingBox">
          <div className="bookingBoxChildHeader ">
            BEST MEN’S PARLOUR IN YOUR AREA
          </div>
          <div className="bookingBoxChild">
            OWN YOUR <span className='highlight-orange'>STYLE</span>
          </div>
          <div className="bookingBoxChild">
            EMBRACE YOUR  <span className='highlight-orange'>POWER</span>
          </div>
          <div className="bookingBoxChild">
           
          </div>
          <div className="bookButton">
            <Link to="/book">Book Appointment  →</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallToAction;
