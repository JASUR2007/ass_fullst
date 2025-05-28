const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class SupportRequest extends Model {
  static associate(models) {
    SupportRequest.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

SupportRequest.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quote: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'SupportRequest',
});

module.exports = SupportRequest;
