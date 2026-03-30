const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const { MySqlUsuario } = require('../models/mySqlUsuario');

const validarJWTMySQL = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición...'
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWTSECRET);
    const usuario = await MySqlUsuario.findByPk(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en BD'
      });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado: false'
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'El token no es válido...'
    });
  }
};

module.exports = {
  validarJWTMySQL
};
