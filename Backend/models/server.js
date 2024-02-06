const express = require("express");
const cors = require("cors");

const { createServer } = require("http");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);

    this.paths = {
      estudiantes: "/estudiantes",
      cursos: "/cursos",
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
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.estudiantes, require("../routes/estudiante"));
    this.app.use(this.paths.cursos, require("../routes/curso"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto ", this.port);
    });
  }
}

module.exports = Server;
