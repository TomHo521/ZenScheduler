import React from 'react';
import SocialMediaBar from './SocialMediaBar';
import ExpertBarberCard from './ExpertBarberCard';


const expertBarberData = [
    {
        imagePath: "../../../src/assets/images/barb1.avif",
        name: "Jackson Martinez",
        tag: 'Hair Specialist'
    },
    {
        imagePath: "../../../src/assets/images/barb2.avif",
        name: "Liam Turner",
        tag: 'Beard Grooming Expert'
    },
    {
        imagePath: "../../../src/assets/images/barb3.avif",
        name: "Connor Brooks",
        tag: 'Facial Treatment Specialist'
    },
    {
        imagePath: "../../../src/assets/images/barb4.avif",
        name: "Ethan Williams",
        tag: 'Color Specialist'
    },
]

const MeetOurExperts = () => {
  return (
    <>
      <div className="meetOurExperts">
        <div className='meetOurExpertsContainer'>
            <div className='meetOurExpertsTop'>
              <div className='meetOurExpertsTopLeft'>

                <div className='meetOurExpertsTopLeftTop'>
                  O U R  T E A M
                </div>
                <div className='meetOurExpertsTopLeftBottom'>   
                  MEET OUR EXPERT BARBERS
                </div>

           
              </div>
              <div className='meetOurExpertsTopRight'>
                Our team of expert barbers brings together passion, skill, and dedication to elevate your grooming experience. 
              </div>

            </div>
            <div className='meetOurExpertsBottom'>
                {
                    expertBarberData.map((barber, key) =>           
                        <ExpertBarberCard imagePath={barber.imagePath} name={barber.name} tag={barber.tag}/>
                    )
                }

      
              {/* <SocialMediaBar size={3}  /> */}
    
              
            </div>
        </div>
      </div>
    </>
  );
};

export default MeetOurExperts;
