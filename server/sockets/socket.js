const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarChat', (usuario, callback) => {
        if (!usuario.nombre || !usuario.sala) {
            return {
                error: true,
                mensaje: 'Nombre y sala requeridos'
            };
        }
        client.join(usuario.sala);
        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
        client.broadcast.to(usuario.sala).emit('alerta', crearMensaje('Administrador', `${usuario.nombre} se ha conectado.`));
        client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasPorSala(usuario.sala));
        callback(personas);
    });
    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(persona.sala).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje));
        callback(crearMensaje(persona.nombre, data.mensaje));
    });
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
    client.on('disconnect', () => {
        let personaDesconectada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaDesconectada.sala).emit('alerta', crearMensaje('Administrador', `${personaDesconectada.nombre} se ha desconectado.`));
        client.broadcast.to(personaDesconectada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaDesconectada.sala));
    });
});