const { categoryRepository } = require('../../repositories');

/**
 * Хендлер для удаления категории (логически)
 */
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        await categoryRepository.deleteCategory(categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = deleteCategory;
