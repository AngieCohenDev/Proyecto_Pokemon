const { request, response } = require("express");

//const Estudiante = require("../models/estudiante");

const estudianteGet = async (req = request, res = response) => {
  
    res.json({
        msg: 'get estudiante si funciona'
    })
};

const estudiantePost = async (req = request, res = response) => {
  
    res.json({
        msg: 'Post estudiante si funciona'
    })
};

const estudiantePut = async (req = request, res = response) => {
  
    res.json({
        msg: 'Put estudiante si funciona'
    })
};

const estudianteDelete = async (req = request, res = response) => {
  
    res.json({
        msg: 'Delete estudiante si funciona'
    })
};

module.exports = {
    estudianteGet,
    estudiantePost,
    estudiantePut,
    estudianteDelete
}
