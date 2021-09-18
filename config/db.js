//Importamos mongoose, para las consultas a la BD
const mongoose = require('mongoose'); 

//variables
require('dotenv').config({ path: 'var.env' }); 

//Conexion a la base de datos
const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DDBB Connection successful')
    } catch (error) {
        console.log('error');
        //En caso de un error en la conexion, detiene la app.
        process.exit(1);
    }
}
//Para hacer la funcion disponible en los otros archivos
module.exports = connectionDB; 