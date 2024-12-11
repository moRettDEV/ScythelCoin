//addExpenseController.js
const db = require('../../config/db');

const addExpenseController = (req, res) => {
    const { name, amount, description, categories } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Название траты обязательно' });
    }

    const query = 'INSERT INTO expenses (name, amount, description) VALUES (?, ?, ?)';
    db.query(query, [name, amount, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        const expenseId = result.insertId;

        categories.forEach((categoryId) => {
            const categoryQuery = 'INSERT INTO expense_categories (expense_id, category_id) VALUES (?, ?)';
            db.query(categoryQuery, [expenseId, categoryId], (err) => {
                if (err) {
                    console.error('Database error on category insert', err);
                }
            });
        });

        res.status(201).json({ message: 'Expense added successfully' });
    });
};

module.exports = addExpenseController;
