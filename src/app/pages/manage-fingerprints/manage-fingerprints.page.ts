import { Component, OnInit } from '@angular/core';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Component({
  selector: 'app-manage-fingerprints',
  templateUrl: './manage-fingerprints.page.html',
  styleUrls: ['./manage-fingerprints.page.scss'],
})
export class ManageFingerprintsPage implements OnInit {

  constructor(private device: Device) { }

  ngOnInit() {
    alert('Device UUID is: ' + this.device.uuid);
  }

  setCredential() {
    // Save user's credentials
    NativeBiometric.setCredentials({
      username: 'mario',
      password: 'mario123',
      server: 'www.example.com',
    }).then(()=> {
      alert('Registrado con exito')
    });
  }

}
