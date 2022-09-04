import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  fecha: any = '';
  events: any[] = [];

  constructor(
    private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.events = [
      { content: 'Calculo de Una Variable', date: '07:30', status: 'R'},
      { content: 'Programación Avanzada I', date: '10:00', status: 'R'},
      { content: 'Fundamentos de Redes', date: '13:00'},
    ]
  }

  change(event) {
    console.log(event);
  }

  dateFormat(date, format) {
    return this.datePipe.transform(date, format);
  }
}
