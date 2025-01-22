import React from 'react';

const HamburgerIcon = ({ size = 2, strokeColor = 'white', fillColor = 'white' }) => {
  return (
    <svg
        fill={fillColor}
        height={`${size}rem`}
        width={`${size}rem`}
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7L4 7" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
        <path d="M20 12L4 12" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
        <path d="M20 17L4 17" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  );
}

export default HamburgerIcon;
