import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioModel } from '../models/usuario.models';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import {  ValidadoresService } from '../../services/validadores.service';
import { UsuariosService } from '../../services/usuario.service';




@Component({
  selector: 'app-regis-enc',
  templateUrl: './regis-enc.component.html',
  styleUrls: ['./regis-enc.component.css']
})
export class RegisEncComponent implements OnInit {

  usuario: UsuarioModel;
  forma: FormGroup;

  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private validadores: ValidadoresService, private usuarioService: UsuariosService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();

  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidosNoValido(){
    return this.forma.get('apellidos').invalid && this.forma.get('apellidos').touched;
  }

  get emailNoValido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }

  get telNoValido(){
    return this.forma.get('tel').invalid && this.forma.get('tel').touched;
  }

  get passNoValido(){
    return this.forma.get('pass').invalid && this.forma.get('pass').touched;
  }

  get confirmPassNoValido(){
    const pass = this.forma.get('pass').value;
    const confirmPass = this.forma.get('confirmPass').value;
    return ( pass === confirmPass ) ? false : true;
  }

  get fnNoValido(){
    return this.forma.get('fn').invalid && this.forma.get('fn').touched;
  }

  get generoNovalido(){
    return this.forma.get('genero').invalid && this.forma.get('genero').touched;
  }

  crearFormulario(){
    const today = new Date().toISOString().substring(0);
    this.forma = this.fb.group({
      nombre     : ['', [Validators.required, Validators.minLength(4)] ],
      apellidos  : ['', Validators.required],
      email      : [''.toLowerCase(), [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      tel        : ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{4}-[0-9]{3}')]],
      pass       : ['', [Validators.required, Validators.pattern('[A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9]*')]],
      confirmPass: ['', Validators.required],
      fn         : ['', Validators.required],
      genero     : ['', Validators.required],
      // diasLabor: ['', Validators.required]
      encargado      : [Boolean],
    }, {
      validators: this.validadores.checkPass('pass', 'confirmPass')
    }
    );
  }



  guardar(){

    if (this.forma.invalid) {
      console.log('Formulario no valido');
      return;
    }

    if (this.usuario.id){
      this.usuarioService.editarEncargado( this.forma.value).subscribe(resp => {
        console.log(resp);
      });

    }
    else{
      this.forma.get('encargado').setValue(true);
      this.usuarioService.crearEncargado( this.forma.value).subscribe(resp => {
        console.log(resp);
      });

    }

    this.auth.nuevoUsuario( this.forma.value)
      .subscribe( resp => {
        console.log(resp);
        Swal.close();
        this.router.navigateByUrl('/login');

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });
  }


  // onSubmit(form: NgForm){
  //   if (form.invalid) { return; }
  //   Swal.fire({
  //     allowOutsideClick: false,
  //     icon: 'info',
  //     text: 'Espere por favor'
  //   });
  //   Swal.showLoading();

  //   this.auth.nuevoUsuario( this.usuario)
  //     .subscribe( resp => {
  //       console.log(resp);
  //       Swal.close();
  //       this.router.navigateByUrl('/login');

  //     }, (err) => {
  //       console.log(err.error.error.message);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error al autenticar',
  //         text: err.error.error.message
  //       });
  //     });
  // }


}
