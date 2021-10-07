import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { MensajesServiceService } from './services/mensajes-service.service';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { SeleccionarClienteComponent } from './seleccionar-cliente/seleccionar-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ListadoClientesComponent,
    AgregarClienteComponent,
    PreciosComponent,
    InscripcionComponent,
    SeleccionarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ProgressbarModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    
  ],
  providers: [
    AngularFireAuth,
    MensajesServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
