
import { Component, OnInit } from '@angular/core';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Geolocation } from '@capacitor/geolocation';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { isInsideCircle, distanceTo } from 'geofencer';


@Component({
  selector: 'app-register-attendance',
  templateUrl: './register-attendance.page.html',
  styleUrls: ['./register-attendance.page.scss'],
})
export class RegisterAttendancePage implements OnInit {
  circle = {
    center: [0, 0],
    radius: 1
  };
  areaPermitida: number = 0;

  constructor(private device: Device) {

  }

  ngOnInit() {
    //alert('Device model is: ' + this.device.model);
    this.circle = {
      center: [-2.2417787, -80.9322953],
      radius: 1
    }
    this.areaPermitida = 8;
  }

  async checkCredential() {
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) {
      alert("!!! Registro de Huella no disponible o no activado ¡¡¡");
      return;
    };

    //const isFaceID = result.biometryType == BiometryType.FACE_ID;

    const verified = await NativeBiometric.verifyIdentity({
      reason: "Para autenticación biométrica",
      title: "Registro de Asistencia",
      description: "Coloque su huella en el sensor de su dispositivo",
      negativeButtonText: 'Cancelar'
    })
      .then(() => true)
      .catch(() => false);

    if (!verified) {
      alert('Error no se pudo identificar');
      //return
    } else {
      alert('Autentificación exitosa');
      //return
      await this.getPosicion();
    };
  }


  async getPosicion() {
    //Capturamos la posición actual del usuario
    const position = await Geolocation.getCurrentPosition();
    const { longitude, latitude } = position.coords;
    const point = [latitude, longitude];
    console.log(this.circle.center, point);

    //const inside = isInsideCircle(this.circle.center, point, this.circle.radius);
    const distance = distanceTo(this.circle.center, point);
    const diferencia = Number ((distance/1000).toFixed(3)); 
    if(diferencia > this.areaPermitida) {
      alert("No se encuentra en el sitio")
    } else {
      alert("Se Encuntra en el sitio")
    }
  }

}
