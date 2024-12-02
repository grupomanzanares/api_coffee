
import {body, validationResult, check} from 'express-validator'

const validateCreateStorage = [
    body('file')
        .exists()
        .notEmpty(),
        (req, res, next) =>{
            try{
                validationResult(req).throw()   //.throw() llamar al error
                return next()
            }catch(err){
                res.status(403)
                res.send({errors : err.array()})
            }
        }
];


/*** esto hay que ajustarlo a mysql */

const validateGetStorage = [
    check('id').exists().notEmpty().isMongoId(),
    (req, res, next) => {
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            console.log(err.array())
            res.status('403')
            res.send({errors : err.array()})
        }
    }
];

export {
    validateCreateStorage,
    validateGetStorage
} 
