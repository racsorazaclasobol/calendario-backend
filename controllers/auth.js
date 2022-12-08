const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async(req, res = response) => {
    // Manejo de errores 
    // const errors = validationResult( req ); ===>> se cambió al custom middleware 'validar-campos'

    // if( !errors.isEmpty() ){
    //     return res.status(400).json({ 
    //         ok: false,
    //         error: errors.mapped()
    //     });
    // }

    try {
        const { email, password } = req.body;

        let usuario = await Usuario.findOne({ email })
        
        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe.'
            })
        }

        usuario = new Usuario( req.body );

        //* Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
        //* Guardar usuario
        await usuario.save();

        //* Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );
        
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Por favor intentelo más tarde.'
        })
    }
} 

const loginUsuario = async(req, res = response) => {

    try {

        const { email, password } = req.body;

        let usuario = await Usuario.findOne({ email })
        
        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario y/o constraseña no existen.'
            })
        }

        //* Confirmar los password
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            res.status(400).json({
                ok:false,
                msg: 'Password incorrecto.'
            });  
        }

        //* Generar nuestro JWT (JSON Web Token)
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Por favor intentelo más tarde.'
        })
    }

} 

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    //* Generar un nuevo token
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        msg: 'Renew',
        uid, name, token,
    })
} 


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};