import React from 'react';

const ServicePoint = ({service, price}) => {
  return (
    <>
        <div className="fixed-container">
            <div className="left-item">{service}</div>
            <div className="middle-item">
                <div className="bar"></div>
            </div>
            <div className="right-item">{price}</div>
        </div>
    </>
  );
};
export default ServicePoint;
