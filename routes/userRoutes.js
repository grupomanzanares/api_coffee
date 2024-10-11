import express from "express"
import { validateCreateUser, validateGetUser } from '../validators/user.js'
import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/userControler.js";
import { apiAuth } from '../middleware/apiauth.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', 
    validateGetUser,
    getUser)
router.post('/create', 
    validateCreateUser,
    apiAuth,
    createUser)
router.put('/:id',
    validateCreateUser,
    validateGetUser,
    updateUser)
router.delete('/delete/:id', deleteUser)

export default router