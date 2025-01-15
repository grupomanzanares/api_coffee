import express from 'express';
import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createSucursalUsuario, deleteSucursalUsuario, getSucursalUsuario, getSucursalUsuarios, updateSucursalUsuario } from '../controllers/sucursalUsuarioController.js';


const router = express.Router();

router.get('/', apiAuth, getSucursalUsuarios)
router.get('/:id', apiAuth,   getSucursalUsuario)
router.post('/create', apiAuth,  createSucursalUsuario)
router.put('/:id', apiAuth,  updateSucursalUsuario)
router.delete('/delete/:id',  apiAuth, deleteSucursalUsuario)


export default router
