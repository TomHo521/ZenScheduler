import React from 'react';
import SocialMediaBar from './SocialMediaBar';


const FooterSection = () => {
  return (
    <>
      <div className="footerSection">
        <div className='footerSectionContainer'>
            <div className='footerSectionTop'>
              <div className='footerSectionTopLeft'>

                <div className='footerSectionTopLeftTop'>
                  TrimTop
                </div>
                <div className='footerSectionTopLeftBottom'>   
                  Elevating Grooming. Inspiring Style. Unleash Your Confidence at TrimHub where we craft exceptional looks that reflect your individuality a passion for style and an eye for detail.
                </div>

           
              </div>
              <div className='footerSectionTopRight'>

                <div className='footerSectionTopRightChild'>
                  <ul className='colored-list'>
                    <li>QUICK LINKS</li>
                    <li>Home</li>
                    <li>Services</li>
                    <li>Gallery</li>
                    <li>Blog</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                  </ul>
                </div>

                <div className='footerSectionTopRightChild'>
                  <ul className='colored-list'>
                    <li>SERVICES</li>
                    <li>Haircut & Hairstyling</li>
                    <li>Beard Styling</li>
                    <li>Grooming and Skincare</li>
                    <li>Color and Treatment</li>
                  </ul>
                </div>

                <div className='footerSectionTopRightChild'>
                  <ul className='colored-list'>
                    <li>LEGAL</li>
                    <li>Privacy Policy</li>
                    <li>Terms and Conditions</li>
                  </ul>
                </div>

              </div>

            </div>
            <div className='footerSectionBottom'>
              <div className='footerSectionBottomTop'>
                FOLLOW US
              </div>
              <SocialMediaBar size={3}  />
              {/* <div className='footerSectionBottomBottom'>
                <div className='footerSectionBottomBottomItem'>
                  <FacebookIcon size={3}/>
                </div>
                <div className='footerSectionBottomBottomItem'>
                  <InstagramIcon size={3}/>
                </div>
                <div className='footerSectionBottomBottomItem'>
                  <TikTokIcon size={3}/>
                </div>
                <div className='footerSectionBottomBottomItem'>
                  <TwitterXIcon size={3}/>
                </div>
                <div className='footerSectionBottomBottomItem'>
                  <YoutubeIcon size={3}/>
                </div>
              </div> */}
              
            </div>
        </div>
      </div>
    </>
  );
};

export default FooterSection;
