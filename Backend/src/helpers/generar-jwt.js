const jwt = require("jsonwebtoken");
const Docente = require('../models/docente');

const generarJWT = (iud = "") => {
  return new Promise((resolve, reject) => {
    const payload = { iud };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const comprobarJWT = async(token = '') =>{
    try { 
      
      if( token.length < 10){
        return null;
      }
  
      const { iud } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      const docente = await Docente.findById(iud);
  
      if(docente){
          if(docente.estado){
            return docente;
          }
          else{
            return null;
          }
      }
      else{
        return null;
      }
      
    } catch (error) {
      return null;
    }
  }

  module.exports = {
    generarJWT,
    comprobarJWT
  }
