import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DepaModel } from '../models/depa.models';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-regis-depa',
  templateUrl: './regis-depa.component.html',
  styles: [
  ]
})
export class RegisDepaComponent implements OnInit {

  forma: FormGroup;
  departamento: DepaModel;
  departamentos: DepaModel[] = [];

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private depaService: DepartamentoService) {
    this.crearFormulario();
   }

  ngOnInit(): void {
    this.departamento = new DepaModel();
    this.depaService.getdepa().subscribe(resp => this.departamentos = resp);
  }

  get nombreNovalido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre     : ['', [Validators.required, Validators.minLength(4)] ],
    });
  }

  guardar(){

    if (this.forma.invalid) {
      console.log('Formulario no valido');
      return;
    }else{
      this.depaService.crearDepa(this.forma.value).subscribe(resp => {
        console.log(resp);
      });
      window.location.reload();
    }
  }


  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
