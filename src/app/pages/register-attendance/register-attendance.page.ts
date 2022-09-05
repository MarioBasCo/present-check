import { AttendanceService } from './../../services/attendance.service';
import { DatePipe } from '@angular/common';
import { LstorageService } from './../../services/lstorage.service';
import { Component, OnInit } from '@angular/core';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Geolocation } from '@capacitor/geolocation';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { distanceTo } from 'geofencer';

import { UtilService } from './../../services/util.service';
import { AlertService } from './../../services/alert.service';
import { ScheduleService } from './../../services/schedule.service';
import { IpaddressService } from './../../services/ipaddress.service';

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
  ip: string = '';
  deviceUsr: string = '';
  days = [{ 0: 'domingo' }, { 1: 'lunes' }, { 2: 'martes' }, { 3: 'miercoles' }, { 4: 'jueves' }, { 5: 'viernes' }, { 6: 'sabado' }];
  diaActual = '';
  id_horario: number = 0;
  id_estudiante: number = 0;

  constructor(
    private serIp: IpaddressService,
    private serSchedule: ScheduleService,
    private serAlert: AlertService,
    private serUtil: UtilService,
    private serMar: AttendanceService,
    private serStorage: LstorageService,
    private datePipe: DatePipe,
    private device: Device) {

  }

  ngOnInit() {
    let dia = new Date().getDay();
    this.diaActual = this.getDayString(dia);
    let horaActual = this.datePipe.transform(new Date(), 'HH:mm:ss');
    this.id_estudiante = this.serStorage.get('user')?.id_estudiante;

    this.serIp.getIp().subscribe(resp => {
      this.ip = resp.ip;
    });

    this.serSchedule.getClassroom(this.id_estudiante, this.diaActual, horaActual).subscribe(resp => {
      if (resp.status == true) {
        let data = resp?.data[0];
        this.circle = {
          center: [data?.latitud, data?.longitud],
          radius: 1
        }
        this.areaPermitida = data?.perimetro;
        this.id_horario = data?.id_horario;
        console.log(JSON.stringify(this.circle.center));
      }
    });

    this.deviceUsr = this.device.model;
  }

  getDayString(dia) {
    let diaSemanal = Object.values(
      this.days.find(d => Number(Object.keys(d).toString()) == dia)
    ).toString();
    return diaSemanal;
  }

  async checkCredential() {
    console.log(this.ip);
    if (this.id_horario == 0) {
      this.serAlert.showToast('No tiene un horario asignado', 'warning');
    } else {
      const result = await NativeBiometric.isAvailable();

      if (!result.isAvailable) {
        const msg = '"!!! Registro de Huella no disponible o no activado ¡¡¡"';
        this.serAlert.showToast(msg, 'danger');
        return;
      };

      const verified = await NativeBiometric.verifyIdentity({
        reason: "Para autenticación biométrica",
        title: "Registro de Asistencia",
        description: "Coloque su huella en el sensor de su dispositivo",
        negativeButtonText: 'Cancelar'
      })
        .then(() => true)
        .catch(() => false);

      if (!verified) {
        this.serAlert.showToast('Error no se pudo identificar', 'danger');
        return
      } else {
        await this.getPosicion();
      };
    }
  }


  async getPosicion() {
    //Capturamos la posición actual del usuario
    const position = await Geolocation.getCurrentPosition();
    const { longitude, latitude } = position.coords;
    const point = [latitude, longitude];
    console.log(point);

    const distance = distanceTo(this.circle.center, point);
    const diferencia = Number((distance / 1000).toFixed(3));
    if (diferencia > this.areaPermitida) {
      this.serAlert.showToast('No se encuentra en el área permitida', 'warning');
    } else {
      const data = {
        id_horario: this.id_horario,
        id_estudiante: this.id_estudiante,
        latitud: latitude,
        longitud: longitude,
        fecha: new Date().toISOString().slice(0, 10).replace('T', ' '),
        hora: this.datePipe.transform(new Date(), 'HH:mm:ss'),
        dispositivo: this.deviceUsr,
        direccion_ip: this.ip
      }
      console.log(JSON.stringify(data));
      await this.serMar.saveDialing(this.serUtil.objectToFormData(data)).subscribe(resp => {
        if(resp.status == true){
          this.serAlert.showToast(resp.mensaje);
        } else {
          this.serAlert.showToast(resp.mensaje, 'danger');
        }
      }, (error) => {
        console.error('error en la base de datos');
        console.log(JSON.stringify(error));
      });
      
    }
  }

}
