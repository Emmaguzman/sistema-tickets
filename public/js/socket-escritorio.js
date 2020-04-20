var socket = io();

var searchParams = new URLSearchParams(window.location.search);
//console.log(searchParams.has('escritorio')); // viene escritorio en el URL?

if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("El escritorio es necesario");
}

var label = $("small");
var escritorio = searchParams.get("escritorio");

console.log(escritorio);
$("h1").text("Escritorio" + escritorio);

$("button").on("click", function() {
    socket.emit("atenderTicket", { escritorio: escritorio }, function(resp) {
        if (resp === "no hay ticket!") {
            label.text(resp);
            console.log(resp);
            return;
        }
        label.text('Ticket' + resp.numero)
    });
});