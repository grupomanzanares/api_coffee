import { body, check, validationResult } from "express-validator";

const validateCreateActSubCategoria = [
    body('nombre').exists().notEmpty().isLength({min: 5, max: 30}),
    body('descripcion').exists().notEmpty().isLength({min: 0, max: 150}),
    (req, res, next) =>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status('403')
            res.send({errors : error.array()}) 
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
