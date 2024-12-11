const db = require('../config/db');

/**
 * Хендлер для добавления траты
 */
const addExpense = (req, res) => {
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
        const categoryQueries = categories.map(categoryId => {
            return new Promise((resolve, reject) => {
                const categoryQuery = 'INSERT INTO expense_categories (expense_id, category_id) VALUES (?, ?)';
                db.query(categoryQuery, [expenseId, categoryId], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });

        Promise.all(categoryQueries)
            .then(() => {
                res.status(201).json({ message: 'Expense added successfully' });
            })
            .catch((err) => {
                console.error('Error adding categories to expense:', err);
                res.status(500).json({ error: 'Error adding categories to expense' });
            });
    });
};

module.exports = addExpense;
