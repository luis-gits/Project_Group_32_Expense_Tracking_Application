import {useState, useEffect} from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement, 
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function CategoryDoughnutChart({ labels, values, month, year }) {
    const [isDateExists, setIsDateExists] = useState(null);

    useEffect(() => {
        // don't check until user has picked both
        if (!month || !year) {
            setIsDateExists(null);
            return;
        }

        axios.get('http://localhost:5000/api/hasExpense', {
            params: { month, year },
        })
        .then((res) => {
            console.log("dateVerified:", res.data.dateVerified);
            setIsDateExists(res.data.dateVerified); // contain true/false
        })
        .catch((err) => {
            console.error("hasExpense error:", err);
            setIsDateExists(false);
        });
    }, [month, year]);

    // if user has no data for given month / year
    if (isDateExists === false) {
        return (
            <div className='doughnutChart'>
                <h3 className='doughnutChartTitle'>Spending by Category</h3>
                <p style={{color: "#ef4444"}}>You don't have an overview for {month} / {year}</p>
            </div>   
        );
    }

    const data = {
        labels,
        datasets: [
            {
                label: "Spending by Category",
                data: values,
                backgroundColor: [
                    "#4F46E5", // indigo
                    "#22C55E", // green
                    "#F97316", // orange
                    "#EC4899", // pink
                    "#3B82F6", // blue
                    "#A855F7", // purple
                    "#FACC15", // yellow
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    const options = {
    };
    
    return (
        <div className='doughnutChart'>
            <h3 className='doughnutChartTitle'>Spending by Category</h3>
            <Doughnut
                data={data} 
                options={options}
            />
        </div>
    );
}

export default CategoryDoughnutChart;