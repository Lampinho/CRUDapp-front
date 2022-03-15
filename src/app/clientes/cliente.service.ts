import { Injectable } from '@angular/core';
import { Cliente } from './clientes';
import {CLIENTES} from './clientes.json';
import { filter, Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';//Opcion 1: httprequest observable
import { map, catchError } from 'rxjs'; //Opcion 2: importar operador y usar pipe
import { pipe } from 'rxjs';
import swal from 'sweetalert2';
import localeES from '@angular/common/locales/es'

import { Router } from '@angular/router';
import { formatDate, DatePipe, registerLocaleData } from '@angular/common';

//Decorado/anotacion para Clase con un rol de servicio, trabaja en la logica de business
@Injectable( )
export class ClienteService {
  /*constructor() { }

  //Generamos un flujo Observable a partir de los objetos de CLIENTES 
  // podran visualizarlo los observadores, alos que se les notificara cualquier cambio
  getClientes(): Observable <Cliente[]>{
    return of(CLIENTES);
  }*/

  private urlEndPoint:string ='http://localhost:8080/api/clientes'; 

  private httpHeader = new HttpHeaders({'Content-Type' : 'application/json'})

  //Injectamos el objeto httpClient
  constructor(private http: HttpClient, private router: Router){}

  getClientes(): Observable <Cliente[]>{
    //return this.http.get<Cliente[]>(this.urlEndPoint);//Opcion1: promesa get devuelve un objeto tipo observable y lo casteamos
    return this.http.get(this.urlEndPoint).pipe(//Opcion 2: Operador map
      map(response => {//Este map trabaja sobre el observable
        
        let clientes = response as Cliente[]; //funcion que devuelve la respuesta casteada
        
        return clientes.map(cliente => {//Este map trabaja sobre el objeto local clientes
          cliente.nombre = cliente.nombre.toLocaleUpperCase();
          registerLocaleData(localeES, 'es')
          let datePipe = new DatePipe('es');
          //cliente.createAt = formatDate(cliente.createAt, 'd-MMM-yy', 'en-US');
          cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE d, MMMM, yyyy');
          return cliente;
        });
      }) 
    )  
  }

  create(cliente:Cliente) : Observable<Cliente>{ //HTTP POST crea una nueva entrada
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeader})//Utilizamos el metodo post (url, datos, cabecera)
    .pipe( //Con pipe podemos utilizar todos los operadores del flujo
        map((response:any) => response.cliente as Cliente), //Desde el bak recibimos un Map que contiene el Cliente, mapeamos el atributo como objeto
        catchError(e => { //Cuando se detecta un error se recibe un objeto del backend al que le añadimos la expresion lambda

          if(e.status==400){ //400- BAD Request, el status que envia el back en los errores de validacion
            console.error(e.error.errors);
            return throwError((e)); //
          }else{

          //this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal('Error al crear', e.error.error, 'error'); //ventana emergente con (titulo, atributo mensaje del objeto, tipo de ventana )
          return throwError((e));//Tenemos que devolver el error en un observable 
          }
        })
      );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)//Get a la url añadiendo el id
      .pipe( //Con pipe podemos utilizar todos los operadores del flujo
        catchError(e => { //Cuando se detecta un error se recibe un objeto del backend al que le añadimos la expresion lambda
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal('Error al editar', e.error.mensaje, 'error'); //ventana emergente con (titulo, atributo mensaje del objeto, tipo de ventana )
          return throwError(() => new Error(e));//Tenemos que devolver el error en un observable        
        })
      );
  }

  update(cliente : Cliente) : Observable<any>{ //HTTP PUT actualiza en vez de crear
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeader}) //Cambiamos a any para poder recoger el map del back en el form.component
    .pipe( //Con pipe podemos utilizar todos los operadores del flujo
        catchError(e => { //Cuando se detecta un error se recibe un objeto del backend al que le añadimos la expresion lambda

          if(e.status==400){ //400- BAD Request, el status que envia el back en los errores de validacion
            return throwError((e)); //
          }
          
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal('Error al editar', e.error.error, 'error'); //ventana emergente con (titulo, atributo mensaje del objeto, tipo de ventana )
          return throwError((e));//Tenemos que devolver el error en un observable        
        })
      );

  } 

  delete(id : number) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader})
    .pipe( //Con pipe podemos utilizar todos los operadores del flujo
        catchError(e => { //Cuando se detecta un error se recibe un objeto del backend al que le añadimos la expresion lambda
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal('Error al editar', e.error.mensaje, 'error'); //ventana emergente con (titulo, atributo mensaje del objeto, tipo de ventana )
          return throwError(() => new Error(e));//Tenemos que devolver el error en un observable
        })
      );
  }




}
