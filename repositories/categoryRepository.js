const db = require('../config/db');

/**
 * Добавление новой категории
 * @param {string} name - название категории
 * @returns {Promise<number>} - ID добавленной категории
 */
const addCategory = (name) => {
    const query = 'INSERT INTO categories (name) VALUES (?)';
    return new Promise((resolve, reject) => {
        db.query(query, [name], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result.insertId);
        });
    });
};

/**
 * Получение всех категорий
 * @returns {Promise<Array>} - список категорий
 */
const getCategories = () => {
    const query = 'SELECT * FROM categories';
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

/**
 * Удаление категории (логически)
 * @param {number} categoryId - ID категории
 * @returns {Promise} - промис
 */
const deleteCategory = (categoryId) => {
    const query = 'UPDATE categories SET deleted = 1 WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [categoryId], (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

/**
 * Восстановление категории
 * @param {number} categoryId - ID категории
 * @returns {Promise} - промис
 */
const restoreCategory = (categoryId) => {
    const query = 'UPDATE categories SET deleted = 0 WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [categoryId], (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

/**
 * Жёсткое удаление категории
 * @param {number} categoryId - ID категории
 * @returns {Promise} - промис
 */
const hardDeleteCategory = (categoryId) => {
    const query = 'DELETE FROM categories WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [categoryId], (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

module.exports = { addCategory, getCategories, deleteCategory, restoreCategory, hardDeleteCategory };
