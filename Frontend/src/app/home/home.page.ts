import { Component } from '@angular/core';
import { RoomService } from '../room.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  titulo= "House4me"

  btns= [
    {name:"wifi",mode:"ios",text:""},
    {name:"snow",mode:"md",text:""},
    {name:"leaf",mode:"md",text:""},
    {name:"thermometer",mode:"ios",text:"C°"},
  ]

  constructor(public rs: RoomService,  private usuario: UsuarioService){
    console.log(rs.salas)
  }

  cambio(sala = []){
    this.rs.salas.forEach(e => {
      if(sala["sala"] === e["sala"]){
        if(e['status'] === "light"){
          e["status"] = "dark";
          e["on"] = 0;

        } else {
          e["status"] = "light";
          e["on"] = 1;
        }
      }
    });
    
  }

  /* cambio(id: number){
    this.band ? this.verde(id) : this.gris(id) 
  }

  gris(id:number){
    document.getElementById(id.toString()).style.color = 'gray'
    this.band = true;
  }

  verde(id: number ){
    document.getElementById(id.toString()).style.color = "mediumaquamarine"
     this.band = false;
}*/

}
