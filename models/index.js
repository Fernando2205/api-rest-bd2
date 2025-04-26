const Usuario = require('./mongoUsuario.js')
const Server = require('./server')
const Heroe = require('./mySqlHeroes')
const MongoHeroe = require('./mongoHeroes.js')
const MongoPelicula = require('./mongoPeliculas.js')
const MongoProtagonista = require('./mongoProtagonistas.js')

module.exports = {
  Usuario,
  Server,
  Heroe,
  MongoHeroe,
  MongoPelicula,
  MongoProtagonista
}
