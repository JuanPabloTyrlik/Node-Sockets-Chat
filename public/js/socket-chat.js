var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

// Escuchar eventos
socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        // console.log(resp);
        renderizarUsuarios(resp);
    });
});
socket.on('disconnect', function() {
    console.log('Perdimos la conexión con el servidor')
});
socket.on('crearMensaje', function(resp) {
    // console.log('Servidor:', resp);
    renderizarMensajes(resp, false);
    scrollBottom();
});
socket.on('listaPersonas', function(resp) {
    // console.log('Usuarios conectados', resp);
    renderizarUsuarios(resp);
});
socket.on('mensajePrivado', function(resp) {
    console.log('Mensaje Privado', resp);
});
socket.on('alerta', function(resp) {
    renderizarAlerta(resp);
});