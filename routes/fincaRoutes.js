import express from 'express';
import { getFinca } from '../controllers/fincaController.js';

const router = express.Router()

router.get('/', getFinca)

export default router