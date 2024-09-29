import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  // tslint:disable-next-line:variable-name
  constructor(public _UsuarioService: UsuarioService,
              public router: Router) {

  }
  canActivate() {
    console.log("Hola");
    if (this._UsuarioService.EstaLogueado()) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }

  }
}
