import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AverageDailyExpenditure({month, year}){

    const [dailyAverage, setDailyAverage] = useState("");

    useEffect(() => {
        if(!month || !year )
        {
            return;
        }

        axios.get("http://localhost:5000/api/averageDaily", {params: {
            month: month,
            year: year
        }})
        .then((res) => {
            setDailyAverage(res.data.average);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [month, year]);

    return(
        <div className='dailyAverageContainer'>
            <h3 className='dailyAverageTitle'>Daily Average Expenditure</h3>
            <p className='dailyAverageAmount'>${dailyAverage}</p>
        </div>
    )
}

export default AverageDailyExpenditure;