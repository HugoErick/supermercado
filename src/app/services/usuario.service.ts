import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../pages/models/usuario.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'https://supermercado-c9c9c.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearEncargado( encargado: UsuarioModel  ){

    return this.http.post(`${ this.url }/Usuarios.json`, encargado).pipe(
      map( (resp: any) => {
        encargado.id = resp.name;
        return encargado;
      })
      );

  }

  getEncargado(){

    return this.http.get(`${this.url}/Usuarios.json`).pipe(
      map( this.crearEncargado )
    );
  }

  editarEncargado(encargado: UsuarioModel){
    const encargadoTemp = {
      ...encargado
    };
    delete encargadoTemp.id;
    return this.http.put(`${this.url}/Usuarios/${encargado.id}.json`, encargadoTemp);
  }

  private crearArrEncargado(encargadoObj: object){

    const encargados: UsuarioModel[] = [];
    console.table(encargadoObj);
    if (encargadoObj === null){ return []; }

    Object.keys( encargadoObj ).forEach( key => {
        const encargado: UsuarioModel = encargadoObj[key];
        encargado.id = key;
        encargados.push( encargado );
    } );
    return encargados;
  }
}
