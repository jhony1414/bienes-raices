import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/tokens.js'
import { emailRegistro }  from '../helpers/emails.js'
import e from 'express'

const formularioLogin = ( req, res )=>{
    res.render( 'auth/login', { pagina: 'Iniciar Sesion' })
}

const formularioRegistro = ( req, res )=>{


    res.render( 'auth/registro', { pagina: 'Crear cuenta' })
}

const formularioOlvidePassword = ( req, res )=>{


    res.render( 'auth/olvide-password', { pagina: 'Recuperar Password' })
}

const registrarUsuario = async ( req, res ) => {
    
    //Validaciones
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run( req )
    await check('email').isEmail().withMessage('El email no es correcto').run( req )
    await check('password').isLength( { min: 6 } ).withMessage('El password debe tener minimo 6 caracteres').run( req )
    await check('repetir_password').not().equals('password').withMessage('Los passwords no coinciden').run( req )
    
    let resultado = validationResult( req )

    // Verificar que el resultado este vacio
    if ( !resultado.isEmpty() ){
        return res.render( 'auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
                
            }
        } )
    }
    const { nombre, email, password } = req.body
    // Verificar que el usuario no esta registrado
    const existeUsuario = await Usuario.findOne({where:{ email }})

    if (existeUsuario) {
        return res.render( 'auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [ { msg: 'El usuario ya esta registrado' } ],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
                
            }
        } )

    }

    // Creamos el usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })
    //Envia email de confrimacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    //Mostrar mensaje de confrimacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un mensaje de confirmacion, presiona en el enlace'

    })
    
}


export {

    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword, 
    registrarUsuario
}