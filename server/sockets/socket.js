const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarChat', (usuario, callback) => {
        if (!usuario.nombre) {
            return {
                error: true,
                mensaje: 'Nombre requerido'
            };
        }
        let personas = usuarios.agregarPersona(client.id, usuario.nombre);
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        callback(personas);
    });
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje));
    });
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
    client.on('disconnect', () => {
        let personaDesconectada = usuarios.borrarPersona(client.id);
        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaDesconectada.nombre} se ha desconectado.`));
        client.broadcast.emit('listaPersonas', usuarios.getPersonas());
    });
});