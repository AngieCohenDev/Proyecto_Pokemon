
//TODO: no colocar archivos de logica fuera de src, solo configuraciones
require("dotenv").config();

const Server = require("./src/models/server");

const server = new Server();

server.listen();
