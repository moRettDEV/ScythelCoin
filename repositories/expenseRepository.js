const db = require('../config/db');

/**
 * Добавление новой траты
 * @param {Object} expense - данные траты
 * @param {string} expense.name - название траты
 * @param {number} expense.amount - сумма
 * @param {string} expense.description - описание
 * @returns {Promise<number>} - ID добавленной траты
 */
const addExpense = (expense) => {
    const query = 'INSERT INTO expenses (name, amount, description) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [expense.name, expense.amount, expense.description], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result.insertId);
        });
    });
};

/**
 * Добавление связи между тратой и категорией
 * @param {number} expenseId - ID траты
 * @param {number} categoryId - ID категории
 * @returns {Promise} - промис
 */
const addExpenseCategory = (expenseId, categoryId) => {
    const query = 'INSERT INTO expense_categories (expense_id, category_id) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [expenseId, categoryId], (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};


/**
 * Получение всех трат
 * @returns {Promise<Array>} - список трат
 */
const getAllExpenses = () => {
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
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            // Обработка полученных данных и предотвращение ошибки при отсутствии категорий
            const formattedResults = results.map(expense => ({
                id: expense.expense_id,
                name: expense.expense_name,
                amount: expense.amount,
                description: expense.description || '',
                categories: expense.categories ? JSON.parse(expense.categories) : []  // Если категорий нет, вернуть пустой массив
            }));
            resolve(formattedResults);
        });
    });
};

/**
 * Удаление траты
 * @param {number} expenseId - ID траты
 * @returns {Promise} - промис
 */
const deleteExpense = (expenseId) => {
    const query = 'DELETE FROM expenses WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [expenseId], (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

/**
 * Удаление категории из траты (категория становится неактивной, но не удаляется)
 * @param {number} expenseId - ID траты
 * @param {number} categoryId - ID категории
 * @returns {Promise} - промис
 */
const removeCategoryFromExpense = (expenseId, categoryId) => {
    const query = 'DELETE FROM expense_categories WHERE expense_id = ? AND category_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [expenseId, categoryId], (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

module.exports = { addExpense, getAllExpenses, deleteExpense, removeCategoryFromExpense, addExpenseCategory };
