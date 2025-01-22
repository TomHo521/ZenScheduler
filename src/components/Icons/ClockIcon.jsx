
import React from 'react';

const TimeIcon = ({ size = 2, strokeColor= '#FFA500', fillColor = '#FFA500' }) => {
  return (
    <svg width={`${size}rem`} height={`${size}rem`} stroke={strokeColor} viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>Time</title>
        <g id="Icon/time-white-Copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M23.98,4 C35.04,4 44,12.96 44,24 C44,35.04 35.04,44 23.98,44 C12.94,44 4,35.04 4,24 C4,12.96 12.94,4 23.98,4 Z M24,8 C15.16,8 8,15.16 8,24 C8,32.84 15.16,40 24,40 C32.84,40 40,32.84 40,24 C40,15.16 32.84,8 24,8 Z M25,14 L25,24.5 L34,29.84 L32.5,32.3 L22,26 L22,14 L25,14 Z" id="Combined-Shape" fill={fillColor} fill-rule="nonzero"></path>
        </g>
    </svg>
   
  );
}

export default TimeIcon;



// import React from 'react';


// const ClockIcon = ({size, color}) => {

//   return (
//     <>        
//       <svg 
//           width={`${size}rem`} 
//           height={`${size}rem`} 
//           fill="#FFA500"
//           stroke="#FFA500"
          
//           viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
//           <title>Time</title>
//           <g id="Icon/time-white-Copy" 
//           fill="#FFA500"
//           stroke="#FFA500"
//           stroke-width="1" fill-rule="evenodd">
//               <path d="M23.98,4 C35.04,4 44,12.96 44,24 C44,35.04 35.04,44 23.98,44 C12.94,44 4,35.04 4,24 C4,12.96 12.94,4 23.98,4 Z M24,8 C15.16,8 8,15.16 8,24 C8,32.84 15.16,40 24,40 C32.84,40 40,32.84 40,24 C40,15.16 32.84,8 24,8 Z M25,14 L25,24.5 L34,29.84 L32.5,32.3 L22,26 L22,14 L25,14 Z" id="Combined-Shape" fill="#FFFFFF" fill-rule="nonzero"></path>
//           </g>
//       </svg>
//     </>
//   )
// }

// export default ClockIcon;