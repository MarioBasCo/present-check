import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  path_base = environment.webservice;

  constructor(private http: HttpClient) { }

  saveDialing(data: any){
    const URL = this.path_base + "/registroasistencia";
    return this.http.post<any>(URL, data);
  }

  getListAttendance(id: number, materia: number){
    const URL = `${this.path_base}/asistencias/${id}/${materia}` ;
    return this.http.get<any>(URL);
  }
}
