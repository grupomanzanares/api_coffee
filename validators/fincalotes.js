import { body, check, validationResult } from "express-validator";

const validateCreateFincaLote = [
    body('lote').exists().notEmpty(),
    body('ccosto').exists().notEmpty(),
    body('nombre').exists().notEmpty(),
    body('descripcion').exists().notEmpty(),
    body('area').exists().notEmpty(),
    body('plantas').exists().notEmpty(),
    body('usuario').exists().notEmpty(),
    body('usuarioMod').exists().notEmpty(),
    body('finca').exists().notEmpty(),

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

const validateGetFincaLote = [
    check('finca').exists().withMessage('El parámetro finca es requerido').isInt().withMessage('Debe ser un número entero'),
    check('lote').exists().withMessage('El parámetro lote es requerido').notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(403).json({ errors: errors.array() });
        }
        next();
    }
];

export{
    validateCreateFincaLote,
    validateGetFincaLote
}