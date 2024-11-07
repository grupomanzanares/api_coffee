import { body, check, validationResult } from "express-validator";

const validateCreateRecoleccion = [
    body('prefijo').exists().notEmpty(),
    body('id').exists().notEmpty(),
    body('fecha').exists().notEmpty().isDate({ format: 'YYYY-MM-DD' }),
    body('jornal').exists().notEmpty(),
    body('kg').exists().notEmpty(),
    body('precio').exists().notEmpty(),
    body('total').exists().notEmpty(),
    body('maquina').exists().notEmpty(),

    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403).send({ errors: error.array() });
        }
    }
];

const validateGetRecoleccion = [
    check('prefijo').exists().withMessage('El parametro Prefijo es requerido').notEmpty(),
    check('movid').exists().withMessage('El parametro movid es requerido').notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.notEmpty()) {
            return res.status(403).json({ errors: errors.array() });
        }
        next();
    }
];

export{
    validateCreateRecoleccion,
    validateGetRecoleccion
}