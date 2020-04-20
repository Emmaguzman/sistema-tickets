const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const tiketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTiket', (data, callback) => {
        let siguiente = tiketControl.siguienteTiket();
        //console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: tiketControl.getUltimoTicket(),
        ultimosCuatro: tiketControl.getUltimosCuatro()
    });



    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Escritorio necesario'
            });
        }
        let atenderTicket = tiketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimosCuatro: tiketControl.getUltimosCuatro()
        });
    });

});