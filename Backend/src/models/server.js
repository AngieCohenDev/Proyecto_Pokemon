const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
//TODO: inecesario
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.server = express();
    this.port = process.env.PORT;

    //TODO: optimizar usando un hashmap o Record para esto
    this.paths = {
      estudiantes: "/estudiantes",
      cursos: "/cursos",
      docente: "/docentes",
      auth: "/auth",
      buscar: "/buscar",
    };

    // Conectar a la base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas del servidor
    this.routes();
  }

  middlewares() {
    // CORS
    this.server.use(cors());

    // Lectura y parseo del body
    this.server.use(express.json());
  }
  //TODO: inecesario
  async conectarDB() {
    await dbConnection();
  }

  routes() {
    //TODO: recorrer HashMap o Record para esto
    this.server.use(this.paths.estudiantes, require("../routes/estudiante"));
    this.server.use(this.paths.cursos, require("../routes/curso"));
    this.server.use(this.paths.docente, require("../routes/docente"));
    this.server.use(this.paths.auth, require("../routes/auth"));
    this.server.use(this.paths.buscar, require("../routes/buscar"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto ", this.port);
    });
  }
}

module.exports = Server;
