import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component'; //ng generate class footer.component
import { HeaderComponent } from './header/header.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component'; //la hemos creado desde el CLI con: ng generate component directiva y se importa automaticamente
import { ClienteService } from './clientes/cliente.service';// C:\Users\Victor\OneDrive\Desktop\fullapp\clientes-app\src\app\clientes> ng g service cliente 
import { RouterModule, Routes } from '@angular/router'; //Importamos los modulos para routear

import {HttpClientModule}  from '@angular/common/http';
import { FormComponent } from './clientes/form.component';//Este modulo nos proporciona todos lo verbos necesarios para apiRest

import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeES, 'es');


const routes: Routes=[ //Creamos una constante con las rutas
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
]


//importamos los modulos que emplearemos. JSON, Form...
@NgModule({
  declarations: [//Registro de componentes
    AppComponent, 
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
    
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    FormsModule, // modulo para trabajar con los fromularios necesarios para hacer el CRUD en el back
    RouterModule.forRoot(routes) //Configuramos el router module
    
  ],
  providers: [ //Registro de servicios
    ClienteService
  ],
  bootstrap: [AppComponent] //Componente de arranque
})
export class AppModule { } //Es la clase que se carga en el main.ts

function localeES(localeES: any, arg1: string) {
  throw new Error('Function not implemented.');
}

