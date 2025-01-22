import React from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import yearData from '../data/yearData';
import { useState } from 'react';
import Day from './Day';
import DummyDays from './DummyDays';
import Modal from './Modal';
import DaysOfWeekLabel from './DaysOfWeekLabel'


const Calendar = () => {
    const [monthNumber, setMonthNumber] = useState(0);
    const [currentDay, setCurrentDay] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(yearData[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = (whichDay) => {
        setCurrentDay(whichDay)
        setIsModalOpen(true)
    };

    const closeModal = () => setIsModalOpen(false);

    var forwardHandler = function() {
        setMonthNumber(monthNumber + 1);
        setCurrentMonth(yearData[monthNumber]);
    }
    var backHandler = function() {
        setMonthNumber(monthNumber - 1);
        setCurrentMonth(yearData[monthNumber]);
    }

   return (
    <>
        <Modal isOpen={isModalOpen} onClose={closeModal} yearData={yearData} monthNumber={monthNumber} currentDay={currentDay} />
        <div className="month"> 

            <div className="monthTitle">
                <span className="backward" onClick={backHandler}> {'<<'} </span>
                {currentMonth.month} 
                <span className="forward" onClick={forwardHandler}> {'>>'} </span>
            </div>
            <div className="container "> 
                <DaysOfWeekLabel/>
                <DummyDays start="wednesday" />
                {currentMonth.bookings.map((singleDay, id) => <Day key={id} singleDay={singleDay} openModal={openModal}/>) }
            </div>
        </div>
    </>

  );
};

export default Calendar;
