import { useState, useEffect } from 'react';
import axios from 'axios';
import MonthDropDown from './MonthDropDown';
import MonthlyTotalSpending from './MonthlyTotalSpending';
import AverageDailyExpenditure from './AverageDailyExpenditure';
import CategoryDoughnutChart from './CategoryDoughnutChart';

function MonthlyExpenses(){
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    // get the values and labels for the chart
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");

    const labels = categories.map((row) => row.category);
    const values = categories.map((row) => Number(row.amount || 0))

    function handleGenerateSummary(month, year){
        setSelectedMonth(month);
        setSelectedYear(year);
    }

    useEffect(() => {
        if(!selectedMonth || !selectedYear){
            setMessage("Please selected both a month and year.");
            return;
        }
        // fetch the category name and amount for specific month/year
        axios.get("http://localhost:5000/api/categoryAmount", {params: {
            selectedMonth,
            selectedYear
        }})
        .then((res) => {
            setCategories(res.data.categories || []);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [selectedMonth, selectedYear]);

    function handleNewExpense(){
        window.location.href = "http://localhost:5000/expenseTable";
    }

    return(
        <div className="dashboardContainer">
            <div className="overviewContainer">
                    <h2 className="expenseTitle">
                        Expense Overview
                    </h2>
                    <div className="monthOverview">
                        {/* Dropdown Menu of Months */}
                        <MonthDropDown
                            className="dropDownOverview"
                            onGenerate={handleGenerateSummary}
                        />
                    </div>
                    <div className='displayExpenses'>
                        <div className='chartContainer'>
                            <CategoryDoughnutChart
                                labels={labels}
                                values={values}
                                month={selectedMonth}
                                year={selectedYear}
                            />
                        </div>
                        <div className="spendingColumn">
                            <div className="monthSpending">
                                <MonthlyTotalSpending
                                    month={selectedMonth}
                                    year={selectedYear}
                                />
                            </div>
                            <div className="dailyAverage">
                                <AverageDailyExpenditure
                                    month={selectedMonth}
                                    year={selectedYear}
                                />
                            </div>
                            <button onClick={handleNewExpense} className='expenseEntryButton'>Create New Expense</button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default MonthlyExpenses;