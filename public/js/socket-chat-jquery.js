var params = new URLSearchParams(window.location.search);

function renderizarUsuarios(personas) {
    var html = '';
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/no-photo.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }
    $('#divUsuarios').html(html);
}

function renderizarMensajes(mensaje, yo) {


    var fecha = new Date(mensaje.fecha);
    var hora = ((fecha.getHours() < 10) ? '0' : '') + fecha.getHours() + ':' + ((fecha.getMinutes() < 10) ? '0' : '') + fecha.getMinutes();

    var html = '';

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-info">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }

    $('#divChatbox').append(html);
}

function renderizarAlerta(mensaje) {
    var html = '';
    var clase = (mensaje.mensaje.indexOf('desconectado') < 0) ? 'success' : 'danger';
    html += '<div class="alert alert-' + clase + '" role="alert">';
    html += mensaje.mensaje;
    html += '</div>';
    $('#divChatbox').append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = $('#divChatbox').children('li:last-child');

    // heights
    var clientHeight = $('#divChatbox').prop('clientHeight');
    var scrollTop = $('#divChatbox').prop('scrollTop');
    var scrollHeight = $('#divChatbox').prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        $('#divChatbox').scrollTop(scrollHeight);
    }
}

// Listeners

$('#divUsuarios').on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

$('#formEnviar').on('submit', function(event) {
    event.preventDefault();
    if ($('#txtMensaje').val().trim().length === 0) {
        return;
    }
    socket.emit('crearMensaje', {
        nombre: params.get('nombre'),
        mensaje: $('#txtMensaje').val()
    }, function(mensaje) {
        $('#txtMensaje').val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });
});