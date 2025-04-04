import { body, check, validationResult } from "express-validator";

const validateCreateProgramacion = [
    body('fecha')
        .exists().withMessage('La fecha es obligatoria'),
    body('lote')
        .optional()
        .isString().withMessage('El lote debe ser una cadena de texto')
        .isLength({ max: 50 }).withMessage('El lote no puede exceder los 3 caracteres'),
    body('trabajador')
        .optional(),
    body('jornal')
        .optional()
        .isNumeric().withMessage('El jornal debe ser un número válido')
        .custom(value => value >= 0).withMessage('El jornal no puede ser negativo'),
    body('cantidad')
        .exists().withMessage('La cantidad es obligatoria')
        .isNumeric().withMessage('La cantidad debe ser un número válido')
        .custom(value => value > 0).withMessage('La cantidad debe ser mayor a cero'),

    body('sucursalId')
        .exists(),
    body('responsableId')
        .optional()
        .isInt().withMessage('El responsableId debe ser un número entero válido'),
    body('fincaId')
        .optional()
        .isInt().withMessage('El fincaId debe ser un número entero válido'),
    body('actividadId')
        .optional()
        .isInt().withMessage('El actividadId debe ser un número entero válido'),
    body('signo')
        .exists().withMessage('El signo es obligatorio')
        .isInt().withMessage('El signo debe ser valido 1 o -1'),
    
    body('prioridadId')
        .exists().withMessage('El prioridadId es obligatorio')
        .isInt().withMessage('El estadoId debe ser un número entero válido'),
    body('estadoId')
        .exists().withMessage('El estadoId es obligatorio')
        .isInt().withMessage('El estadoId debe ser un número entero válido'),
    
    body('prioridadId')
        .exists().withMessage('El prioridadId es obligatorio')
        .isInt().withMessage('El estadoId debe ser un número entero válido'),

    body('habilitado')
        .optional()
        .isBoolean().withMessage('El campo habilitado debe ser verdadero o falso'),
    body('sincronizado')
        .optional()
        .isBoolean().withMessage('El campo sincronizado debe ser verdadero o falso'),
    body('fecSincronizacion')
        .optional()
        .isISO8601().withMessage('La fecha de sincronización debe estar en formato válido (ISO 8601)'),
    body('observacion')
        .optional()
        .isString().withMessage('La observación debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('La observación no puede exceder los 100 caracteres'),
    body('programacion')
        .optional(),
    body('maquina')
        .optional()
        .isString().withMessage('La máquina debe ser una cadena de texto')
        .isLength({ max: 40 }).withMessage('La máquina no puede exceder los 40 caracteres'),
    body('usuario')
        .optional()
        .isString().withMessage('El usuario debe ser una cadena de texto')
        .isLength({ max: 50 }).withMessage('El usuario no puede exceder los 15 caracteres'),
    body('usuarioMod')
        .optional()
        .isString().withMessage('El usuarioMod debe ser una cadena de texto')
        .isLength({ max: 50 }).withMessage('El usuarioMod no puede exceder los 50 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(403).json({ errors: errors.array() });
        }
        next();
    }
];


const validateGetProgramacion = [
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
    validateCreateProgramacion,
    validateGetProgramacion
};


// hola