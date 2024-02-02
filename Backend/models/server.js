const express = require("express");

const { createServer } = require("http");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);

    // Conectar a la base de datos
    this.conectarDB();
  }

  async conectarDB() {
    await dbConnection();
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto ", this.port);
    });
  }
}

module.exports = Server;
