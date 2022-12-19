const { response } = require('express');
const Evento = require('../models/Evento')

const obtenerEventos = async ( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user', 'name');

    return res.status(200).json({
        ok: true,
        msg: 'Obtener Eventos',
        eventos
    })
}

const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body );
    const { uid, name } = req;

    try {

        evento.user = uid;

        const eventoGuardado = await evento.save();

        res.json({ 
            ok: true,
            evento: eventoGuardado,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, intentelo más tarde.'
        })
    }
}

const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe.'
            })
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( evento.id, nuevoEvento, { new: true } ); //El new: true, es para que la respuesta de esta linea sea la actualizacion, y no los valores anteriores como lo devolvería si se dejara por defecto

        res.json({
            ok: true,
            evento: eventoActualizado
        })
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, intentelo más tarde.'
        });        
    }
}

const eliminarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );
        
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }
        
        if( evento.user.toString() !== uid ){
            return res.status(401).json({ 
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento.'
            })
        }

        const eventoEliminado = await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true,
            msg: 'El Evento se ha eliminado correctamente',
            eventoEliminado,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, intentelo más tarde.'
        });             
    }

}

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}