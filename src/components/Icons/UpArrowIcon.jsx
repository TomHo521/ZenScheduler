
import React from 'react';

const UpArrowIcon = ({ size = 2, strokeColor= '#FFA500', fillColor = '#FFA500' }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} stroke={strokeColor} viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>Arrow Up</title>
        <g id="Icon/arrow-up" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon id="Path" fill={fillColor} transform="translate(24.000000, 24.590000) rotate(180.000000) translate(-24.000000, -24.590000) " points="14.82 17.18 24 26.34 33.18 17.18 36 20 24 32 12 20"></polygon>
        </g>
    </svg>
   
  );
}

export default UpArrowIcon;
