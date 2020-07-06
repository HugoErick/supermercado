import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisEncComponent } from './pages/regis-enc/regis-enc.component';
import { RegisSuperComponent } from './pages/regis-super/regis-super.component';
import { StartComponent } from './pages/start/start.component';
import { EditarEncComponent } from './pages/editar-enc/editar-enc.component';
import { RegisTrabajadorComponent } from './pages/regis-trabajador/regis-trabajador.component';
import { RegisDepaComponent } from './pages/regis-depa/regis-depa.component';
import { PhoneMaskDirective } from './directives/phone-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisEncComponent,
    RegisSuperComponent,
    StartComponent,
    EditarEncComponent,
    RegisTrabajadorComponent,
    RegisDepaComponent,
    PhoneMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
