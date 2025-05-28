const User = require('../models/user');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: 'client'
      }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при загрузке пользователей', error: err.message });
  }
};


const getUserAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    const user = await User.findByPk(userId);

    if (!user || !user.avatarPath) {
      return res.status(404).json({ message: 'Аватар не найден' });
    }

    // Убедись, что avatarPath — имя файла, а не полный путь
    const avatarFullPath = path.resolve(__dirname, '../public/uploads/avatars/', user.avatarPath);

    if (!fs.existsSync(avatarFullPath)) {
      return res.status(404).json({ message: 'Файл аватара не найден' });
    }

    res.sendFile(avatarFullPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone_number, password, role, account, company_name,company_adress } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    // Обновляем поля
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone_number) user.phone_number = phone_number;
    if (role) user.role = role;
    if (account) user.account = account;
    if (company_name !== undefined) user.company_name = company_name;
    if (company_adress !== undefined) user.company_adress = company_adress;

    // Если пароль передан — хешируем и обновляем
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: 'Пользователь обновлен', user });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при обновлении пользователя', error: err.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    // Если хотите — удалите файл аватара, если он есть
    if (user.avatarPath) {
      const avatarFullPath = path.resolve(__dirname, '../public/uploads/avatars/', user.avatarPath);
      if (fs.existsSync(avatarFullPath)) {
        fs.unlinkSync(avatarFullPath);
      }
    }

    await user.destroy();

    res.json({ message: 'Пользователь удалён' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении пользователя', error: err.message });
  }
};

module.exports = { getUsers, getUserAvatar, editUser, deleteUser };
