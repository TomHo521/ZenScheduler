import React from 'react';

const OurMainServicesCard = ({imageURL, text}) => {

  const style = {
    backgroundImage:  `url(${imageURL})`
  }

  return (
    <>
        <div style={style} className="ourMainServicesCardContainer">
            <div className="ourMainServicesCardLabel">
                {text.toUpperCase()}
            </div>
        </div>
    </>
  );
};
export default OurMainServicesCard;
