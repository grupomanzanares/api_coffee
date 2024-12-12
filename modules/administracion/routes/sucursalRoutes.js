import express from 'express';
import { getSucursal, getSucursales, createSucursal, deleteSucursal, updateSucursal } from '../controllers/sucursalController.js';
import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateSucursal, validateGetSucursal } from '../validators/sucursal.js';


const router = express.Router();

router.get('/', apiAuth, getSucursales)
router.get('/:id', apiAuth, validateGetSucursal,  getSucursal)
router.post('/create', apiAuth, validateCreateSucursal, createSucursal)
router.put('/:id', apiAuth,validateGetSucursal,  updateSucursal)
router.delete('/delete/:id',  apiAuth, deleteSucursal)


export default router
