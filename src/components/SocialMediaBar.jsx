import React from 'react';
import FacebookIcon from './Icons/FacebookIcon';
import InstagramIcon from './Icons/InstagramIcon';
import TikTokIcon from './Icons/TikTokIcon';
import TwitterXIcon from './Icons/TwitterXIcon';
import YoutubeIcon from './Icons/YoutubeIcon';


const SocialMediaBar = ({size}) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  }

  const containerItemStyle = {
    padding: '10px'
  }

  return (
    <>     
        <div style={containerStyle}>
            <div style={containerItemStyle}>
                <FacebookIcon size={size}/>
            </div>
            <div style={containerItemStyle}>
                <InstagramIcon size={size}/>
            </div>
            <div style={containerItemStyle}>
                <TikTokIcon size={size}/>
            </div>
            <div style={containerItemStyle}>
                <TwitterXIcon size={size}/>
            </div>
            <div style={containerItemStyle}>
                <YoutubeIcon size={size}/>
            </div>
        </div>
    </>
  );
};

export default SocialMediaBar;
