import React, {useState} from 'react'

const DaySchedule = () => {
 return (
    <>
        <div class="scheduler">
            <ul class="time-list">
            <li class="time-slot">9:00 AM</li>
            <li class="time-slot">9:30 AM</li>
            <li class="time-slot">10:00 AM</li>
            <li class="time-slot">10:30 AM</li>
            <li class="time-slot">11:00 AM</li>
            <li class="time-slot">11:30 AM</li>
            <li class="time-slot">12:00 PM</li>
            <li class="time-slot">12:30 PM</li>
            {/* <li class="time-slot">1:00 PM</li>
            <li class="time-slot">1:30 PM</li>
            <li class="time-slot">2:00 PM</li>
            <li class="time-slot">2:30 PM</li>
            <li class="time-slot">3:00 PM</li>
            <li class="time-slot">3:30 PM</li>
            <li class="time-slot">4:00 PM</li>
            <li class="time-slot">4:30 PM</li>
            <li class="time-slot">5:00 PM</li> */}
            </ul>
        </div>
    </>
 )
}

export default DaySchedule;