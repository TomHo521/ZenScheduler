import React from 'react';
import ClockIcon from '../Icons/ClockIcon'

const HoursOpenCard = () => {
  return (
    <>
      <div className='findUsChild'>

        <div className='findUsChildIcon'>
          <ClockIcon size={3} strokeColor="orangered" fillColor='orangered'/>
        </div>

        <div className='findUsChildText'>

          <div className='findUsChildLabel'>
              Hours Open
          </div>
          <div className='findUsChildChild'>
              Mon to Fri: 9.00am - 8.30pm
          </div>
          <div className='findUsChildChild'>
              Sat: 10.00am - 6.30pm   Sun:Closed
          </div>



        </div>

      
    
      </div>
    </>
  );
};

export default HoursOpenCard;
