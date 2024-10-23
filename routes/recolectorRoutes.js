import express from 'express';
import { getRecolector } from '../controllers/recolectorController.js';

const router = express.Router()

router.get('/', getRecolector)

export default router