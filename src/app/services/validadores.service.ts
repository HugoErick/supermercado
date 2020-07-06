import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  checkPass(pass1: string, pass2: string  ){

    return ( formGroup: FormGroup) => {

      const pass1control = formGroup.controls[pass1];
      const pass2control = formGroup.controls[pass2];

      if (pass1control.value === pass2control.value) {
        pass2control.setErrors(null);
      } else{
        pass2control.setErrors({ noEsIgual: true});
      }
    };

  }
}

