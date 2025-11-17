import express from "express";
import pg from "pg";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// integrate sessions to manage session data
app.use(session({
    secret: "apples_and_bananas_12345",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        path: '/',
        secure: false,
        sameSite: 'lax'
    }
}));

// database structure
const db = new pg.Client({
    user: 'expense_user',
    host: 'localhost',
    database: 'ExpenseTrackerDB',
    password: '8097531*rH12',
    port: 5432
});

db.connect();

// body parsers
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// route to get the total expenses for a certain month/year
app.get('/api/monthlyTotal', async (req, res) => {
    const {userId, month, year} = req.query;
    try{
        const response = await db.query("SELECT SUM(amount) AS total_spending FROM(SELECT amount, EXTRACT(MONTH FROM date_of_expense) AS expense_month, EXTRACT(YEAR FROM date_of_expense) AS expense_year FROM Expenses WHERE user_id = $1) WHERE expense_month = $2 AND expense_year = $3", [userId, month, year]);
        const totalSpending = response.rows[0].total_spending ?? 0;
        return res.status(200).json({totalSpending}); 
    }catch(err){
        return res.status(500).json({error: "Internal Server Error"});
    }
});

// route to get the daily average for a certain month/year
app.get('/api/averageDaily', async (req, res) => {
    const {userId, month, year}= req.query;
    try{
        const response = await db.query("SELECT ROUND(monthly_expenses / days_in_month, 2) AS daily_average FROM(SELECT SUM(amount) AS monthly_expenses, expense_month, expense_year, days_in_month FROM(SELECT amount, EXTRACT(MONTH FROM date_of_expense) AS expense_month, EXTRACT(YEAR FROM date_of_expense) AS expense_year, EXTRACT(DAY FROM(date_trunc('month', date_of_expense) + INTERVAL '1 month - 1 day'))::int AS days_in_month FROM Expenses WHERE user_id = $1) AS monthly_summary WHERE expense_month = $2 AND expense_year = $3 GROUP BY expense_month, expense_year, days_in_month);", [userId, month, year]);
        if(response.rows.length === 0){
            res.status(200).json({average: 0});
        }
        const average = response.rows[0].daily_average ?? 0;
        return res.status(200).json({average});
    } catch(err){
        return res.status(500).json({error: "Internal Server Error"})
    }
})

// route to get the category name and amount for a certain month/year
app.get('/api/categoryAmount', async (req, res) => {
    const {userid, selectedMonth, selectedYear} = req.query;
    try{
        const response = await db.query("SELECT c.category_name AS category, SUM(e.amount) AS amount FROM(SELECT user_id, category_id, amount, EXTRACT(MONTH FROM date_of_expense) AS expense_month, EXTRACT(YEAR FROM date_of_expense) AS expense_year FROM Expenses) AS e INNER JOIN Category AS c ON e.category_id = c.category_id WHERE e.user_id = $1 AND e.expense_month = $2 AND e.expense_year = $3 GROUP BY c.category_name;", [userid, selectedMonth, selectedYear])
        const categories = response.rows;
        console.log(categories);
        return res.status(200).json({ categories });
    }
    catch(err){
        return res.status(500).json({error: "Internal Server Error"});
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})