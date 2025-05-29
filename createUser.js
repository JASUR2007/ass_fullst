const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Путь к твоей модели
const sequelize = require('./config/database'); // Путь к твоей БД
require('dotenv').config(); // Загружает JWT_SECRET из .env

async function createTestUser() {
    try {
        await sequelize.authenticate();
        console.log('✅ DB connected');

        const email = 'john0@example.com';
        const plainPassword = '1234';

        // Проверка, есть ли уже такой пользователь
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('⚠️ Пользователь уже существует');
            return;
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Создаём нового пользователя
        const newUser = await User.create({
            name: 'Ivan Test',
            email,
            phone_number: '1234567890',
            password: hashedPassword,
            role: 'admin',
            account: 'client'
        });

        console.log('✅ Пользователь создан:', newUser.email);

        // Генерируем JWT-токен
        const token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email
            },
            process.env.JWT_SECRET || 'some_super_secret_key_123456', // fallback на случай отсутствия .env
            { expiresIn: '1h' }
        );

        console.log('🔑 JWT токен:');
        console.log(token);

    } catch (error) {
        console.error('❌ Ошибка при создании пользователя:', error);
    } finally {
        await sequelize.close();
    }
}

createTestUser();
