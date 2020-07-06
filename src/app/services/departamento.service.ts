import { Injectable } from '@angular/core';
import { DepaModel } from '../pages/models/depa.models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url = 'https://supermercado-c9c9c.firebaseio.com';

  constructor( private http: HttpClient) { }

  crearDepa( depa: DepaModel ){
    return this.http.post(`${ this.url }/Departamento.json`, depa);
  }

  getdepa(){

    return this.http.get(`${this.url}/Departamento.json`).pipe(
      map( this.crearArrDepa )
    );
  }

  private crearArrDepa(depaObj: object){

    const depas: DepaModel[] = [];
    console.table(depaObj);

    Object.keys( depaObj ).forEach( key =>{
        const depa: DepaModel = depaObj[key];
        depa.id = key;
        depas.push( depa );
    } );
    return depas;
    // if (depaObj === null){
    //   return [];
    // }
  }
}

