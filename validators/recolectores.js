import { body, check, validationResult } from "express-validator";

const validateCreateRecolector = [
    body('nit').exists().notEmpty().isLength({min: 6, max: 10}),
    body('nombre').exists().notEmpty(),
    body('nombre1').exists().notEmpty(),
    body('nombre2').exists().notEmpty(),
    body('apellido1').exists().notEmpty(),
    body('apellido2').exists().notEmpty(),
    body('rut').exists().notEmpty(),
    body('observacion').exists().notEmpty(),
    body('cuentaBancaria').exists().notEmpty().isLength({min: 8, max:10}),
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

const validateGetRecolector = [
    check('nit').exists().notEmpty(),

    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403)
            res.send({errors : error.array()})
        }
    }
]

export{
    validateCreateRecolector,
    validateGetRecolector
}