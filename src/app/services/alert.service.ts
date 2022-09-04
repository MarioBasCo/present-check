import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastCtrl: ToastController) { }

  async showToast(message: string, color: string = "success", duration = 3000) {
    let toast = await this.toastCtrl.create({
      message,
      color,
      duration,
    });
    toast.present();
  }
}
