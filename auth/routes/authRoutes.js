import express, { response } from "express"
import { validateLogin, validateRegister } from "../validators/auth.js"
import { login, register,generateToken } from "../controllers/autController.js"


const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login',  validateLogin,  login)
router.post('/generate-token', generateToken);

export default router