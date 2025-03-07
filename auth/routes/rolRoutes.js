import express from "express"

import { apiAuth } from '../middleware/apiauth.js'
import { deleteRol, getRol, getRoles } from "../controllers/rolController.js";

const router = express.Router()

router.get('/', apiAuth, getRoles)
router.get('/:id', apiAuth,getRol)
// router.post('/create', validateCreateUser, apiAuth, createUser)
// router.put('/:id', validateCreateUser, validateGetUser,apiAuth, updateUser)
router.delete('/delete/:id', apiAuth, deleteRol)

export default router
