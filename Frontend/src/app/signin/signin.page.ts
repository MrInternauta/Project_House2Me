import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  private user:any = [
    { user: "", email: "", pass:"", pass2: "" }
  ]

  constructor() { }

  ngOnInit() {
  }

}
