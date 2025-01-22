


import React from 'react';

const SearchIcon = ({ size = 2, strokeColor= '#FFA500', fillColor = '#FFA500' }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} stroke={strokeColor} viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>Search</title>
        <g id="Icon/search-defaultblue" stroke-width="1" fill-rule="evenodd">
            <path fill={fillColor} d="M31,28 L29.42,28 L28.86,27.46 C30.82,25.18 32,22.22 32,19 C32,11.82 26.18,6 19,6 C11.82,6 6,11.82 6,19 C6,26.18 11.82,32 19,32 C22.22,32 25.18,30.82 27.46,28.86 L28,29.42 L28,31 L38,40.98 L40.98,38 L31,28 Z M19,28 C14.02,28 10,23.98 10,19 C10,14.02 14.02,10 19,10 C23.98,10 28,14.02 28,19 C28,23.98 23.98,28 19,28 Z" id="Shape"></path>
        </g>
    </svg>
  );
}

export default SearchIcon;

    