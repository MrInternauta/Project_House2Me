import { Component, OnInit,  } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  private user:any = 
    { name: "", email: "", password:"", password2: "" }
  

  constructor(private userServices: UsuarioService,) { }

  ngOnInit() {
  }
  registrar(user){
    this.userServices.RegistrarUsuario(user).subscribe((data) => {
        if(data._id != null){
          this.userServices.presentAlert("Registro correcto", '', 'Se realizo el usuario correctamente');
          console.log("Registro correcto");
        }
    },(err)=>{
      this.userServices.presentAlert("Error de registro", '', err.error.message);
      console.log("Registro incorrecto");
    })
  }

}
