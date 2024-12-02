
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


                // // Verificar si el usuario tiene permisos (ejemplo)
                // if (req.user.role !== 'admin') {
                //     return res.status(403).json({ error: 'No tienes permisos para esta acción.' }); // 403
                // }

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'El token ha expirado.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token inválido.' });
        } else {
            return res.status(500).json({ error: 'Error interno al verificar el token.' });
        }
    }
}

export{
    apiAuth
}