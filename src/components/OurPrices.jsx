import React from 'react';
import ServicePoint from './servicePoint.jsx';
import servicedata1 from '../data/servicedata1.js';
import servicedata2 from '../data/servicedata2.js';

const OurPrices = () => {
  return (
    <>
        <div className="servicesOfferedBannerContainer">
            <div className="servicesOfferedBannerLeft">
                <div className="servicesOfferedBannerLeftTop">
                    What we Offer
                </div>
                <div className="servicesOfferedBannerLeftBottom">
                    Our prices
                </div>
            </div>
            <div className="servicesOfferedBannerRight">
                Experience luxury grooming with our diverse services designed just for you. Discover clear pricing aligned with the value you get.
            </div>
        </div>

        <div className='servicesOfferedContainer'>
            <div className='serviceContainer'>
                {
                    servicedata1.map( (obj, key) => 
                        <ServicePoint key={key} service={obj.service.toUpperCase()} price={`$${obj.price}`}/>
                    )
                }
            </div>
            <div className='serviceContainer'>
                {
                    servicedata2.map( (obj, key) => 
                        <ServicePoint key={key} service={obj.service.toUpperCase()} price={`$${obj.price}`}/>
                    )
                }
            </div>
        </div>
    </>
  );
};

export default OurPrices;
