const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const MySqlUsuario = bdmysql.define('usuarios', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img:{
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: 'USER_ROLE'
  }
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
});

module.exports = {
  MySqlUsuario
};
