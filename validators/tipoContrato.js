import { body, check, validationResult } from "express-validator";


const validateCreateTipoContrato = [
    body('codigo').exists().notEmpty(),
    body('nombre').exists().notEmpty(),
    body('descripcion').exists().notEmpty(),
    body('usuario').exists().notEmpty(),
    body('usuarioMod').exists().notEmpty(),

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

const validateGetTipoContrato = [
    check('id').exists().notEmpty(),

    (req, res, next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch{
            res.status('403')
            res.send({errors: error.array()})
        }
    }
]

export {
    validateCreateTipoContrato,
    validateGetTipoContrato
}