//Importamos el model de usuario
const User = require('../models/User');

//Para comparar el Password Hasheado
const bcryptjs = require('bcryptjs');

const { validationResult } = require('express-validator');

//Importamos JWT
const jwt  = require('jsonwebtoken');


//Autentica al Usuario
exports.userAuthenticator = async ( req, res ) => {
    //revisamos si hay errores
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
    
    //Extraemos email and password
    const { email, password } = req.body;

    try {
        //Revisamos que el usuario este registrado
        let user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({ msg: 'This user does not exist' });
            }
        //Revisamos que la password sea correcta
        const correctPassword = await bcryptjs.compare(password, user.password);
            if(!correctPassword){
                return res.status(400).json({ msg: 'Password incorrect' })
            }
        //Si el email y la password son correctos
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
            res.json({ token });
        });    
    } catch (error) {
        console.log(error)
    }  
}


//Obtiene el Usuario Logado
exports.authenticatedUser =  async (req, res) => {

    //Extraemos email and password
    const { email, password } = req.body;
    
    try {
        const user = await User.findById(req.user.id).select(-password);
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error was found'})     
    }
}