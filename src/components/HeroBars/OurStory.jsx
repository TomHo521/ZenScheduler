import React from 'react';
import { Container, Button } from 'react-bootstrap';
import TeamCard from './TeamCard';

const OurStory = () => {
  return (
    <>
      <div className="item-barb">
        <div className = "ourStoryContainer">
          {/* <img className=".bgimage" src="../src/assets/images/background.png"/> */}
          <div className="ourStoryTextContainer">
            <div className="ourStoryLeft">  
              <div className="ourStoryLeftTop">
                About Us
              </div>
              <div className="ourStoryLeftMid">
                
              </div>
              <div className="ourStoryLeftBottom">
                Welcome to TrimHub, where grooming is an art and style is a statement. With a legacy built on tradition and an eye for innovation, we blend classic techniques with modern trends to craft the perfect look for you.
              </div>

            </div>
              <div className="ourStoryRight">
                <div className="ourStoryRightTop">
                  Since 2013
                </div>
              <div className="ourStoryRightBottom">
                  Our team of expert barbers is more than skilled professionals – they're artists who meticulously sculpt each cut and shave with precision. we offer an experience that's as welcoming as it is stylish. 
              </div>
            </div>


          </div>
          
        </div>
      </div>
    </>
  );
};

export default OurStory;
