let urlserver =  "http://192.168.0.6:5000";
var socket = require('socket.io-client')(urlserver);
var five = require("johnny-five");
var Raspi = require("raspi-io").RaspiIO;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
let token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Imdvb2dsZSI6ZmFsc2UsInJvbGUiOiJBRE1JTl9ST0xFIiwiX2lkIjoiNWQ4MmZjOTY1MDAxNTkxNjUwOGYxNDUyIiwibmFtZSI6IkZlbGlwZSIsImxhc3RuYW1lIjoiUmFtaXJleiIsImVtYWlsIjoiZmVsZGplc3VzQGdtYWlsLmNvbSIsIl9fdiI6MH0sImlhdCI6MTU2ODk0MTIxMCwiZXhwIjoxNTY5MTE0MDEwfQ.iRM_XM-9V_tXVAw4Z7gMGuCjDvoLHqU13vpUAb3nR2I";
let id1 = "5d841b8cb5c0d42d943dfb26"
let id2 = "5d841bcfb5c0d42d943dfb27"
let id3 = "5d841be2b5c0d42d943dfb28"
let id_sensor = ""
let iduser = "5d82fc9650015916508f1452"

var board = new five.Board({
    //INICIAR PLACA RASPERRY
    io: new Raspi()
});
var led1, led2, led3, bandera = false;

let leds;


socket.on('connect', function(socket) {
    console.log("Conectado al servidor Socket");

});

board.on("ready", function() {
    led1 = new five.Led('P1-11');
    led2 = new five.Led('P1-7');

    //LEE EL SENSOR
    socket.on('visualizar-sensor', function(data) {
        // console.log("SENSOR", data);

    });
    get(urlserver +'/elementos/listar/luz/'+iduser, (err, data) => {
    leds = data.element;
    // console.log(leds);
    leds.forEach(element => {
        socket.emit('ver-luz', {
            id_luz: element._id
        }, (data) => {


        });
    });



})




setInterval(() => {
    socket.on('visualizar-luz', function(data) {
        console.log(data);
                if (data._id == id1) {
                    cambiarLED(led1, !data.estado, 'LED1')
                }
                if (data._id == id2) {
                    cambiarLED(led2, !data.estado, 'LED2')
                }
                if (data._id == id3) {
                    cambiarLED(led3, !data.estado, 'LED3')
                }
        // leds.forEach((element, index) => {

        //     if (element._id == data._id) {
        //         leds[index].estado = element.estado;
        //         //console.log(leds[index]);
        //         if (data._id == '5cda3b9310f47d10b73e3983') {
        //             cambiarLED(led1, element.estado, 'LED1')
        //         }
        //         if (data._id == '5cddff862f4994190b164f56') {
        //             cambiarLED(led2, element.estado, 'LED2')
        //         }
        //         if (data._id == '5cddff8b2f4994190b164f57') {
        //             cambiarLED(led3, element.estado, 'LED3')
        //         }
        //     }
        // });
    });
    socket.emit('configurar-sensor', {
        id_sensor: id_sensor,
        nombre_sensor: "Cuarto 1",
        metrica_sensor: Math.random() * (35 - 20) + 20
    }, (data) => {
        //console.log(data);
    });

}, 2000)

});

function get(URL, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        const DONE = 4
        const Ok = 200
        if (this.readyState === DONE) {
            if (this.status === Ok) {
                callback(null, JSON.parse(this.responseText))
                    //OK
            } else {
                callback((`Error al realizar peticion: ${this.status}`))
                    //error
            }
        }
    }
    xhr.open('GET', URL)
    xhr.setRequestHeader('token', token)

    xhr.send(null)
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

// socket.on('disconnect', function() {});x