const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Docente = require('../models/docente')

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");
  
    if (!token) {
      return res.status(401).json({
        msg: "No hay token en la peticion",
      });
    }
  
    try {
      const { iud } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  
      const docente = await Docente.findById(iud);
      if (!docente) {
        return res.status(401).json({
          msg: "Tokon no valido - Docente no existe en DB",
        });
      }
  
      // Validar si el uid tiene estado true
      if (!docente.estado) {
        return res.status(401).json({
          msg: "Tokon no valido - El docente no esta activo",
        });
      }
  
      req.docente = docente;
  
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: "Token no valido",
      });
    }
  };
  
  module.exports = {
    validarJWT,
  };
  