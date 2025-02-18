import React from 'react';


const FacebookIcon = ({size}) => {
  const style = {
    width:`${size}rem`,
    height:`${size}rem`,
  }

  return (
    <>
      <a href="https://www.facebook.com" target="_blank" className="social-icon facebook" style={style}>
        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Facebook</title>
          <g id="Icon/Social/facebook-black"  stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M30.0793333,40 L30.0793333,27.608 L34.239,27.608 L34.8616667,22.7783333 L30.0793333,22.7783333 L30.0793333,19.695 C30.0793333,18.2966667 30.4676667,17.344 32.4726667,17.344 L35.0303333,17.3426667 L35.0303333,13.0233333 C34.5876667,12.9646667 33.0696667,12.833 31.3036667,12.833 C27.6163333,12.833 25.0923333,15.0836667 25.0923333,19.2166667 L25.0923333,22.7783333 L20.922,22.7783333 L20.922,27.608 L25.0923333,27.608 L25.0923333,40 L30.0793333,40 Z M9.766,40 C8.79033333,40 8,39.209 8,38.234 L8,9.766 C8,8.79033333 8.79033333,8 9.766,8 L38.2336667,8 C39.209,8 40,8.79033333 40,9.766 L40,38.234 C40,39.209 39.209,40 38.2336667,40 L9.766,40 Z" id="Shape" fill="#FFFFFF"></path>
          </g>
        </svg>
      </a>
    </>

  )
}

export default FacebookIcon;