const { expenseRepository } = require('../../repositories');

/**
 * Хендлер для получения всех трат
 */
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseRepository.getAllExpenses();
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Ошибка загрузки трат:', error);
        res.status(500).json({ error: 'Database error' });
    }
};


module.exports = getAllExpenses;
