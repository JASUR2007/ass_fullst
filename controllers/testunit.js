const { TestUnit } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const units = await TestUnit.findAll();
        res.json(units);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const unit = await TestUnit.findByPk(id);
        if (!unit) return res.status(404).json({ error: 'TestUnit not found' });
        res.json(unit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newUnit = await TestUnit.create({ name, description });
        res.status(201).json(newUnit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        const unit = await TestUnit.findByPk(id);
        if (!unit) return res.status(404).json({ error: 'TestUnit not found' });
        await unit.update({ name, description });
        res.json(unit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const unit = await TestUnit.findByPk(id);
        if (!unit) return res.status(404).json({ error: 'TestUnit not found' });
        await unit.destroy();
        res.json({ message: 'TestUnit deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
