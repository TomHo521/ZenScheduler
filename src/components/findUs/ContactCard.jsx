import React from 'react';
import PhoneIcon from '../Icons/PhoneIcon';
import StarThreeIcon from '../Icons/StarThreeIcon';

const ContactCard = () => {
  return (
    <>
      <div className='findUsChild'>

        <div className='findUsChildIcon'>
          {/* ☎ */}
          <PhoneIcon size={3} strokeColor='orangered' fillColor='orangered'/>
          {/* <StarThreeIcon size={3} strokeColor='orangered' fillColor='orangered'/> */}
          {/* <SearchIcon size={3} strokeColor='orangered' fillColor='orangered'/> */}
        </div>
        <div className='findUsChildText'>
          <div className='findUsChildLabel'>
              Contact Us
          </div>
          <div className='findUsChildChild'>
              (555) 123-4567
          </div>
          <div className='findUsChildChild'>
              info@barbershop.com
          </div>
        </div>


    
      </div>
    </>
  );
};

export default ContactCard;
