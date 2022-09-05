import { LstorageService } from './../../services/lstorage.service';
import { ScheduleService } from './../../services/schedule.service';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  fecha: any = '';
  events: any[] = [];
  days = [{0: 'domingo'}, {1: 'lunes'}, {2: 'martes'}, {3: 'miercoles'}, {4: 'jueves'}, {5: 'viernes'}, {6: 'sabado'} ];
  diaActual = '';
  id_estudiante: number = 0;

  constructor(
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef,
    private serStorage: LstorageService,
    private serSchedule: ScheduleService
  ) {

  }

  ngOnInit(): void {
    let dia = new Date().getDay();
    this.diaActual = this.getDayString(dia);
    this.id_estudiante =  this.serStorage.get('user')?.id_estudiante;
    this.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.cargarData();
  }

  cargarData(){
    this.serSchedule.getScheduleByDay(this.id_estudiante, this.diaActual).subscribe(
      resp => {
        if(resp.status == true){
          this.events = resp.data
        }
      }
    )
  }

  getDayString(dia){
    let diaSemanal = Object.values(
      this.days.find(d => Number(Object.keys(d).toString()) == dia)
    ).toString();
    return diaSemanal;
  }

  change(event) {
    //console.log(event);
    let fchange: string = event.detail.value;
    let fnew = new Date();
    fnew.setFullYear(Number (fchange.slice(0, 4)));
    fnew.setMonth(Number(fchange.slice(5, 7)) - 1);
    fnew.setDate(Number(fchange.slice(8, 10)));
    this.fecha = this.datePipe.transform(new Date(fnew), 'yyyy-MM-dd');
    this.cd.detectChanges();
    this.diaActual = this.getDayString(fnew.getDay());
    console.log(this.fecha, this.diaActual);
    this.cargarData();
  }

  dateFormat(date, format) {
    return this.datePipe.transform(date, format);
  }
}
