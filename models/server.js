const express = require('express')
const cors = require('cors')

const { bdmysql } = require('../database/MySqlConnection')
const { dbConnectionMongo } = require('../database/MongoConnection')
const { dbConnectionNeo4j } = require('../database/Neo4jConnection')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    this.pathsMySql = {
      heroes: '/api/mysql/heroes',
      peliculas: '/api/mysql/peliculas',
      protagonistas: '/api/mysql/protagonistas'
    }

    this.pathsMongo = {
      auth: '/api/monog/auth',
      usuarios: '/api/mongo/usuarios',
      heroes: '/api/mongo/heroes',
      peliculas: '/api/mongo/peliculas',
      protagonistas: '/api/mongo/protagonistas',
      paises: '/api/mongo/paises',
      jugadores: '/api/mongo/jugadores',
      equipos: '/api/mongo/equipos',
      contrataciones: '/api/mongo/contrataciones'
    }

    this.pathsNeo4j = {
      paises: '/api/neo4j/paises',
      ciudades: '/api/neo4j/ciudades',
      visitas: '/api/neo4j/visitas',
      usuarios: '/api/neo4j/auth',
      sitios: '/api/neo4j/sitios',
      tags: '/api/neo4j/tags',
      personas: '/api/neo4j/personas',
      platos: '/api/neo4j/platos',
      favoritos: '/api/neo4j/favoritos'
    }

    // Conexion mysql
    this.dbConnection()

    // Conexion a mongo
    // this.conectarMongo()

    // Conexión a neo4j
    // this.conectarNeo()

    // Middlewares
    this.middlewares()

    // Routes
    this.routes()
  }

  async dbConnection () {
    try {
      await bdmysql.authenticate()
      console.log('Connection OK a MySQL.')

      // Crear tabla usuarios si no existe
      const { MySqlUsuario } = require('../models/mySqlUsuario');
      await MySqlUsuario.sync();
      console.log('Tabla usuarios sincronizada.');

        const { Heroes } = require('../models/mySqlHeroes')
      //   const { Peliculas } = require('../models/mySqlPeliculas')
      //   const { Protagonistas } = require('../models/mySqlProtagonistas')

      //   const { crearRelaciones } = require('../models/relaciones')
      //   crearRelaciones()

        await Heroes.sync()
        console.log('Tabla Heroes sincronizada.')

    //   await Peliculas.sync({ alter: true })
    //   console.log('Tabla Peliculas sincronizada.')
    //   await Protagonistas.sync({ alter: true })
    //   console.log('Tabla Protagonistas sincronizada.')
    } catch (error) {
      console.error('No se pudo Conectar a la BD MySQL', error)
    }
  }

  async conectarMongo () {
    await dbConnectionMongo()
  }

  async conectarNeo () {
    await dbConnectionNeo4j()
  }

  routes () {
    // Rutas de autenticación MySQL
    this.app.use('/api/usuarios', require('../routes/mysql/mySqlAuth.routes'));

    // Rutas protegidas de héroes MySQL
    this.app.use(this.pathsMySql.heroes, require('../routes/mysql/mySqlHeroes.routes'));

    // Puedes comentar las siguientes si no te interesan
    // this.app.use(this.pathsMySql.peliculas, require('../routes/mysql/mySqlPeliculas.routes'));
    // this.app.use(this.pathsMySql.protagonistas, require('../routes/mysql/mySqlProtagonistas.routes'));
    // this.app.use(this.pathsMongo.usuarios, require('../routes/mongo/usuarios.routes'))
    // this.app.use(this.pathsMongo.auth, require('../routes/auth/auth.routes'))
    // this.app.use(this.pathsMongo.heroes, require('../routes/mongo/mongoHeroes.routes'))
    // this.app.use(this.pathsMongo.peliculas, require('../routes/mongo/mongoPeliculas.routes'))
    // this.app.use(this.pathsMongo.protagonistas, require('../routes/mongo/mongoProtagonistas.routes'))
    // this.app.use(this.pathsMongo.paises, require('../routes/mongo/mongoPaises.routes'))
    // this.app.use(this.pathsMongo.jugadores, require('../routes/mongo/mongoJugadores.routes'))
    // this.app.use(this.pathsMongo.equipos, require('../routes/mongo/mongoEquipos.routes'))
    // this.app.use(this.pathsMongo.contrataciones, require('../routes/mongo/mongoContrataciones.routes'))
    // this.app.use(this.pathsNeo4j.paises, require('../routes/neo4j/paises.routes'))
    // this.app.use(this.pathsNeo4j.visitas, require('../routes/neo4j/visitas.routes'))
    // this.app.use(this.pathsNeo4j.tags, require('../routes/neo4j/tags.routes'))
    // this.app.use(this.pathsNeo4j.usuarios, require('../routes/neo4j/usuarios.routes'))
    // this.app.use(this.pathsNeo4j.sitios, require('../routes/neo4j/sitios.routes'))
    // this.app.use(this.pathsNeo4j.ciudades, require('../routes/neo4j/ciudades.routes'))
    // this.app.use(this.pathsNeo4j.personas, require('../routes/neo4j/personas.routes'))
    // this.app.use(this.pathsNeo4j.platos, require('../routes/neo4j/platos.routes.js'))
    // this.app.use(this.pathsNeo4j.favoritos, require('../routes/neo4j/favoritos.routes.js'))
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

module.exports = Server
