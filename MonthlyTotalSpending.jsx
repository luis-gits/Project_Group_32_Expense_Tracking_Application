import React, { useState, useEffect } from "react";
import axios from "axios";

function MonthlyTotalSpending({month, year}){

    const [totalSpending, setTotalSpending] = useState("");

    useEffect(() => {
        if(!month || !year )
        {
            return;
        }
        // make request to backend to process selected month to get total spending
        axios.get("http://localhost:5000/api/monthlyTotal", {params: {
            month: month,
            year: year
        }})
        .then((res)=> {
            setTotalSpending(res.data.totalSpending);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [month, year]);

    return(
        <div className="totalSpendingContainer">
            <h3 className="totalSpendingTitle">Total Spending</h3>
            <p className="totalSpendingAmount">${totalSpending}</p>
        </div>
    );
}

export default MonthlyTotalSpending;