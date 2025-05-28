const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class KnowledgeBase extends Model {}

KnowledgeBase.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.ENUM('hardware', 'software'),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  img_base: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'KnowledgeBase',
});

module.exports = KnowledgeBase;
