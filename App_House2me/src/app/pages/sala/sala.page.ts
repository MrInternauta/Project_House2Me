import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RoomService } from '../../room.service';
import { IonRange } from '@ionic/angular';
import { SocketService } from '../../services/socket/socket.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})
export class SalaPage implements OnInit {
  @ViewChild(IonRange) rang :IonRange
  titulo = 'Elementos'
  sala = {}
  p
  temp: any;
  onOff1= true;
  onOff2= true;
  luz = false;
  sensores: any;
  luces: any;
  // tslint:disable-next-line:variable-name
  luces_estados: any[];

  constructor(public  route   : ActivatedRoute, 
              public  rs      : RoomService,
              private socket  : SocketService, 
              private usuario : UsuarioService, 
              private http    : HttpClient,
              private user: UsuarioService,
              private activateRouter: ActivatedRoute) { 

    let id = route.snapshot.params[('name')];
    this.usuario.get('/elementos/listar/sala/sensor/'+ id).subscribe((data: any) => {
      this.sensores = data.element;
      console.log(data);
      this.versensores();

    }); 


    this.usuario.get('/elementos/listar/sala/luz/' + id).subscribe((data: any) => {
      this.luces = data.element;
      console.log(data);

      this.luces.forEach(element => {
        this.luces_estados = element.estado;
      });
      this.verluces();
    });

                // tslint:disable-next-line:no-shadowed-variable
    this.socket.listen ('visualizar-sensor').subscribe((data: any) => {
            // console.log('SENSOR', data);
            this.temp = data.metrica;
          });

          // tslint:disable-next-line:no-shadowed-variable
    this.visualizarl();
  }

  ngOnInit() {
  }

  visualizarl() {

    this.socket.listen ('visualizar-luz').subscribe((data: any) => {
      this.luces.forEach((element, index) => {
      if ( element._id === data._id) {
        this.luces[index].estado = element.estado;
      }
    });
    });
  }
  verluces() {
    this.luces.forEach((elemento: any, index) => {
      this.socket.emit('ver-luz', {
        id_luz: elemento._id
    }, ( data  ) => { 
      if ( elemento._id === data._id) {
        this.luces[index].estado = elemento.estado;
      }
     });
    });
  }
  versensores() {
    this.sensores.forEach((elemento: any) => {
      this.socket.emit('ver-sensor', {
        id_sensor: elemento._id
    // tslint:disable-next-line:no-shadowed-variable
    }, ( data) => {
      this.luces.forEach((element, index) => {
      if ( element._id === data._id) {
        this.luces[index].estado = element.estado;
      }
    });
     });
    });
  }
  Cambiar(luces) {
      this.luces.forEach((element, index) => {
        if ( element._id === luces._id) {
          this.luces[index].estado = !this.luces[index].estado;
          luces.estado = this.luces[index].estado;
          console.log(this.luces[index].estado);

          this.socket.emit('configurar-luz', {
              id_luz: luces._id,
              nombre_luz: luces.nombre,
              estado_luz: this.luces[index].estado
          }, ( data ) => { 
            data = data.luz;
                  this.luces.forEach((element, index) => {
                    if ( element._id === data._id) {
                      this.luces[index].estado = element.estado;
                    }
                  });
           });
            this.visualizarl();
        }
      });

      // console.log(this.luces);
  }

  cambio(){
    this.temp = this.rang.value;
    //console.log(this.rang.value)
  }

  onoff(val){
    switch (val) {
      case 1:
        if(this.onOff1){
          this.onOff1 = false;
        }else{
          this.onOff1= true;
        }
        break;
      case 2:
          if(this.onOff2){
            this.onOff2 = false;
          }else{
            this.onOff2= true;
          }
      default:
        break;
    }
    
    //console.log(this.onOff1 +' '+ this.onOff2);
  }

}
