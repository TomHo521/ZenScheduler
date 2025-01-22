import React from 'react';

const LeftArrowIcon = ({ size = 2, strokeColor= '#FFA500', fillColor = '#FFA500' }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} stroke={strokeColor} viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>Arrow Left</title>
        <g id="Icon/arrow-left-black" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon id="Shape" fill={fillColor} transform="translate(24.590000, 24.000000) scale(-1, 1) translate(-24.590000, -24.000000) " points="17.18 33.18 26.34 24 17.18 14.82 20 12 32 24 20 36"></polygon>
        </g>
    </svg>
  );
}

export default LeftArrowIcon;
