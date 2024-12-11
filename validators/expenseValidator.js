// validators/expenseValidator.js
const Joi = require('joi');

const validateExpense = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(), // Название траты обязательно
        amount: Joi.number().required(), // Сумма обязательно
        description: Joi.string().allow(''), // Описание теперь необязательно
        categories: Joi.array().items(Joi.number().integer().required()).min(1).required(), // Категории обязательно
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = { validateExpense };
