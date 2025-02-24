import express from 'express';
import { createTrabajador, deleteTrabajador, getTrabajador, getTrabajadores, updateTrabajador } from '../controllers/trabajadorController.js';
import { validateCreateTrabajador, validateGetTrabajador } from '../validators/trabajadores.js';

const router = express.Router()

router.get('/', getTrabajadores)
router.get('/:id', validateGetTrabajador, getTrabajador)
router.post('/create',  validateCreateTrabajador, createTrabajador)
router.put('/:id', updateTrabajador)
router.delete('/delete/:id', deleteTrabajador)

export default router