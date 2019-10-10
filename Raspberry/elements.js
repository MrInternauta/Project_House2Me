var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
    //INICIAR PLACA RASPERRY
    io: new Raspi()
});
let led1, led2, led3, btn;
iniciarBoard();

var iniciarBoard = function() {
    board.on("ready", function() {
        iniciarCompElect();

        escucharLED();
    });
};


var iniciarCompElect = function() {
    led1 = new five.Led(2);
    led2 = new five.Led(3);
    led3 = new five.Led(4);
    btn = new five.Button(7); //Boton para desactivar alarma sismca

};

var escucharLED = function() {
    bdRefLed1_E.on('value', function(snapshot) {
        cambiarLED(led1, snapshot.val(), 'led1');
    });
    bdRefLed2_E.on('value', function(snapshot) {
        cambiarLED(led2, snapshot.val(), 'led2');
    });
    bdRefLed3_E.on('value', function(snapshot) {
        cambiarLED(led3, snapshot.val(), 'led3');
    });
};

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