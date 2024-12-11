// Contrallers/expenseController.js
const db = require('../config/db');

// Добавление траты
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

        // Добавляем связи с категориями
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

// Получение трат по категории
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

// Добавление категории
const addCategory = (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO categories (name) VALUES (?)';
    db.query(query, [name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Category added successfully' });
    });
};

// Получение всех категорий
const getCategories = (req, res) => {
    const query = 'SELECT * FROM categories';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(result);  // Возвращаем список категорий
    });
};
module.exports = { addExpense, getExpensesByCategory, addCategory, getCategories };
