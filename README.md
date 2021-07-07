# HOUSE2ME
Mediante NodeJs  cargale a tu arduino o Rasperry un programa para que puedas controlar tu casa con javascript
JOHNNY-FIVE: http://johnny-five.io/

RASPERRY PI ZERO http://johnny-five.io/platform-support/#raspberry-pi-zero configuracion
1. Cargarle el sistema a Raspberry Raspbian, de preferencia configurar con Pi Bakery  https://github.com/nebrius/raspi-io/wiki/Getting-a-Raspberry-Pi-ready-for-NodeBots
::::Desde Raspberry:::Configurar SSH https://www.raspberrypi.org/magpi/ssh-remote-control-raspberry-pi/
2. Instalar sudo en terminar: apt-get install  sudo
3. Instalacion de otras dependencias sudo apt-get install git wiringpi
4. Instalar NodeJS: https://github.com/sdesalas/node-pi-zero, https://unsimpleinformatico.wordpress.com/2016/11/15/como-ejecutar-archivos-bin-sh-y-run-en-gnulinux/
    sudo wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v8.5.0.sh | bash
    sudo sh install-node-v8.5.0.sh
5. Iniciar proyecto y configurar proyecto: npm init
6. Instalar Johnny Five: sudo npm install johnny-five
7. Instalar serial Port y complementos Globalmente: https://timodenk.com/blog/install-node-serialport-on-raspberry-pi/
    sudo npm install -g nodo-gyp
    sudo npm install -g nodo-pre-gyp
    sudo npm instalar serialport --unsafe-perm
8. Instalar Raspi-io Una API para utilizar Johnny Five con Rasperry PI: sudo npm install raspi-io

:::::LISTO PARA UTILIZAR CON RASPERRY PI:::
EJEMPLO DE PROYECTO CON LED http://johnny-five.io/examples/raspi-io/



ARDUINO X

1. Instalar NodeJS
2. Iniciar proyecto y configurar proyecto: npm init
3. Instalar Johnny Five: sudo npm install johnny-five
4. Instalar Firmata: sudo npm install firmata
5. Instalar software ARDUINO
6. Instalar Firmware a arduino https://github.com/firmata/arduino/blob/master/examples/StandardFirmataPlus/StandardFirmataPlus.ino
:::::LISTO PARA UTILIZAR CON Arduino::: //Mas informacion: https://github.com/rwaldron/johnny-five/wiki/Getting-Started#trouble-shooting

EJEMPLO DE PROYECTO CON LED:  //Guardar en index.js
var five = require("johnny-five");
var board = new five.Board();
board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(500);
});
//Hacer npm index para ejecutar
