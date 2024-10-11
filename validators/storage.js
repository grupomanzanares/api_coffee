
const validateCreateStorage = (req, res, next) => {
    if (!req.file) {
        return res.status('403').json({
            errors: [{ msg: 'El archivo es requerido', path: 'image', location: 'body' }]
        });
    }
    next(); 
};

export {
    validateCreateStorage
};
