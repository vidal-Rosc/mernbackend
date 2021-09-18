//Importamos el modelo de tareas
const Task = require('../models/Task');

//Importamos el modelo de Proyectos
const Project = require('../models/Project');

//Para validar
const { validationResult } = require('express-validator');


//Creamos una tarea
exports.createTask = async ( req, res ) => {

    //revisamos si hay errores
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
    
    //Extraemos el proyecto y comprobamos si existe
    const { project } = req.body;

    try {
        const existingProject = await Project.findById(project);
        if(!existingProject){
            return res.status(404).json({ msg: 'Project NOT FOUND' })
        }

        //Revisamos que el usuario autenticado sea el titular de este proyecto
        if(existingProject.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'unauthorized user'})
         }

        //Creamos la tarea //Guardamos  //Imprimimos la tarea agregada
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
        
    } catch (error) {
        console.log(error)
        res.status(500).send('An error was found')  
    } 
}

exports.getTasks = async ( req, res ) => {
    try {
        //Extraemos el proyecto y comprobamos si existe
        const { project } = req.query;

        const existingProject = await Project.findById(project);
        if(!existingProject){
            return res.status(404).json({ msg: 'Project NOT FOUND' })
        }

        //Revisamos que el usuario autenticado sea el titular de este proyecto
        if(existingProject.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'unauthorized user'})
         }

       //Obtenemos las tareas por proyecto
       const tasks = await Task.find({ project }).sort({ createdAt: -1 });
       res.json({ tasks })
        
    } catch (error) {
        res.status(500).send('An error was found');    
    }
}

exports.updateTask = async ( req, res) => {
    try {
        //Extraemos el proyecto y comprobamos si existe
        const { project, name, status } = req.body;

        //Comprobamos  si existe la tarea
        let task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({ msg: 'Task NOT FOUND' })
        }

        const existingProject = await Project.findById(project);
        if(!existingProject){
            return res.status(404).json({ msg: 'Project NOT FOUND' })
        }

        //Revisamos que el usuario autenticado sea el titular de este proyecto
        if(existingProject.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'unauthorized user'})
         }
        
    
        //Creamos un objeto con la informacion captada.
        const updatedTask = {};
        updatedTask.name = name;
        updatedTask.status = status;

        //Guardamos la tarea
        task = await Task.findOneAndUpdate({ _id: req.params.id }, updatedTask, { new: true})
        res.json({ task });
        
    } catch (error) {
       console.log(error) ;
       res.status(500).send('An error was found');
    }
}

exports.deleteTask = async ( req, res ) => {
    try {
        //Extraemos el proyecto 
        const { project } = req.query; //No usamos req.body porque pasamos params

        //Comprobamos  si existe la tarea
        let task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({ msg: 'Task NOT FOUND' })
        }

        //Comprobamos si existe el proyecto
        const existingProject = await Project.findById(project);
        if(!existingProject){
            return res.status(404).json({ msg: 'Project NOT FOUND' })
        }

        //Revisamos que el usuario autenticado sea el titular de este proyecto
        if(existingProject.creator.toString() !== req.user.id){
            return res.status(401).json({ msg: 'unauthorized user'})
         }
        
        //Eliminamos
        await Task.findOneAndRemove({ _id: req.params.id});
        res.json({ msg: 'Task deleted'});

    } catch (error) {
       console.log(error) ;
       res.status(500).send('An error was found');
    }
}