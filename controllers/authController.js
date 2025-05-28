const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Регистрация пользователя
exports.register = async (req, res) => {
  const { name, email, password, role, phone_number, account, company_name, company_adress } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone_number,
      role,
      account,
      company_name,
      company_adress

    });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'Регистрация прошла успешно', token, id: user.id });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при регистрации', error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Неверный email или пароль' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверный email или пароль' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Вход выполнен успешно',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при входе', error: err.message });
  }
};

