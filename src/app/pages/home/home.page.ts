import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listMenu: any [] = [
    {
      nombre: 'Registrar Asistencia',
      ruta: '/register-attendance',
      imagen: 'assets/icon/touch.png'
    },
    {
      nombre: 'Mi Horario',
      ruta: '/schedule',
      imagen: 'assets/icon/schedule.png'
    },
    {
      nombre: 'Mis Asistencias',
      ruta: '/assists',
      imagen: 'assets/icon/checklist.png'
    },
    {
      nombre: 'Mi Perfil',
      ruta: '/profile',
      imagen: 'assets/icon/students.png'
    },
   /*  {
      nombre: 'Administrar Huellas',
      ruta: '/manage-fingerprints',
      imagen: 'assets/icon/setting.png'
    }  */
  ];

  constructor() { }
}
