const express = require('express');
const handlers = require('../handlers');  // Импортируем все хендлеры

const router = express.Router();

// Маршруты для категорий
router.post('/categories', handlers.addCategory);
router.get('/categories', handlers.getCategories);
router.delete('/categories/:categoryId', handlers.deleteCategory); // Удаление категорий

// Маршруты для трат
router.post('/expenses', handlers.addExpense);
router.get('/category/:categoryId', handlers.getExpensesByCategory);
router.get('/expenses', handlers.getAllExpenses);
router.delete('/expenses/:expenseId', handlers.deleteExpense); // Удаление трат

module.exports = router;
