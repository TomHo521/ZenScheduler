
import React from 'react';
import OurMainServicesCard from './OurMainServicesCard';


const OurMainServices = ({service, price}) => {
  return (
    <>
        <div className='item-barb'>
            <div className="ourMainServicesContainer">
                <div className='ourMainServicesChildTop'>

                    <div className='ourMainServicesChildTopLeft'>
                        <div className='ourMainServicesChildTopLeftTop'>
                            O U R   M A I N   S E R V I C E S
                        </div>
                        <div className='ourMainServicesChildTopLeftBottom'>
                            OUR SPECIALITIES
                        </div>
                    </div>

                    <div className='ourMainServicesChildTopRight'>
                        Ultimate grooming for the modern man. Look and feel your best with our skilled stylists and premium products.
                    </div>
     
                </div>
                <div className='ourMainServicesChildMid'>
                    <OurMainServicesCard imageURL='../src/assets/images/service1.webp' text='Haircuts and Hair Styling'/>
                    <OurMainServicesCard imageURL='../src/assets/images/service2.webp' text='Beard Styling'/>
                    <OurMainServicesCard imageURL='../src/assets/images/service3.webp' text='Color and Treatment'/>
                    <OurMainServicesCard imageURL='../src/assets/images/service4.webp' text='Grooming and Skincare '/>
                    
                </div>
                <div className='ourMainServicesChildBottom'>
                    <div className='ourMainServicesButton'>
                        B R O W S E   A L L   S E R V I C E S
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};
export default OurMainServices;



