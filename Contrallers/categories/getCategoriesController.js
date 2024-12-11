//getCategoriesController.js
const db = require('../../config/db');

const getCategoriesController = (req, res) => {
    const query = 'SELECT * FROM categories';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(result);
    });
};

module.exports = getCategoriesController;
