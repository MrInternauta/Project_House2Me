var socket = require('socket.io-client')('http://localhost:5000');
var five = require("johnny-five");
const Raspi = require('raspi-io');

var board = new five.Board({
    io: new Raspi()
});

var led1, led2, led3;



socket.on('connect', function(socket) {
    console.log("Conectado al servidor Socket");
    iniciarBoard();
});

var iniciarBoard = function() {
    board.on("ready", function() {
        iniciarComponentes();
    });
};
//CONFIGURAR SENSOR
// socket.emit('configurar-sensor', {
//     id_user: "5cac19d6f1b241090c95e538",
//     id_sensor: "5cda344850da600ea817a9b3",
//     nombre_sensor: "Cuarto 1",
//     metrica_sensor: 30
// }, (data) => {
//     //console.log(data);
// });

let iniciarComponentes = () =>{
    board.on("ready", function() {

        led1 = new five.Led(7);
        led2 = new five.Led(11);
        led3 = new five.Led(12);
    
        // socket.on('visualizar-sensor', function(data) {
        //     console.log("SENSOR", data);
    
        // });
    
        socket.on('visualizar-luz', function(data) {
            console.log("LUZ", data);
            cambiarLED(led1, data.estado, 'LED1')
        });
    
    });
}


var cambiarLED = function(led, value, tag) {
    switch (value) {
        case false:
            led.off();
            console.log(tag, 'OFF');
            break;
        default:
            led.on();
            console.log(tag, 'ON');
            break;
    }
};

