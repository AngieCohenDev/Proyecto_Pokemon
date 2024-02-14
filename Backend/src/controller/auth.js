const bcryptjs = require('bcryptjs')
const {Docente, Estudiante} = require('../models')
const {generarJWT}  = require('../helpers')

const loginDocente = async (req, res = response) => {
    const { documento_id, password } = req.body;
  
    try {

      // Verificar si el documento existe
      const docente = await Docente.findOne({ documento_id });
      if (!docente) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos - Documento",
        });
      }

      // Verificar si el docente esta activo
      if (!docente.estado) {
        return res.status(400).json({
          msg: "EL docente no se encuentra activo",
        });
      }
  
      // Verificar la contraseña
      const validPassword = bcryptjs.compareSync(password, docente.password);
      if (!validPassword) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos - password",
        });
      }
  
      //Generar el JWT
      const token = await generarJWT(docente.id);
  
      res.json({
        docente,
        token,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  };

  const loginEstudiante = async (req, res = response) => {
    const { documento_id, password } = req.body;
  
    try {

      // Verificar si el documento existe
      const estudiante = await Estudiante.findOne({ documento_id });
      if (!estudiante) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos - Documento",
        });
      }

      // Verificar si el estudiante esta activo
      if (!estudiante.estado) {
        return res.status(400).json({
          msg: "EL estudiante no se encuentra activo",
        });
      }
  
      // Verificar la contraseña
      const validPassword = bcryptjs.compareSync(password, estudiante.password);
      if (!validPassword) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos - password",
        });
      }
  
      //Generar el JWT
      const token = await generarJWT(estudiante.id);
  
      res.json({
        estudiante,
        token,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  };



  module.exports = {
    loginDocente,
    loginEstudiante
  }