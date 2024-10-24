import { body, check, validationResult } from "express-validator";

const validateCreateCosecha = [
    body('codigo').exists().notEmpty().isLength({min: 3, max: 10}),
    body('nombre').exists().notEmpty(),
    body('descripcion').exists().notEmpty(),
    body('usuario').exists().notEmpty(),
    body('usuarioMod').exists().notEmpty(),

    (req, res, next) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next()
    }
];

const validateGetCosecha = [
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
    validateCreateCosecha,
    validateGetCosecha
}