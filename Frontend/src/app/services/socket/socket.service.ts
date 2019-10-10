import { Injectable } from '@angular/core';
import socketIO from 'socket.io';
import { Socket } from 'ngx-socket-io';
import { resolve } from 'url';
import { reject } from 'q';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socketStatus = false;
  constructor(private socket: Socket) {
    this.checkstatus();
  }
  checkstatus() {
    // si de conecta el servidor
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });
    // si se desconecta
    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });

  }
    // Emitir todos los eventos de la app angular  evento: tipo, payload?:que vas a enviar , callback?: Function
    emit(evento: string, payload?: any, callback?  ) {
      console.log('Emitiendo mensaje desde angular');
      this.socket.emit(evento, payload, callback); // hace uso de la class socket
    }
    // escucha los eventos del servidor
    listen(evento: string) {
      // regresa  un observable del evento
      return this.socket.fromEvent( evento );
    }
}
