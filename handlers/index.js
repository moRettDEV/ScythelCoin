const addCategory = require('./category/addCategory');
const deleteCategory = require('./category/deleteCategory');
const restoreCategory = require('./category/restoreCategory');
const hardDeleteCategory = require('./category/hardDeleteCategory');
const addExpense = require('./expense/addExpense');
const deleteExpense = require('./expense/deleteExpense');
const getCategories = require('./category/getCategories');
const getExpensesByCategory = require('./expense/getExpensesByCategory');
const getAllExpenses = require('./expense/getAllExpenses');

module.exports = {
    addCategory,
    deleteCategory,
    restoreCategory,
    hardDeleteCategory,
    addExpense,
    deleteExpense,
    getCategories,
    getExpensesByCategory,
    getAllExpenses,
};
