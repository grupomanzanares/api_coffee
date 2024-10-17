import express, { response } from "express"
import { validateLogin, validateRegister } from "../validators/auth.js"
import { login, register } from "../controllers/autController.js"

const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)

export default router