import express, { response } from "express"
import { validateLogin, validateRegister } from "../validators/auth.js"
import { login, register,generateToken, recoverPassword , recoverTokenConfirm, recover} from "../controllers/autController.js"


const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login',  validateLogin,  login)
router.post('/generate-token', generateToken);


/*** Rutas olvido de contraseña */

/*** Ruta para solicitar recuperación de contraseña*/
router.post("/forgot-password", recoverPassword);

/***Ruta para validar el token de recuperación*/
router.get("/forgot-password/:token", recoverTokenConfirm);

/***Ruta para restablecer la contraseña con el nuevo password*/
router.post("/reset-password", recover);

export default router