import React from 'react';
import MapPinIcon from '../Icons/MapPinIcon';

const LocationCard = () => {
  return (
    <>
      <div className='findUsChild'>
        <div className='findUsChildIcon'>
        <MapPinIcon size={3} strokeColor='orangered' fillColor='black'/>
        </div>
        <div className='findUsChildText'>
            <div className='findUsChildLabel'>
                Location
            </div>
            <div className='findUsChildChild'>
                123 Main Street
            </div> 
            <div className='findUsChildChild'>
                Cityville, Stateburg, 98765
            </div> 
            

        </div>

      </div>
    </>
  );
};

export default LocationCard;
