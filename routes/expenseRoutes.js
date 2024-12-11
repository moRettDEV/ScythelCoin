//expenseRoutes.js

const express = require('express');
const addCategory = require('../handlers/addCategory');
const getCategories = require('../handlers/getCategories');
const addExpense = require('../handlers/addExpense');
const getExpensesByCategory = require('../handlers/getExpensesByCategory');
const getAllExpenses = require('../handlers/getAllExpenses');

const router = express.Router();

router.post('/categories', addCategory);
router.get('/categories', getCategories);
router.post('/expenses', addExpense);
router.get('/category/:categoryId', getExpensesByCategory);
router.get('/expenses', getAllExpenses);

module.exports = router;
