import React from 'react';
import { Container, Button } from 'react-bootstrap';
import TeamCard from './TeamCard';

const OurTeam = () => {
  return (
    <>
      <div className="item-barb ourTeam">
            
            <TeamCard imagePath="../../../src/assets/images/barb1.avif" name="Jackson Martinez"/>

            <TeamCard imagePath="../../../src/assets/images/barb2.avif" name="Diego Manchester United"/>

            <TeamCard imagePath="../../../src/assets/images/barb3.avif" name="Manuel Estrella De Ensalada"/>

            <TeamCard imagePath="../../../src/assets/images/barb4.avif" name="Shimauma Corazon"/>
            
      </div>
    </>
  );
};

export default OurTeam;
