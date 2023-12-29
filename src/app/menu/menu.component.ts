import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../security/menu.model';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLogged = false;
  mainMenu: Menu[] = [
    { idMenu: 1, name: 'Listado de Clientes', icon: 'person', url: '/company' },
  ];

  showFiller = false;
  // 1	Registro Alumno	1	verRegistroAlumno	1
  // 2	Registro Libro	1	verRegistroLibro	1
  // 3	Registro Tesis	1	verRegistroTesis	1
  // 4	Registro Autor	1	verRegistroAutor	1
  // 5	Registro Sala	1	verRegistroSala	1

  // opcRegistro: Opcion[] = [];
  // opcConsulta: Opcion[] = [];
  // opcCRUD: Opcion[] = [];
  // opcTransacciones: Opcion[] = [];

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  constructor() {
    // console.log("MenuComponent >>> constructor >>> " + this.tokenService.getToken());

  }

  // Referencia al drawer para abrir/cerrar
  toggleDrawer() {
    this.drawer.toggle();
  }

  ngOnInit() {
    // console.log("MenuComponent >>> ngOnInit >>> ");

    // this.opcRegistro = this.tokenService.getOpciones().filter(x => x.tipo === 1);
    // this.opcConsulta = this.tokenService.getOpciones().filter(x => x.tipo === 2);
    // this.opcCRUD = this.tokenService.getOpciones().filter(x => x.tipo === 3);
    // this.opcTransacciones = this.tokenService.getOpciones().filter(x => x.tipo === 4);

    // console.log("MenuComponent >>> ngOnInit >>> " + this.tokenService.getToken());
    // if (this.tokenService.getToken()) {
    //   console.log("MenuComponent >>> this.isLogged = true >>> ");
    //   this.isLogged = true;
    // } else {
    //   console.log("MenuComponent >>> this.isLogged = false >>> ");
    //   this.isLogged = false;
    // }
  }

  onLogOut(): void {
    // this.tokenService.logOut();
    window.location.reload();
  }

}
