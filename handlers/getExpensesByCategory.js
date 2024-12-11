const db = require('../config/db');

/**
 * Хендлер для получения трат по категории
 */
const getExpensesByCategory = (req, res) => {
    const { categoryId } = req.params;
    const query = `
        SELECT expenses.*, categories.name 
        FROM expenses 
        JOIN expense_categories ON expenses.id = expense_categories.expense_id
        JOIN categories ON expense_categories.category_id = categories.id
        WHERE categories.id = ?
    `;
    db.query(query, [categoryId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(result);
    });
};

module.exports = getExpensesByCategory;
