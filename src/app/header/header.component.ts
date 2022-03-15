import { Component } from "@angular/core"; //importamos la anotacion component

@Component({  //Añadimos la anotacion con sus propiedades
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{ //export es un modificador de la clase
    title:string = 'App Angular Spring'

}