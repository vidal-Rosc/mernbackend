//Ruta para autenticar a los usuarios

//Importamos express
const express = require('express');

//Express contiene router
const router = express.Router();

//Importamos el controller de autenticacion
const authController = require('../controllers/authController');

//Importamos nuestro middleware
const auth = require('../middlewares/auth');

//Para validar
const { check } = require('express-validator');

//Para Iniciar Sesion
// /api/auth
router.post('/',

    authController.userAuthenticator
)

//Obtiene el usuario logado
router.get('/',
    auth,
    authController.authenticatedUser
)


module.exports = router;