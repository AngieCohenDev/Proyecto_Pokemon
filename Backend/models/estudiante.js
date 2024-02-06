const { Schema, model } = require("mongoose");

const EstudianteSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es requerido"],
  },
  edad: {
    type: Number,
    required: [true, "La edad es requerida"],
  },
  documento_id: {
    type: Number,
    required: [true, "El documento de identidad es requerido"],
  },
  /*curso: {
    type: Schema.Types.ObjectId,
    ref: 'Curso',
    required: true
  },*/
  rol:{
    type: String,
    //required: true,
    enum: ['DOCENTE', 'ESTUDIANTE']
  },
  estado:{
    type: Boolean,
    default: true
}

});

module.exports = model("Estudiante", EstudianteSchema);
