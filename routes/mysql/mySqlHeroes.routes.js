const { Router } = require('express')

const {
  heroesGet,
  heroeIdGet,
  heroesComoGet,
  heroesPost,
  heroePut,
  heroeDelete
  // pruebaPost,
  // pruebaPut,
  // pruebaDelete,
  // pruebaPatch
} = require('../../controllers/mysql/MySqlHeroes.controller')

const router = Router()
const { validarJWTMySQL } = require('../../middlewares/validar-jwt-mysql')

router.get('/', validarJWTMySQL, heroesGet)
router.get('/:id', validarJWTMySQL, heroeIdGet)
router.get('/como/:termino', validarJWTMySQL, heroesComoGet)

// Proteger con JWT
router.post('/', validarJWTMySQL, heroesPost)
router.put('/:id', validarJWTMySQL, heroePut)
router.delete('/:id', validarJWTMySQL, heroeDelete)

// router.patch('/', usuariosPatch);

module.exports = router
