import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  elemento: string;
  nombre: string;
  tipo: string;
  sala: string;
  salas: any;
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private user: UsuarioService) {
    this.user.get('/sala/listar/'+ this.user.usuario._id).subscribe((data: any)=>{
      this.salas = data.element;
      console.log(this.salas);

    });
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
  }
  agregar(elemento_tipo : string, nombre: string, tipo: string, sala: string){
    let url  =  '/'+(elemento_tipo == 'sala'? 'sala' : 'elemento') + '/crear/' + (elemento_tipo == 'dispositivo' ? tipo : '');
    let elemento = {
      nombre, 
      user_id: this.user.usuario._id,
      sala_id: sala,
      estado: false,
      metrica: 0
    }
    console.log(url,elemento, elemento_tipo, nombre, tipo, sala);

    this.user.post(url, elemento).subscribe((data) =>{
      console.log(data);
      if(data.ok == true) {
        this.user.presentAlert("Registro correcto!", '', 'Se registro '+elemento_tipo+' correctamente!');
      }
    }, (err)=>{
      this.user.presentAlert("Registro incorrecto!", '', 'Error al registrar ' +  elemento_tipo);
    })
    //this.user.
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
