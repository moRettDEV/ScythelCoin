const { expenseRepository } = require('../../repositories');

/**
 * Хендлер для получения всех трат по категории
 */
const getExpensesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const expenses = await expenseRepository.getExpensesByCategory(categoryId);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = getExpensesByCategory;
