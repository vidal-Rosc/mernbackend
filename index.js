//Importamos express
const express = require('express');

//Importamos para conectarnos a la BD
const connectionDB = require('./config/db');

//Importamos cors
const cors = require('cors');

//Creamos el servidor
const server = express();

//Conectamos la BD
connectionDB();

//Habilitamos cors y de esta manera permitimos solo peticiones desde nuestro frontEND
const corsOptions = {
    origin: 'https://projects-tasks.netlify.app',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

server.use( cors(corsOptions) );


//Habilitamos el express.JSON para leer los datos que el usuario escriba
server.use(express.json({ extended: true }));

//Asignamos un puerto
const port = process.env.port || 5000;

//Importamos las rutas
server.use('/api/users', require('./routes/users'));

server.use('/api/auth', require('./routes/auth'));

server.use('/api/projects', require('./routes/projects'));

server.use('/api/tasks', require('./routes/tasks'));

//Definimos el home-page
server.get('/', (req, res) => {
    res.send('Welcome to the MERN server')
})

//Encendemos el Servidor
server.listen(port, '0.0.0.0', () => {
    console.log(`Server starting in port ${port}`);
});