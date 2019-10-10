import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirarhivoService } from '../subirarchivo/subirarchivo.service';
//import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: any;
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Imdvb2dsZSI6ZmFsc2UsInJvbGUiOiJBRE1JTl9ST0xFIiwiX2lkIjoiNWQ4MmZjOTY1MDAxNTkxNjUwOGYxNDUyIiwibmFtZSI6IkZlbGlwZSIsImxhc3RuYW1lIjoiUmFtaXJleiIsImVtYWlsIjoiZmVsZGplc3VzQGdtYWlsLmNvbSIsIl9fdiI6MH0sImlhdCI6MTU2ODk0NjUyMSwiZXhwIjoxNTY5MTE5MzIxfQ.fUl_4LD5GVLzEyN3cQhfY2o7H6AUPJz_s8USDxtWiN8";

  constructor(public http: HttpClient, public router: Router,
              public subirarchivo: SubirarhivoService) {
    this.CargarStorage();
    console.log(environment.url);
  }

  CargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Imdvb2dsZSI6ZmFsc2UsInJvbGUiOiJBRE1JTl9ST0xFIiwiX2lkIjoiNWQ4MmZjOTY1MDAxNTkxNjUwOGYxNDUyIiwibmFtZSI6IkZlbGlwZSIsImxhc3RuYW1lIjoiUmFtaXJleiIsImVtYWlsIjoiZmVsZGplc3VzQGdtYWlsLmNvbSIsIl9fdiI6MH0sImlhdCI6MTU2ODk0NjUyMSwiZXhwIjoxNTY5MTE5MzIxfQ.fUl_4LD5GVLzEyN3cQhfY2o7H6AUPJz_s8USDxtWiN8";
      this.usuario = null;
    }
  }

   GuardarStorage(id: string, token: string, usuario: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
   }

   EstaLogueado () {
    return (this.token.length > 5) ? true : false;
  }
  Logout () {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    location.reload();
  }
   Login(usuario: Usuario, recordar = false ) {
     if (recordar) {
       localStorage.setItem('email', usuario.email);
     } else {
       localStorage.removeItem('email');
     }
    // tslint:disable-next-line:align
    return this.http.post(environment.url + '/login', usuario)
        .pipe(
          map((resp: any) => {
            this.GuardarStorage(resp.usuario._id, resp.token, resp.usuario);
            return true;
          })
        );
   }
   LoginGoogle( token: string) {
    return this.http.post(environment.url + '/google', { idtoken: token})
    .pipe(
      map((resp: any) => {
        this.GuardarStorage(resp.usuario._id, resp.token, resp.usuario);
        return true;
      })
    );
   }
   RegistrarUsuario (usuario: Usuario) {
    console.log(environment.url);

      // tslint:disable-next-line:align
      return this.http.post(environment.url + '/usuario/crear', usuario)
        .pipe(
          map( (data: any) => {
            // swal(`Usuario creado!`, `${data.usuario.name} ${data.usuario.lastname} creado correctamente!`, 'success');
            return data.usuario;
          } )
        );
     }
     ActualizarUsuario ( usuario: any ) {

      const headers = new HttpHeaders({
        'token': this.token
      });
      return this.http.put(environment.url + '/usuario/actualizar/' + this.usuario._id, {
        nombre: usuario.name,
        apellido: usuario.lastname
      },
      {
        headers
      }).pipe(
        map( (data: any ) => {
          // swal(`Usuario actualizado!`, `Actualizado correctamente!`, 'success');
          this.GuardarStorage(data.usuario._id, this.token, data.usuario );
          return true;
        })
      );
      }
      CambiarImagen(file: File, id: string) {
        this.subirarchivo.SubirArchivo(file, 'usuarios', id)
        .then( (res: any) => {
          console.log(res);
          this.GuardarStorage( this.usuario._id, this.token,  res.usuario);
          // swal(`Imagen actualizada!`, `Actualizado correctamente!`, 'success');
        }).catch( e => {
          console.log(e);
        });
      }
      get(url) {
        const headers = new HttpHeaders({
          'token': this.token
        });
        return this.http.get(environment.url + url, {headers});
      }
}
