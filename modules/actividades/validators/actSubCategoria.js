import { body, check, validationResult } from "express-validator";

const validateCreateActSubCategoria = [
    body('categoriaId').exists().notEmpty(),
    body('nombre').exists().notEmpty().isLength({min: 5, max: 30}),
    body('descripcion').exists().notEmpty().isLength({min: 0, max: 150}),
    body('usuario').optional().isString().withMessage('El usuario debe ser una cadena de texto'),
    body('usuarioMod').optional().isString().withMessage('El usuarioMod debe ser una cadena de texto'),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            res.status(403).send({ errors: error.array() });
        }
    }
];

const validateGetActSubCategoria = [
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
    validateCreateActSubCategoria,
    validateGetActSubCategoria
};
