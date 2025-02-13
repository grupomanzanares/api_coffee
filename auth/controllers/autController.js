import { matchedData } from "express-validator"

import User from "../models/User.js"
import { handleHttpError } from "../../helpers/httperror.js"
import jwt from 'jsonwebtoken'; // Importa jsonwebtoken
import { encrypt, compare } from "../helpers/password.js"
import { tokenSign } from "../../helpers/jwt.js"
import { emailRecoverPassword } from "../../helpers/emails.js";


const login = async (req, res) => {
    try {
        // Validar y sanitizar los datos de entrada
        req = matchedData(req);

        // Buscar al usuario por identificación
        const user = await User.findOne({ where: { identificacion: req.identificacion } });

        if (!user) {
            // Mensaje genérico para evitar filtrado de información
            return handleHttpError(res, 'Credenciales inválidas');
        }

        // Comparar la contraseña
        const hashPassword = user.password;
        const isPasswordValid = await compare(req.password, hashPassword);

        if (!isPasswordValid) {
            return handleHttpError(res, 'Credenciales inválidas');
        }

        // Eliminar la contraseña del objeto de usuario antes de enviar
        user.set("password", undefined, { strict: false });

        // Generar token JWT
        const token = await tokenSign(user);

        // Preparar los datos de respuesta
        const data = {
            token,
            user
        };

        // Enviar respuesta
        res.send(data);
    } catch (error) {
        console.error("Error en login:", error);
        handleHttpError(res, 'Error de login');
    }
};


const register = async (req, res) => {

    try {

        req = matchedData(req)

        const passwordHash = await encrypt(req.password)
        const body = { ...req, password: passwordHash }
        const response = await User.create(body)

        response.set("password", undefined, { strict: false })

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


const recoverPassword = async(req, res) => {

    console.log(req);
    //extraer datos o desestructurar 
    const {cedula,name, email,   password } = req.body;

        //Validar
        await check("cedula").notEmpty().withMessage("La cédula es obligatoria").run(req);
        await check('email').isEmail().withMessage('No cumple con las características de un correo ').run(req)
        let result = validationResult(req)
    
        //verificar que no hay errores
        if(!result.isEmpty()){
            return res.status(400).json({ errors: result.array() });
        }

        //Si el formato del correo es correo Validar que exista en la base de datos
        const user = await User.findOne({ where: {cedula, email }})

        if(!user){
            return res.status(404).json({ message: "No se encontró un usuario con estos datos" });
        }

        //Generar Nuevo token y enviar correo
        user.token= generatorId();
        await user.save();
    
        //Enviar email de confirmación
        emailRecoverPassword({
            name: user.name,
            email: user.email,
            token: user.token
        });

        return res.json({ message: "Hemos enviado un correo con las instrucciones para recuperar la contraseña" });

}

const recoverTokenConfirm = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({ where: { token } });

    if (!user) {
        return res.status(400).json({ message: "Token inválido o expirado" });
    }

    return res.json({ message: "Token válido", token });
};

const recover = async (req, res) => {
    const { password, token } = req.body;

    await check("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres").run(req);

    let result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.token = null;
    await user.save();

    return res.json({ message: "Contraseña actualizada correctamente" });
};

/** Olvido de Contraseña */

export {
    login,
    register,
    generateToken,
    recoverPassword,recoverTokenConfirm, recover
}