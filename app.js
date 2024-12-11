// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Миддлвары
app.use(bodyParser.json());
app.use('/api/', expenseRoutes);

// Главная страница с формой для добавления трат
app.get('/', (req, res) => {
    res.render('index');
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
