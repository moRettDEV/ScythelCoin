const { categoryRepository } = require('../../repositories');

/**
 * Хендлер для получения всех категорий
 */
const getCategories = async (req, res) => {
    try {
        const categories = await categoryRepository.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = getCategories;
