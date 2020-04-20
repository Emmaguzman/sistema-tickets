//establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');
//conectar al servidor
socket.on('connect', function() {
    console.log('conectado al servidor');
});

//desconectar del servidor
socket.on('disconnect', function() {
    console.log('desconectado del servidor');
});

socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTiket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});