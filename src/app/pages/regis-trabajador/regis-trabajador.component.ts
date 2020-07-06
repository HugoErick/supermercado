import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { UsuarioModel } from '../models/usuario.models';
import { TrabajadorModel } from '../models/trabajador.models';

@Component({
  selector: 'app-regis-trabajador',
  templateUrl: './regis-trabajador.component.html',
  styleUrls: ['./regis-trabajador.component.css']
})
export class RegisTrabajadorComponent implements OnInit {

  dias = [{ dia: 'Lunes' }, { dia: 'Martes' }, { dia: 'Miercoles' }, { dia: 'Jueves' }, { dia: 'Viernes' }, { dia: 'Sabado' }, { dia: 'Domingo' }];
  trabajador: UsuarioModel;
  forma: FormGroup;
  trabajadores: TrabajadorModel[] = [];

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private trabajadorService: TrabajadorService,
              private auth: AuthService) {
    this.crearFormulario();
   }

  ngOnInit(): void {
    this.trabajador = new UsuarioModel();
    this.trabajadorService.getTrabajadores().subscribe( resp => this.trabajadores = resp);
    const id = this.route.snapshot.paramMap.get('id');
    if ( id  !== 'nuevo'){
          this.trabajadorService.getTrabajador(id).subscribe( resp =>{
            console.log(resp);
          });
    }
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidosNoValido(){
    return this.forma.get('apellidos').invalid && this.forma.get('apellidos').touched;
  }

  get telNoValido(){
    return this.forma.get('tel').invalid && this.forma.get('tel').touched;
  }

  get diasLaborNovalido(){
    return this.forma.get('diasLabor').invalid && this.forma.get('diasLabor').touched;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre     : ['', [Validators.required, Validators.minLength(4)] ],
      apellidos  : ['', Validators.required],
      tel        : ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{4}-[0-9]{3}')]],
      diasLabor  : this.fb.array(['', Validators.required]),
      encargado  : [Boolean],
    }
    );
  }

  onChange(dia: string, isChecked: boolean) {
    const diaFormArray = <FormArray>this.forma.controls.diasLabor;

    if (isChecked) {
      diaFormArray.push(new FormControl(dia));
    } else {
      const index  = diaFormArray.controls.findIndex(x => x.value === dia)
      diaFormArray.removeAt(index);
    }
  }

  guardar(){

    if (this.forma.invalid) {
      console.log('Formulario no valido');
      console.log(this.forma);

      return;
    } else{
      this.forma.get('encargado').setValue( false);
      this.trabajadorService.crearEncargado( this.forma.value).subscribe(resp => {
        console.log(resp);
      });

    }
    this.router.navigateByUrl('/home');
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }


}
