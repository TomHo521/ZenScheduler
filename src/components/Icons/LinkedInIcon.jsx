import React from 'react';


const LinkedInIcon = ({size}) => {
  const style = {
    width:`${size}rem`,
    height:`${size}rem`,
  }

  return (
    <>
        <a href="https://www.linkedin.com" target="_blank" className="social-icon linkedin" style={style}>
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin">
                <path d="M16 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0zM2 21h4V10H2v11zm6 0h4v-7c0-2.5 4-2.5 4 0v7h4V12c0-5-7-5-7 0v9z"></path>
            </svg>
        </a>
    </>

  )
}

export default LinkedInIcon;