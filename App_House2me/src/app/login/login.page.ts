import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private user: string;
  private pass: string;

  constructor(public router: Router, private userService: UsuarioService) { }

  ngOnInit() {
  }

  login(user: any, pass: any){
    this.userService.Login({ email: String(user), password: String(pass) }).subscribe((data) =>{
      console.log(user, pass, data);
      this.router.navigate(['home']);
      },(err)=>{
        this.userService.presentAlert("Error de inicio", '', err.error.message);
        console.log(err.error.message, err);
      })
  }

}
