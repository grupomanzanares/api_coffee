import { matchedData } from "express-validator"

import User from "../models/User.js"
import { handleHttpError } from "../../helpers/httperror.js"
import jwt from 'jsonwebtoken'; // Importa jsonwebtoken
import { encrypt, compare } from "../helpers/password.js"


const login = async (req, res) => {
    try {
        req =  matchedData(req)
        const user = await User.findOne({ where: { email: req.email } });
        if(!user){
            handleHttpError(res, 'Usuario incorrecto')
            return
        }

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if (!check) {
            handleHttpError(res, 'Contraseña incorrecta')
            return
        }   
        
        user.set("password", undefined, {strict: false})
        
        const data = {
            //ojo mirar si vamos a usar el helper jwt o lo vamos a hacer aqui
            token: await tokenSign(user),
            user
        }
        res.send(data)
    } catch (e) {   
        console.error(e);
        handleHttpError(res, 'Error de login')
    }
    req =  matchedData(req)
}

const register = async (req, res) => {
    req = matchedData(req)
    const passwordHash = await encrypt(req.password)
    const body = {...req, password: passwordHash}
    const response = await User.create(body)
    response.set("password", undefined, {strict: false})

    const solicitar_token = jwt.sign({ id: user.identificacion, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '24h', // Tiempo de expiración
    });

    const data = {
        // token: await tokenSign(response),

        solicitar_token: solicitar_token,
        user: response
    }

    res.send({data})
}



const generateToken = async  (req, res) => {
    const { identificacion, password } = req.body;

    // Validar credenciales
    const user = await User.findOne({
        where: { identificacion, password },
    });
    
    if (!user) {
        return res.status(401).send({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT válido por 24 horas
    const token = jwt.sign({ id: user.identificacion, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '24h', // Tiempo de expiración
    });

    res.send({ token });
};

export{
    login,
    register,
    generateToken
}