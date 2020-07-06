import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuperModel } from '../pages/models/super.models';

@Injectable({
  providedIn: 'root'
})
export class SupermercadoService {

  private url = 'https://supermercado-c9c9c.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearSuper( mercado: SuperModel ){
    return this.http.post(`${ this.url }/Supermercado.json`, mercado);
  }
}
