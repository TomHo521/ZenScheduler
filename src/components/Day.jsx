import React from 'react';
import { useState } from 'react';


const Day = ({singleDay, openModal}) => {
  
   return (
    <>
      <div className="day" onClick={() => openModal(singleDay.day)}> 
          {singleDay.day}
      </div>
    </>

  );
};

export default Day;
