import { body, check, validationResult } from "express-validator";

const validateCreateUser = [
    body('identificacion').exists().notEmpty().isLength({min: 5, max:12}),
    body('name').exists().notEmpty().isLength({min: 5, max: 100}),
    body('email').exists().notEmpty().isEmail(),
    body('celphone').exists().notEmpty(),

    // y el rol?
    // y si el usuario quiere cambiar el password

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


const validateUpdateUser = [
    body('rolId').exists().notEmpty(),
    body('name').exists().notEmpty().isLength({min: 5, max: 100}),
    body('email').exists().notEmpty().isEmail(),
    body('celphone').exists().notEmpty(),

    // y el rol?
    // y si el usuario quiere cambiar el password

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




const validateGetUser = [
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
    validateCreateUser,
    validateUpdateUser,
    validateGetUser
};
