import { Component } from '@angular/core';

//Componentes.caracteristicas: Patron composite, anidado, enrutable, ciclo vida, MVC, Asincronos, inyreccion de dependencias, estilos...

@Component({// son clases TS con su propia logica y su propio template (un calendario, un menu, una barra, una pagina dinamica...)
  selector: 'app-root', //creamos una etiqueta html 
  templateUrl: './app.component.html', //Logica del componente
  styleUrls: ['./app.component.css'] //estilo del componete
})

  export class AppComponent { //Registra el componente en el app.module.ts
  title = 'Bienvenido';

    curso : string = 'Curso Spring + angular'; //Define los tipos estaticamente
    profesora: string = 'Alba Varela';

}
