//Importamos mongoose, para las consultas a la BD
const mongoose = require('mongoose'); 

//Creamos el SCHEMA de usuarios
const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registration: {
        type: Date,
        default: Date.now()
    }

});
module.exports = mongoose.model('User', UsersSchema)