import { body, check, validationResult } from "express-validator";

const validateCreateBanco = [
    body('codigo').exists().notEmpty().isLength({min: 3, max: 10}),
    body('nombre').exists().notEmpty(),
    body('descripcion').exists().notEmpty(),
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

const validateGetBanco = [
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
    validateCreateBanco,
    validateGetBanco
}