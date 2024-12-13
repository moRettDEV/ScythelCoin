const { expenseRepository } = require('../../repositories');

/**
 * Хендлер для удаления траты
 */
const deleteExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        await expenseRepository.deleteExpense(expenseId);
        res.status(200).json({success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = deleteExpense;
