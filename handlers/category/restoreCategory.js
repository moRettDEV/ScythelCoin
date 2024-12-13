const { categoryRepository } = require('../../repositories');

/**
 * Хендлер для восстановления категории
 */
const restoreCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        await categoryRepository.restoreCategory(categoryId);
        res.status(200).json({ message: 'Category restored successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = restoreCategory;
