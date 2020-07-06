import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TrabajadorModel } from '../models/trabajador.models';
import { TrabajadorService } from '../../services/trabajador.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  trabajadores: TrabajadorModel[] = [];

  constructor(private auth: AuthService, private router: Router, private trabadoreService: TrabajadorService) { }

  ngOnInit(): void {
    this.trabadoreService.getTrabajadores().subscribe( resp => this.trabajadores = resp);
}

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
