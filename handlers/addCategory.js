const db = require('../config/db');

/**
 * Хендлер для добавления категории
 */
const addCategory = (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO categories (name) VALUES (?)';
    db.query(query, [name], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Category added successfully' });
    });
};

module.exports = addCategory;
