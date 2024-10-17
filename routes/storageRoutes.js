import express from 'express';
import uploadFile from '../middleware/upload.js';
import { validateCreateStorage } from '../validators/storage.js'
import { createStorage } from '../controllers/storageControler.js'

const router = express.Router();

router.post('/', 
    uploadFile.single('image'), 
    validateCreateStorage,
    createStorage)

export default router;
