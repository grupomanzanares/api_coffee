import { body, check, validationResult } from "express-validator";

const validateCreateRecolector = [
    body('nit').exists().notEmpty().isLength({min: 6, max: 10}),
    body('nombre').exists().notEmpty(),
    body('rut').exists().notEmpty(),
    body('banco').exists().notEmpty(),
    body('tipoContrato').exists().notEmpty(),
    body('tipoIdentificacion').exists().notEmpty(),


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