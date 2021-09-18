//Rutas para CRUD de tareas

//Importamos express
const express = require('express');

//Express contiene router
const router = express.Router();

//Importamos el controller de autenticacion
const taskController = require('../controllers/taskController');

//Importamos nuestro middleware para validaciones
const auth = require('../middlewares/auth');

//Para validar
const { check } = require('express-validator');


//Creamos una nueva Tarea
// /api/tasks
router.post('/',
    auth,
    [
        check('name', 'The Task name is required').not().isEmpty(),
        check('project', 'The Project name is required').not().isEmpty(),
    ],
    taskController.createTask
);

//Obtenemos las tareas
// /api/tasks
router.get('/',
    auth,
    taskController.getTasks
);

//Actualizamos una tarea por ID
// /api/tasks
router.put('/:id',
    auth,
    taskController.updateTask
);

//Eliminamos una tarea por ID
// /api/tasks
router.delete('/:id',
    auth,
    taskController.deleteTask
);


module.exports = router;

