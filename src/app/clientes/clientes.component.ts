import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './clientes';

import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({ //La decoracion/anotacion component se corresponde con el Controlador de Spring
  selector: 'app-clientes',
  templateUrl: './clientes.component.html' 
})

export class ClientesComponent implements OnInit {

  clientes: Cliente[] ;

  //Con el modificador private conseguimos que ademas de definir el atributo se injecten las dependencias
  constructor(private clienteService: ClienteService) { } 

  ngOnInit(): void { //nos suscribimos al flujo observable    
    this.clienteService.getClientes().pipe(
      tap(clientes => { //Tap es similar a map, pero no realiza ningun cambio en el stream
        this.clientes = clientes;
        
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    ).subscribe(); //Subscribe se registra al observable y gestiona la escucha
    }

  delete(cliente: Cliente): void{
    swal({
      title: 'Estas seguro?',
      text: `Desea eliminar permanentemente al cliente ${cliente.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33',
      cancelButtonClass: 'btn btn-danger',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response=>{
            this.clientes = this.clientes.filter( cli => cli !== cliente) //Filtramos para no mostrar el cliente eliminado
            swal(
              'Eliminado!',
              `El cliente ${cliente.nombre} ha sido eliminado con exito.`,
              'success'              
            )
          }
        )

      }
    })
    
  }  

}
