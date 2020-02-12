import { DatosService } from './../services/datos.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id: number;
  name: string;
  lastName: string;
  estudios: any;
  constructor(private datosService: DatosService) { }
  avalaible = false;


  muestraLista() {
    this.avalaible = true;
    this.solicitarUsuario();
  }

  solicitarUsuario() {
    this.datosService.GetEstudios().then((estudios) => {
      this.estudios = estudios;
    }).catch(() => {
      return null;
    });
  }

}
