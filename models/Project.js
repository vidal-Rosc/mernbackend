//Importamos mongoose, para las consultas a la BD
const mongoose = require('mongoose'); 

//Creamos el SCHEMA de usuarios
const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});
module.exports = mongoose.model('Project', ProjectSchema)