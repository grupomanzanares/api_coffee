import { body, check, validationResult } from "express-validator";

const validateCreateTrabajador = [
    body('nit').exists().notEmpty().isLength({min: 6, max: 10}),
    body('nombre').exists().notEmpty(),
    body('tipoIdentificacion').exists().notEmpty(),


    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403).send({ errors: error.array() });
        }
    }
];

const validateGetTrabajador = [
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
    validateCreateTrabajador,
    validateGetTrabajador
}