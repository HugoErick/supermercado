import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisEncComponent } from './pages/regis-enc/regis-enc.component';
import { RegisSuperComponent } from './pages/regis-super/regis-super.component';
import { StartComponent } from './pages/start/start.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisTrabajadorComponent } from './pages/regis-trabajador/regis-trabajador.component';
import { RegisDepaComponent } from './pages/regis-depa/regis-depa.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'registroEnc', component: RegisEncComponent },
  { path: 'regisSuper' , component: RegisSuperComponent, canActivate: [AuthGuard] },
  { path: 'regisTrabajador', component: RegisTrabajadorComponent},
  { path: 'regisDepa', component: RegisDepaComponent, canActivate: [AuthGuard]},
  { path: 'start', component: StartComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
