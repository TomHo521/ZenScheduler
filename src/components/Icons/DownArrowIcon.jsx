

import React from 'react';

const DownArrowIcon = ({ size = 2, strokeColor= '#FFA500', fillColor = '#FFA500' }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} stroke={strokeColor} viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>Arrow Down</title>
    <g id="Icon/arrow-down-black" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <polygon id="Path" fill={fillColor} points="14.82 17.18 24 26.34 33.18 17.18 36 20 24 32 12 20"></polygon>
    </g>
    </svg>
    
  );
}

export default DownArrowIcon;
