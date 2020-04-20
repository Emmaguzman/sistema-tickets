const fs = require("fs");

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];
        let data = require("../data/data.json");

        if (data.hoy === this.hoy) {
            this.siguienteTiket();
            this.tickets = data.tickets;
            this.ultimo = data.ultimo;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }
    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        console.log("Se reinicio el sistema");
        this.grabarArchivo();
        return `Ticket N°: ${this.ultimo}`;
    }

    siguienteTiket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        // console.log(this.ultimo);
        this.grabarArchivo();
        return `Ticket N°: ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket N°: ${this.ultimo}`;
    }

    getUltimosCuatro() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return "no hay ticket!";
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //elimino la primera posicion del arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimosCuatro.unshift(atenderTicket);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1); //borra el ultimo elemento
        }


        this.grabarArchivo();
        return atenderTicket;
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro,
        };
        let jsonDataString = JSON.stringify(jsonData);
        //console.log(jsonDataString);
        fs.writeFileSync("./server/data/data.json", jsonDataString);
    }
}

module.exports = {
    TicketControl,
};