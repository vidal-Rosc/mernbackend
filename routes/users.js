//Importamos express
const express = require('express');

//Express contiene router
const router = express.Router();

//Importamos el controller para usuarios
const userController = require('../controllers/userController');

const { check } = require('express-validator');

// /api/users
router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Enter a correct email').isEmail(),
        check('password', 'The password must have at least 6 characters').isLength({ min: 6 })
    ],
    userController.newUser
)
module.exports = router;