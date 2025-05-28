const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class JobSchedule extends Model {}

JobSchedule.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  supportRequestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scheduledDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium',
  },
}, {
  sequelize,
  modelName: 'JobSchedule',
});

module.exports = JobSchedule;
