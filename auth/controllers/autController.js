import { matchedData } from "express-validator"

import User from "../models/User.js"
import { handleHttpError } from "../../helpers/httperror.js"
import jwt from 'jsonwebtoken'; // Importa jsonwebtoken
import { encrypt, compare } from "../helpers/password.js"
import { tokenSign } from "../../helpers/jwt.js"


const login = async (req, res) => {

    try {
        req = matchedData(req);
        const user = await User.findOne({where:{ identificacion: req.identificacion } });
            if(!user){
                handleHttpError(res, 'Usuario incorrecto')
                return
            }

        const hashPassword = user.password;
        // console.log("el pass",hashPassword)
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

}

const register = async (req, res) => {

    try {


            req = matchedData(req)
            
            const passwordHash = await encrypt(req.password)
            const body = {...req, password: passwordHash}
            const response = await User.create(body)

            response.set("password", undefined, {strict: false})

            const data = {
                token: await tokenSign(response),
                user: response
            }

            // res.send({data})
            res.status(201).send({ data });

    } catch (error) {
        console.error("Error al registrar usuario:", error);

    // Manejar errores de clave única
    if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).send({
            message: "El usuario ya se encuentra registrado con esa identificación.",
            field: error.errors[0].path, // Campo que causó el error
        });
    }
           // Manejar otros errores
            res.status(500).send({
                message: "Ocurrió un error al registrar el usuario.",
                error: error.message,
            });
        }
}



const generateToken = async (req, res) => {
    try {
        const { identificacion, password } = req.body;

        // Buscar usuario únicamente por identificación
        const user = await User.findOne({
            where: { identificacion },
        });

        if (!user) {
            return res.status(401).send({ error: "Credenciales inválidas" });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isPasswordValid = await compare(password, user.password); // compare es una función que usa bcrypt

        if (!isPasswordValid) {
            return res.status(401).send({ error: "Credenciales inválidas" });
        }

        // Generar token JWT válido por 24 horas
        const token = jwt.sign(
            { id: user.identificacion, name: user.name },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h", // Tiempo de expiración
            }
        );

        res.send({ token });
    } catch (error) {
        console.error("Error al generar token:", error.message);
        res.status(500).send({ error: "Error interno del servidor" });
    }
};


export{
    login,
    register,
    generateToken
}