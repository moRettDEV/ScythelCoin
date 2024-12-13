const { categoryRepository } = require('../../repositories');

/**
 * Хендлер для добавления категории
 */
const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const categoryId = await categoryRepository.addCategory(name);
        res.status(201).json({ "success": true, message: 'Category added successfully', categoryId });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = addCategory;
