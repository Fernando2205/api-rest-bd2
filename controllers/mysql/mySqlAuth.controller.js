const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../../helpers/generar-jwt');
const { MySqlUsuario } = require('../../models/mySqlUsuario');

const crearCuenta = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  try {
    // Verificar si el correo ya existe
    const usuarioExiste = await MySqlUsuario.findOne({ where: { correo } });
    if (usuarioExiste) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
      });
    }
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const passwordHash = bcryptjs.hashSync(password, salt);
    // Crear usuario
    const usuario = await MySqlUsuario.create({
      nombre,
      correo,
      password: passwordHash,
      rol
    });
    // No generar ni retornar token aquí
    res.json({
      ok: true,
      usuario
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el Administrador',
      error
    });
  }
};

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    const usuario = await MySqlUsuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario / Password no son correctos - correo'
      });
    }
    if (!usuario.estado) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario / Password no son correctos - estado: false'
      });
    }
    const validaPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validaPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario / Password no son correctos - password'
      });
    }
    const token = await generarJWT(usuario.id);
    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el Administrador',
      error
    });
  }
};

module.exports = {
  crearCuenta,
  login
};
