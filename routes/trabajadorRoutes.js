import express from 'express';
import { createTrabajador, deleteTrabajador, getTrabajador, getTrabajadores, updateTrabajador } from '../controllers/trabajadorController.js';
import { validateCreateTrabajador, validateGetTrabajador } from '../validators/trabajadores.js';

const router = express.Router()

router.get('/', getTrabajadores)
router.get('/:nit', validateGetTrabajador, getTrabajador)
router.post('/create',  validateCreateTrabajador, createTrabajador)
router.put('/update/:nit', updateTrabajador)
router.delete('/delete/:nit', deleteTrabajador)

export default router