const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: { 
        type: String,
        required: true,
    }, 
    notes: { 
        type: String,
    }, 
    start: { 
        type: Date,
        required: true,
    },
    end: { 
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

//Para sobreescribir el como devuelve los datos el modelo,
//En este caso, para cambiar el '_id' por solo 'id' y 
//eliminar el '__v' aplicamos este codigo
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Evento', EventoSchema )