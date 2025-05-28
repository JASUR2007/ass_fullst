const Warehouse = require('../models/Warehouse');

exports.getWareHouse = async (req, res) => {
    try {
        const items = await Warehouse.findAll();
        res.status(200).json(items);
    } catch (error) {
        console.error('Ошибка при получении товаров склада:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createWareHouse = async (req, res) => {
    try {
        const { category, name, description, price } = req.body;
        const newItem = await Warehouse.create({ category, name, description, price });
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Ошибка при создании товара склада:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateWareHouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, name, description, price } = req.body;

        const item = await Warehouse.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.update({ category, name, description, price });
        res.status(200).json(item);
    } catch (error) {
        console.error('Ошибка при обновлении товара склада:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteWareHouse = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Warehouse.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Ошибка при удалении товара склада:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
