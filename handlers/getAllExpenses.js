const db = require('../config/db');

/**
 * Хендлер для получения всех трат с категориями
 */
const getAllExpenses = (req, res) => {
    const query = `
        SELECT 
            e.id AS expense_id, 
            e.name AS expense_name, 
            e.amount, 
            e.description,
            IFNULL(
                JSON_ARRAYAGG(
                    JSON_OBJECT('id', c.id, 'name', c.name)
                ), '[]'
            ) AS categories
        FROM expenses e
        LEFT JOIN expense_categories ec ON e.id = ec.expense_id
        LEFT JOIN categories c ON ec.category_id = c.id
        GROUP BY e.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }

        try {
            const formattedResults = results.map(expense => ({
                id: expense.expense_id,
                name: expense.expense_name,
                amount: expense.amount,
                description: expense.description || '',
                categories: JSON.parse(expense.categories || '[]')
            }));
            res.status(200).json(formattedResults);
        } catch (parseError) {
            console.error('Ошибка обработки категорий:', parseError);
            return res.status(500).json({ error: 'Ошибка обработки категорий', details: parseError.message });
        }
    });
};

module.exports = getAllExpenses;
