const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Ticket extends Model {
  static associate(models) {
    Ticket.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

Ticket.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  issue_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  computer_model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('new', 'in_progress', 'completed'),
    defaultValue: 'new',
  },
  scheduled_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estimate_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
  },
}, {
  sequelize,
  modelName: 'Ticket',
  timestamps: true,
});

module.exports = Ticket;
