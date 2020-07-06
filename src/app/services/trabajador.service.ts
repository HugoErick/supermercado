import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrabajadorModel } from '../pages/models/trabajador.models';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../pages/models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  private url = 'https://supermercado-c9c9c.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearEncargado( trabajador: TrabajadorModel ){

    return this.http.post(`${ this.url }/Usuarios.json`, trabajador).pipe(
      map( (resp: any) => {
        trabajador.id = resp.name;
        return trabajador;
      })
      );

  }


  getTrabajadores(){

    return this.http.get(`${this.url}/Usuarios.json`).pipe(
      map( this.crearArrTrabajador )
    );
  }


  getTrabajador( id: string){
    return this.http.get(`${this.url}/Usuarios/${ id }.json`);
  }

  private crearArrTrabajador(trabajadorObj: object){

    const trabajadores: TrabajadorModel[] = [];
    console.table(trabajadorObj);
    if (trabajadorObj === null){ return []; }

    Object.keys( trabajadorObj ).forEach( key => {
        const trabajador: TrabajadorModel = trabajadorObj[key];
        trabajador.id = key;
        trabajadores.push( trabajador );
    } );
    return trabajadores;
  }
}

