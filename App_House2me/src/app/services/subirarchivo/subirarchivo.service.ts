import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubirarhivoService {

  constructor() { }
  SubirArchivo( archivo: File, tipo: string, id: string ) {
    return new Promise ( (resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('archivo', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if ( xhr.status === 200) {
            resolve( JSON.parse(xhr.response) );
            console.log('Imagen subida');
          } else {
            console.log('fallo subida');
            reject( JSON.parse(xhr.response) );
          }
        }
      };
      const url = environment.url + `/upload/${tipo}/${id}`;
      xhr.open('PUT', url, true );
      xhr.send(formData);

    });
  }
}
