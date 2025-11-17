import React, { useState } from 'react';

function MonthDropDown({onGenerate}){

    // set the month for expense overview
    const [monthValue, setMonthValue] = useState("1");
    // set the year for expense overview
    const [yearValue, setYearValue] = useState("2024");


    function handleMonthChange(event){
        setMonthValue(event.target.value);
    }

    function handleYearChange(event){
        setYearValue(event.target.value);
    }

    function handleDateSubmission(event){
        event.preventDefault();
        onGenerate(monthValue, yearValue);
    }

    return(
        <div className="dropDownContainer">
            <form onSubmit={handleDateSubmission} className="expenseOverviewForm">
                <div className="monthDropDown">
                    <label htmlFor="months">Select Month </label>
                    <select className="months" value={monthValue} onChange={handleMonthChange}>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div className="yearDropDown">
                    <label htmlFor="year">Select Year </label>
                    <select className="years" value={yearValue} onChange={handleYearChange}>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <button type="submit" className="generateForm">
                    Generate Expense Summary
                </button>
            </form>
        </div>
    );
}

export default MonthDropDown;