import React from 'react';
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

function CategoryDoughnutChart( {labels, values} ){
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

    }

    return(
        <div className='doughnutChart'>
            <h3 className='doughnutChartTitle'>Spending by Category</h3>
            <Doughnut
                data={data} 
                options={options}
            />
        </div>
    )
};

export default CategoryDoughnutChart;