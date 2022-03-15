//ng g c clientes/form --flat   :  con la bandera flat evita crear una nueva carpeta

import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './clientes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  //Esta instancia de cliente nos servira para hacer un bind los atributos de NgModel. Los componentes son bidireccionales. Componente<->formulario
  public cliente : Cliente = new Cliente();
  public titulo: string = "Formulario Cliente";

  errores: string[];//Recibirá la lista String de errores del response creada por la validacion del backend
  


  //Inyectamos el service y router
  constructor(private clienteService: ClienteService, 
    private router : Router, 
    private activateRoute: ActivatedRoute) { }
  
  ngOnInit(): void {   
    this.cargaCliente(); //Cuando se llama al formulario en init cargamos el cliente (si le pasamos un id por parametros)
  }

  cargaCliente(): void {
    this.activateRoute.params.subscribe(params => { //suscribimos un observador que vigila cuando pasamos el id por parametros
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe( //suscribimos la recepcion del cliente
          cliente => this.cliente = cliente
        );
      }
    })
  }

  public create(): void{
    this.clienteService.create(this.cliente)
    .subscribe( //suscribimos al create
      cliente => {//En este caso cliente ya fue mapeado en service
        this.router.navigate(['/clientes']);
        swal('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success' );
      } , 
      err => { this.errores = err.error.errors as string[]; //err= el atributo del lambda, error=atributo httprespones json, errors= atributo del backend 
      console.error("Codigo de error backend: "+ err.status);
      console.error(err.error.errors);
      }
    );     
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe({//Registramos el observador
      next: response =>{ //pasamos como parametro la response del back para trabajar directamente con el map
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `Cliente ${response.cliente.nombre} actualizado con exito!`, 'success' )
      }, 
      error : err => { this.errores = err.error.errors as string[]; //err= el atributo del lambda, error=atributo httprespones json, errors= atributo del backend 
      console.error("Codigo de error backend: "+ err.status);
      console.error(err.error.errors);
      }
    })
  }

}