var socket = io();

var lblticket1 = $("#lblTicket1");
var lblticket2 = $("#lblTicket2");
var lblticket3 = $("#lblTicket3");
var lblticket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [lblticket1, lblticket2, lblticket3, lblticket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on("estadoActual", function(data) {
    actualizaHTML(data.ultimosCuatro);
});

socket.on('ultimos4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimosCuatro);
});

function actualizaHTML(ultimosCuatro) {
    for (var i = 0; i <= ultimosCuatro.length - 1; i++) {
        lblTickets[i].text("Ticket" + ultimosCuatro[i].numero);
        lblEscritorios[i].text("Escritorio" + ultimosCuatro[i].escritorio);
    }
}