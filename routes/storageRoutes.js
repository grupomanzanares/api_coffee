import express from 'express';
import uploadFile from '../middleware/upload.js';
import { validateCreateStorage,validateGetStorage } from '../validators/storage.js'
import { createStorage,deleteStorage, updateStorage } from '../controllers/storageControler.js'
import { apiAuth } from '../auth/middleware/apiauth.js';

const router = express.Router();

/** Cargue de un solo archivo */
router.post('/', 
    validateCreateStorage,      //validar  
    uploadFile.single('image'), //Subir un archivo a carpeta storage,
    apiAuth,                    // Solo si esta Autorizado
    createStorage)  //Guardar

router.put('/:id', validateCreateStorage, validateGetStorage, apiAuth, updateStorage)   //actualizar

/** borrar del storage */
router.delete('/:id', validateGetStorage, apiAuth, deleteStorage)

export default router;
