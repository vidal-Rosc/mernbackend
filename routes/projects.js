//Rutas para CRUD proyectos

//Importamos express
const express = require('express');

//Express contiene router
const router = express.Router();

//Importamos el controller de autenticacion
const  projectController = require('../controllers/projectController');

//Importamos nuestro middleware
const auth = require('../middlewares/auth');

//Para validar
const { check } = require('express-validator');




//Creamos un nuevo proyecto
// /api/projects
router.post('/',
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectController.createProject
);

//Obtenemos todos los proyectos
// /api/projects
router.get('/',
    auth,
    projectController.getProjects
);

//Actualizamos un proyecto por id
// /api/projects
router.put('/:id',
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectController.updateProject
)

//Borramos un proyecto por id
// /api/projects
router.delete('/:id',
    auth,
    projectController.deleteProject
)
module.exports = router;