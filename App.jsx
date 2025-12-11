import React from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MonthlyExpenses from "./pages/monthly_expense_summary/MonthlyExpenses";
import MonthlyTotalSpending from "./pages/monthly_expense_summary/MonthlyTotalSpending";
import Login from "./pages/signup_and_login/Login";
import Signup from "./pages/signup_and_login/Signup";

function App() {
    axios.defaults.withCredentials = true;
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/"element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/monthlyExpenses" element={<MonthlyExpenses />} />
                <Route path="/monthlyTotalSpending" element={<MonthlyTotalSpending />} />
            </Routes>
        </BrowserRouter>    
    )
}

export default App;