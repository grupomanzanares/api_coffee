
import  jwt  from "jsonwebtoken";

const apiAuth = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'No se proporcionó un token.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET) 
        req.user = decoded; // Adjunta datos decodificados al request
        next();
    } catch (error) {
        res.status('401')
        res.send({error: 'Token inválido o expirado...'})
    }
}

export{
    apiAuth
}