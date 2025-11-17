import { useState, useEffect } from 'react';
import axios from 'axios';
import MonthDropDown from './MonthDropDown';
import MonthlyTotalSpending from './MonthlyTotalSpending';
import AverageDailyExpenditure from './AverageDailyExpenditure';
import CategoryDoughnutChart from './CategoryDoughnutChart';

function MonthlyExpenses(){
    // hard-coded user for testing (change later)
    const userid = 1;
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    // get the values and labels for the chart
    const [categories, setCategories] = useState([]);

    const labels = categories.map((row) => row.category);
    const values = categories.map((row) => Number(row.amount || 0))

    function handleGenerateSummary(month, year){
        setSelectedMonth(month);
        setSelectedYear(year);
    }

    useEffect(() => {
        // fetch the category name and amount for specific month/year
        axios.get("http://localhost:5000/api/categoryAmount", {params: {
            userid,
            selectedMonth,
            selectedYear
        }})
        .then((res) => {
            setCategories(res.data.categories || []);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [userid, selectedMonth, selectedYear]);


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
                        <div>
                        <CategoryDoughnutChart
                            labels={labels}
                            values={values}
                        />
                        </div>
                        <div className='spendingStatus'>
                            <div className="monthSpending">
                                <MonthlyTotalSpending
                                    userId={userid}
                                    month={selectedMonth}
                                    year={selectedYear}
                                />
                            </div>
                            <div className="dailyAverage">
                                <AverageDailyExpenditure
                                    userId={userid}
                                    month={selectedMonth}
                                    year={selectedYear}
                                />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default MonthlyExpenses;