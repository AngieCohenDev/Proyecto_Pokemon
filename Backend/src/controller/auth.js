const bcryptjs = require("bcryptjs");
const { Docente, Estudiante } = require("../models");
const { generarJWT } = require("../helpers");

const loginDocente = async (req, res) => {
  const { documento_id, password } = req.body;

  try {
    // Verificar si el documento existe
    const docente = await Docente.findOne({ documento_id });
    if (!docente) {
      throw new Error(
        `El documento o la contraseña no son correctos - Documento`
      );
    }

    // Verificar si el docente esta activo
    if (!docente.estado) {
      throw new Error("el docente no se encuentra activo");
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, docente.password);
    if (!validPassword) {
      throw new Error(
        "El documento o la contraseña no son correctos -  Contraseña"
      );
    }

    //Generar el JWT
    const token = await generarJWT(docente.id);

    res.status(201).json({
      docente,
      token,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const loginEstudiante = async (req, res) => {
  const { documento_id, password } = req.body;

  try {
    // Verificar si el documento existe
    const estudiante = await Estudiante.findOne({ documento_id });
    if (!estudiante) {
      throw new Error(
        "El documento o la contraseña no son correctos - Documento"
      );
    }

    // Verificar si el estudiante esta activo
    if (!estudiante.estado) {
      throw new Error("el estudiante no se encuentra activo");
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, estudiante.password);
    if (!validPassword) {
      throw new Error(
        "El documento o la contraseña no son correctos - Contraseña"
      );
    }

    //Generar el JWT
    const token = await generarJWT(estudiante.id);

    res.status(201).json({
      estudiante,
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comuniquese con el administrador",
      error,
    });
  }
};

module.exports = {
  loginDocente,
  loginEstudiante,
};
