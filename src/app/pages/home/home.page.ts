import { Router } from '@angular/router';
import { LstorageService } from './../../services/lstorage.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listMenu: any[] = [
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

  nombre_usuario: string = '';

  constructor(
    private serStorage: LstorageService, 
    private router: Router,
    private alertCtrl: AlertController) {
    const { apellidos, nombres } = this.serStorage.get('user')
    this.nombre_usuario = apellidos + " " + nombres;
  }

  async cerrarSesion(){
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: 'Desea <strong>cerrar sesión</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.serStorage.clear();
            this.router.navigateByUrl('/login', { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }
}
