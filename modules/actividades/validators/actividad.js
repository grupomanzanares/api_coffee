import { body, check, validationResult } from "express-validator";

const validateCreateActividad = [
    body('nombre')
        .exists().withMessage('El nombre es obligatorio')
        .notEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 5, max: 100 }).withMessage('El nombre debe tener entre 5 y 100 caracteres'),
    body('descripcion')
        .exists().withMessage('La descripción es obligatoria')
        .notEmpty().withMessage('La descripción no puede estar vacía')
        .isLength({ max: 150 }).withMessage('La descripción no puede superar los 150 caracteres'),
    body('controlPorLote')
        .exists().withMessage('Control por lote'),
    body('usuario')
        .optional()
        .isString().withMessage('El usuario debe ser una cadena de texto'),
    body('usuarioMod')
        .optional()
        .isString().withMessage('El usuarioMod debe ser una cadena de texto'),
    body('unidadId')
        .exists().withMessage('El unidadId es obligatorio')
        .isInt().withMessage('El unidadId debe ser un número entero válido'),
    body('subCategoriaId')
        .exists().withMessage('El subCategoriaId es obligatorio')
        .isInt().withMessage('El subCategoriaId debe ser un número entero válido'),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(403).json({ errors: errors.array() });
        }
        next();
    }
];


const validateGeActividad = [
    check('id').exists().notEmpty(),

    (req, res, next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status('403')
            res.send({errors : error.array()}) 
        } 
    }
]

export {
    validateCreateActividad,
    validateGeActividad
};
