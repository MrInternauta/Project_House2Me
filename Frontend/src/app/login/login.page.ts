import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private user: string;
  private pass: string;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  login(){
    if(this.user == 'admin' && this.pass == 'admin'){
      this.router.navigate(["/home"]);
    } else {
      console.log("error en login")
    }
  }

}
