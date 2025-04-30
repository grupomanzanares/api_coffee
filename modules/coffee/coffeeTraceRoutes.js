import express from 'express';

import { createCoffeTrace, getCoffeTrace } from './coffeeTraceController.js';
import { validateCreateCofeeTrace } from './coffeeTraceValidator.js';
import { apiAuth } from '../../auth/middleware/apiauth.js';

const router = express.Router();

router.get('/', apiAuth, getCoffeTrace)
router.post('/create', apiAuth, validateCreateCofeeTrace, createCoffeTrace)




export default router
