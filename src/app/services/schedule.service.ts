import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  path_base = environment.webservice + '/horario';

  constructor(private http: HttpClient) { }

  getScheduleByDay(id: number, dia: string){
    const url = `${this.path_base}/${id}/${dia}`;
    return this.http.get<any>(url);
  }

  getClassroom(id: number, dia: string, hora: string){
    const url = `${environment.webservice}/aulas/${id}/${dia}/${hora}`;
    return this.http.get<any>(url);
  }
}
