const moment = require('moment'); //Libreria para trabajar con fechas

const isDate = ( value  ) => {

    if ( !value ) {
        return false;
    }

    const fecha = moment( value );

    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isDate
}