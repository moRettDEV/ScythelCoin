const { categoryRepository } = require('../../repositories');

/**
 * Хендлер для жёсткого удаления категории
 */
const hardDeleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        await categoryRepository.hardDeleteCategory(categoryId);
        res.status(200).json({ message: 'Category permanently deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = hardDeleteCategory;
