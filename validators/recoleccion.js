import { body, check, validationResult } from "express-validator";

const validateCreateRecoleccion = [
    body('prefijo').exists().isEmpty(),
    body('id').exists().isEmpty(),
    body('fecha').exists().isEmpty(),
    body('jornal').exists().isEmpty(),
    body('kg').exists().isEmpty(),
    body('precio').exists().isEmpty(),
    body('total').exists().isEmpty(),

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
        if (!errors.isEmpty()) {
            return res.status(403).json({ errors: errors.array() });
        }
        next();
    }
];

export{
    validateCreateRecoleccion,
    validateGetRecoleccion
}