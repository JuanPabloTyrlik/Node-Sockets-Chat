const crearMensaje = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().toLocaleString()
    };
};

module.exports = {
    crearMensaje
};