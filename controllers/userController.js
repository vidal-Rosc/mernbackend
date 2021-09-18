//Importamos el model de usuario
const User = require('../models/User');

const bcryptjs = require('bcryptjs');

const { validationResult } = require('express-validator');

//Importamos JWT
const jwt  = require('jsonwebtoken');


exports.newUser =  async (request, response) => {
    //Siempre se recomienda usar un try-catch de esta manera manejamos errores
    //revisamos si hay errores
    const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({ errors: errors.array() });
        }

    //Extraemos email and password
    const { email, password } = request.body;
    try {
        //Validamos que el email del usuario sea unico
        let user = await User.findOne({ email });

        if(user){
            return response.status(400).json({ msg: 'The email is already taken'})
        }

        //Creamos el nuevo usuario
        user = new User(request.body);

        //Hasheamos el password salt ayuda a que todos los resultados finales de passw sean diferentes
        const salt = await  bcryptjs.genSalt(13);
        user.password = await bcryptjs.hash(password, salt);

        //Guardamos el usuario
        await user.save();

        //Creamos el JWT
        const payload = {
            user: {
                id: user.id,
            }

        }
        
        //Firmamos el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            //Confirmamos al usuario
            response.json({ token });
        });

    } catch (error) {
        console.log(error);
        response.status(400).send('error!!');
    }
}