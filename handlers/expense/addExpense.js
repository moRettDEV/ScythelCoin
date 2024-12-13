const { expenseRepository } = require('../../repositories');

/**
 * Хендлер для добавления траты
 */
const addExpense = (req, res) => {
    const { name, amount, description, categories } = req.body;

    const parsedAmount = parseFloat(amount);  // Преобразуем в число

    // Проверяем, если это не число
    if (isNaN(parsedAmount)) {
        return res.status(400).json({ message: 'Неверное значение для суммы' });
    }

    // Добавление траты в таблицу expenses
    expenseRepository.addExpense({ name, amount: parsedAmount, description })
        .then(expenseId => {
            const categoryPromises = categories.map(categoryId => {
                return expenseRepository.addExpenseCategory(expenseId, categoryId);
            });

            return Promise.all(categoryPromises);
        })
        .then(() => {
            res.json({ message: 'Трата добавлена!' });
        })
        .catch(error => {
            console.error('Ошибка при добавлении траты:', error);
            res.status(500).json({ message: 'Ошибка при добавлении траты' });
        });
};


module.exports = addExpense;
