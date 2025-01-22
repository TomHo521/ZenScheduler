import React from 'react';
import { Container, Button } from 'react-bootstrap';

const TeamCard = ({imagePath, name}) => {
  return (
    <div className="teamContainer">
      <div className="teamCard">
        <div className="teamCard-top"><img src={imagePath}/></div>
        <div className="teamCard-bottom">{name}</div>
      </div>
    </div>
  );
};

export default TeamCard;
