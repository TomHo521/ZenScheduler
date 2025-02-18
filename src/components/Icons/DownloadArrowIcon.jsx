import React from 'react';

const DownloadArrowIcon = ({ size = 2, strokeColor= '#FFA500', fillColor = '#FFA500' }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} stroke={strokeColor} viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>Download</title>
    <g id="Icon/download-defaultblue" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M24,7 C14.6111593,7 7,14.6111593 7,24 C7,33.3888407 14.6111593,41 24,41 C33.3888407,41 41,33.3888407 41,24 C41,14.6111593 33.3888407,7 24,7 Z M25.6666667,10.6666667 L25.6666667,30.95 L34.9833333,21.65 L37.3333333,24 L24,37.3333333 L10.6666667,24 L13.0333333,21.6333333 L22.3333333,30.95 L22.3333333,10.6666667 L25.6666667,10.6666667 Z" id="Combined-Shape" fill={fillColor}></path>
    </g>
    </svg>
  );
}

export default DownloadArrowIcon;
