const {Schema, model} = require('mongoose');

const CursoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del curso es obligatorio'],
        unique: true
    },
    duracion:{
        type: Number,
        required: [true, 'La duracion del curso es requerida']
    },
    docente:{
        
    },
    estudiante:{
        type: Schema.Types.ObjectId,
        ref: 'Estudiante',
    }
})

module.exports = model('Curso', CursoSchema);