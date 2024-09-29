import { Component } from '@angular/core';
import { RoomService } from '../../room.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage 
{
  salas: any;

  titulo= "House4me"

  btns= [
    {name:"sunny",mode:"md",text:""},
    {name:"thermometer",mode:"ios",text:"C°"},

  ]

  constructor(private usuario: UsuarioService){
    this.usuario.get('/sala/listar/'+ this.usuario.usuario._id).subscribe((data: any)=>{
      this.salas = data.element;
    });
  }

  // mover(sala){
  //   this.
  // }
}
