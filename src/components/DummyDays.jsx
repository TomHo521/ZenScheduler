import React from 'react';
import { useState } from 'react';

const DummyDays = ({start}) => {
    const holderDays = {
        'sunday': [{}],
        'monday': [{}, {}],
        'tuesday': [{}, {}, {}],
        'wednesday': [{}, {}, {}, {}],
        'thursday': [{}, {}, {}, {}, {}],
        'friday': [{}, {}, {}, {}, {}, {}],
        'saturday':[{}, {}, {}, {}, {}, {}, {}]
    }

    return (
        <>
            {holderDays[start].map((singleDay, ind) => <div className="dummyDays"></div>)}
        </>
    );

}


export default DummyDays;