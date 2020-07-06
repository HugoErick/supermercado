import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperModel } from '../models/super.models';
import { SupermercadoService } from '../../services/supermercado.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-regis-super',
  templateUrl: './regis-super.component.html',
  styleUrls: ['./regis-super.component.css']
})
export class RegisSuperComponent implements OnInit {

  forma: FormGroup;
  super: SuperModel;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private fb: FormBuilder, private supermercadoService: SupermercadoService, private auth: AuthService ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.super = new SuperModel();
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get direccionNoValido(){
    return this.forma.get('direccion').invalid && this.forma.get('direccion').touched;
  }

  get emailNoValido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }

  get telNoValido(){
    return this.forma.get('tel').invalid && this.forma.get('tel').touched;
  }

  get rsNoValido(){
    return this.forma.get('rs').invalid && this.forma.get('rs').touched;
  }


  crearFormulario(){
    this.forma = this.fb.group ({
      nombre     : ['', [Validators.required, Validators.minLength(5)] ],
      direccion  : ['', Validators.required],
      rs        : ['', Validators.required],
      email      : ['', [Validators.required, Validators.pattern('[A-Za-z][a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      tel        : ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{4}-[0-9]{3}')]]
    });
  }


  guardar(){

    if (this.forma.invalid) {
      // return Object.values( this.forma.controls ).forEach( control => {
      //   control.markAsTouched();
      // });
      console.log('Formulario no valido');
      return;
    }
    console.log(this.forma.value);
    this.supermercadoService.crearSuper( this.forma.value).subscribe(resp => {
      console.log(resp);
    });
    this.router.navigateByUrl('/home');
  }
  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
