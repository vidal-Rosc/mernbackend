//Importamos JWT
const jwt  = require('jsonwebtoken');



module.exports = function( req, res, next){
    //Leemos el token del header
    const token = req.header('x-auth-token');

    //Revisamos si no hay token
    if(!token){
        return res.status(401).json({ msg: 'No token, access denied' })
    }

    //Validamos el token
    try {
        const encryption = jwt.verify(token, process.env.SECRET);

        //Agregamos como parte del request
        req.user = encryption.user;

        //Para que se vaya al siguiente middleware
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token, access denied' });
    }
}