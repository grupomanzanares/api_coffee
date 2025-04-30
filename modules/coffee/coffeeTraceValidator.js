import { body, check, validationResult } from "express-validator";

const validateCreateCofeeTrace = [
    
    body('batche').optional().isString().isLength({ max: 20 }).withMessage('Lote debe ser un texto de máximo 20 caracteres'),
    body('cosecha').optional().isString().isLength({ max: 10 }).withMessage('Cosecha debe ser un texto de máximo 10 caracteres'),
    body('finca').optional().isInt().withMessage('Finca debe ser un número entero'),
    body('nFinca').optional().isString().isLength({ max: 30 }).withMessage('nFinca debe ser un texto de máximo 30 caracteres'),
    body('op').optional().isString().isLength({ max: 10 }).withMessage('OP debe ser un texto de máximo 10 caracteres'),
    body('producto').optional().isString().isLength({ max: 15 }).withMessage('Producto debe ser un texto de máximo 15 caracteres'),
    body('nproducto').optional().isString().isLength({ max: 20 }).withMessage('nProducto debe ser un texto de máximo 20 caracteres'),
    body('variedad').optional().isInt().withMessage('Variedad debe ser un número entero'),
    body('nvariedad').optional().isString().isLength({ max: 20 }).withMessage('nVariedad debe ser un texto de máximo 20 caracteres'),
    body('fecha').optional().isISO8601().toDate().withMessage('Fecha debe ser una fecha válida'),
    body('remision').optional().isString().isLength({ max: 10 }).withMessage('Remision debe ser un texto de máximo 10 caracteres'),
    body('destino').optional().isString().isLength({ max: 15 }).withMessage('Destino debe ser un texto de máximo 15 caracteres'),
    body('ndestino').optional().isString().isLength({ max: 30 }).withMessage('nDestino debe ser un texto de máximo 30 caracteres'),
    body('bultos_entrada').optional().isDecimal({ decimal_digits: '0,2' }).withMessage('Bultos_Entrada debe ser un número decimal de máximo 2 decimales'),
    body('kilos_entrada').optional().isDecimal({ decimal_digits: '0,2' }).withMessage('Kilos_Entrada debe ser un número decimal de máximo 2 decimales'),
    body('entrada').optional().isString().isLength({ max: 10 }).withMessage('Entrada debe ser un texto de máximo 10 caracteres'),
    body('bultos_venta').optional().isDecimal({ decimal_digits: '0,2' }).withMessage('Bultos_Venta debe ser un número decimal de máximo 2 decimales'),
    body('kilos_venta').optional().isDecimal({ decimal_digits: '0,2' }).withMessage('Kilos_Venta debe ser un número decimal de máximo 2 decimales'),
    body('bultos_saldo').optional().isDecimal({ decimal_digits: '0,2' }).withMessage('Bultos_Saldo debe ser un número decimal de máximo 2 decimales'),
    body('kilos_saldo').optional().isDecimal({ decimal_digits: '0,2' }).withMessage('Kilos_Saldo debe ser un número decimal de máximo 2 decimales'),



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

const validateGetCofeeTrace = [
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
    validateCreateCofeeTrace , 
    validateGetCofeeTrace
};
