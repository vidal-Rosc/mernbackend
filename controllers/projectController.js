//Importamos el modelo de Proyectos
const Project = require('../models/Project');

//Para validar
const { validationResult } = require('express-validator');


//Creamos un proyecto
exports.createProject = async ( req, res ) => {

    //revisamos si hay errores
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

    try {
        //Los proyectos solo van a tener un nombre
        const project = new Project(req.body);

        //Guardamos el usuario creador del Proyecto
        project.creator = req.user.id;
        //Guardamos el proyecto
        project.save();
        res.json(project);

    } catch (error) {
        console.log(error)
        res.status(500).send('An error was found')
    }
}

//Obtenemos todos los projectos del usuario actual
exports.getProjects = async (req, res) => {
    try {
        console.log(req.user) //Aqui podemos ver el ID del usuario
    
        //Buscamos los proyectos en los que el valor del campo creator sea igual al id del usuario actual
        const projects = await Project.find({ creator: req.user.id}).sort({ createdAt : -1});

        //Enviamos la respuesta
        res.json({ projects })


    } catch (error) {
        console.log(error);
        res.status(500).send('An error was found')
        
    }
}

//Actualizamos un proyecto
exports.updateProject = async (req, res) => {
    //revisamos si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
    }
 
    //Extraemos la info del proyecto
    const { name } = req.body;

    //Creamos un nuevo objeto
    const projectUpdated = {};
    if(name){
        projectUpdated.name = name;
    }

    try {
        //Comprobamos si existe el ID
        let project =  await Project.findById(req.params.id);

        //Comprobamos si el proyecto existe o no
        if(!project){
           return res.status(404).json({ msg: 'Project NOT FOUND' })
        }

        //Verificamos el usuario creador del proyecto
        if(project.creator.toString() !== req.user.id){
           return res.status(401).json({ msg: 'unauthorized user'})
        }
        //Actualizamos el proyecto
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, 
            { $set: projectUpdated }, { new: true });
        
        //Retornamos la respuesta como JSON
        res.json({ project });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }
}

//Borramos un projecto por ID
exports.deleteProject = async (req, res)  => {
    try {
        //Comprobamos si existe el ID
        let project =  await Project.findById(req.params.id);

        //Comprobamos si el proyecto existe o no
        if(!project){
           return res.status(404).json({ msg: 'Project NOT FOUND' })
        }

        //Verificamos el usuario creador del proyecto
        if(project.creator.toString() !== req.user.id){
           return res.status(401).json({ msg: 'unauthorized user'})
        }

        //Borramos el proyecto   En mongo el _id se agrega asi
        await Project.findOneAndRemove({ _id: req.params.id})

        //Mostramos mensaje
        res.json({ msg: 'Project deleted'})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error') 
    }
}
