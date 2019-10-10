import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  // tslint:disable-next-line:variable-name
  constructor(public _UsuarioService: UsuarioService,
              public router: Router) {

  }
  canActivate() {
    if (this._UsuarioService.EstaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
