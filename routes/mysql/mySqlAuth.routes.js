const { Router } = require('express');
const { crearCuenta, login } = require('../../controllers/mysql/mySqlAuth.controller');

const router = Router();

router.post('/register', crearCuenta);
router.post('/login', login);

module.exports = router;
