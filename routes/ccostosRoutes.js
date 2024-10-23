import express from 'express';
import { getCcosto } from '../controllers/ccostoController.js';


const router = express.Router();

router.get('/', getCcosto)

export default router