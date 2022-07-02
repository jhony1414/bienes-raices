
import express from 'express'
const router = express.Router()
import { formularioLogin, formularioOlvidePassword, formularioRegistro, registrarUsuario } from '../controllers/usuarioController.js'

router.get('/login', formularioLogin)
router.get('/registro', formularioRegistro)
router.post('/registro', registrarUsuario)
router.get('/olvide-password', formularioOlvidePassword)
    
    





export default router