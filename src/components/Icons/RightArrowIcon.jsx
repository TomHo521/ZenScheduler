import React from 'react';

const RightArrowIcon = ({ size = 2, strokeColor= '#FFA500', fillColor = '#FFA500' }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} stroke={strokeColor} viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>Arrow Right</title>
      <g id="Icon/arrow-right-black" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon id="Background" points="0 0 48 0 48 48 0 48"></polygon>
          <polygon id="Shape" fill={fillColor} points="18 33.18 26.6531714 24 18 14.82 20.6639676 12 32 24 20.6639676 36"></polygon>
      </g>
    </svg>
   
  );
}

export default RightArrowIcon;
