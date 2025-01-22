import React from 'react';

const MapPinIcon = ({ size = 2, strokeColor= '#FFA500', fillColor = '#FFA500' }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} stroke={strokeColor} viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>Location</title>
        <g id="Icon/location-black" stroke-width="3" fill-rule="evenodd">
            <path d="M24,4 C16.26,4 10,10.26 10,18 C10,28.5 24,44 24,44 C24,44 38,28.5 38,18 C38,10.26 31.74,4 24,4 Z M24,23 C21.24,23 19,20.76 19,18 C19,15.24 21.24,13 24,13 C26.76,13 29,15.24 29,18 C29,20.76 26.76,23 24,23 Z" id="Shape" fill={fillColor}></path>
        </g>
    </svg>
   
  );
}

export default MapPinIcon;
