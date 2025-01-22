import React from 'react';

const ExpertBarberCard = ({imagePath, name, tag}) => {
  return (
    <div className="expertBarber">
      <div className="expertBarberTop">
        <img src={imagePath}/>
      </div>
      <div className='expertBarberBottom'>
        <div className="expertBarberBottomTop">{name}</div>
        <div className="expertBarberBottomBottom">{tag}</div>
      </div>
    </div>
  );
};

export default ExpertBarberCard;
