const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')

class Warehouse extends Model {}

Warehouse.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category: {
        type: DataTypes.ENUM('hardware', 'software'),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Warehouse',
    tableName: 'warehouse',
    timestamps: true,
})

module.exports = Warehouse
