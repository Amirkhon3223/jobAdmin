const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');

const app = express();
const port = 8080;

app.use(cors({origin: 'http://localhost:4200'}));

app.use(session({
    secret: 'keykey', // секретный ключ для доступа потом когда будет готов реальный БЕК заменим
    resave: false,
    saveUninitialized: true,
}));

const users = [
    {username: 'user', password: 'user'},
];

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    // Поиск пользователя по логину и паролю
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        // Если Успешная аутентификация
        // Устанавливаем пользователя в сессию
        req.session.user = user;
        res.status(200).json({message: 'Аутентификация успешна'});
    } else {
        // Неудачная аутентификация
        res.status(401).json({message: 'Неудачная аутентификация'});
    }
});

app.get('/profile', (req, res) => {
    if (req.session.user) {
        // Пользователь аутентифицирован
        res.json({message: 'Профиль пользователя', user: req.session.user});
    } else {
        // Пользователь не аутентифицирован
        res.status(401).json({message: 'Пользователь не аутентифицирован'});
    }
});

app.post('/logout', (req, res) => {
    // Проверяем, если пользователь аутентифицирован, удаляем сессию
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                // В случае ошибки удаления сессии, отправляем статус ошибки
                res.status(500).json({message: 'Ошибка при выходе пользователя'});
            } else {
                // Успешный выход пользователя
                res.status(200).json({message: 'Выход пользователя успешен'});
            }
        });
    } else {
        // Пользователь не был аутентифицирован, поэтому просто отправляем успешный статус
        res.status(200).json({message: 'Выход пользователя успешен'});
    }
});


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
