import { body, check, validationResult } from "express-validator";

const validateCreateFinca = [
    body('nombre').exists().notEmpty(),
    body('descripcion').exists().notEmpty(),
    body('sigla').exists().notEmpty(),
    body('ccosto').exists().notEmpty(),
    body('municipio').exists().notEmpty(),
    body('usuario').exists().notEmpty(),
    body('usuarioMod').exists().notEmpty(),

    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403)
            res.send({errors: error.array()})
        }
    }
];

const validateGetFinca = [
    check('id').exists().notEmpty(),

    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403)
            res.send({errors: error.array()})
        }
    }
];

export{
    validateCreateFinca,
    validateGetFinca
}