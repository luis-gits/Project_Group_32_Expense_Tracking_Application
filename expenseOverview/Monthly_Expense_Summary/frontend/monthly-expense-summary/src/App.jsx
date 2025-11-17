import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MonthlyExpenses from "./MonthlyExpenses";
import MonthlyTotalSpending from "./MonthlyTotalSpending";
import axios from "axios";

function App() {
    axios.defaults.withCredentials = true;
    return(
        <BrowserRouter>
            <Routes>   
                <Route path="/" element={<MonthlyExpenses />} />
                <Route path="/monthlyTotalSpending" element={<MonthlyTotalSpending />} />
            </Routes>
        </BrowserRouter>    
    )
}

export default App;
