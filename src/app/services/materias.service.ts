import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  path_base = environment.webservice + '/materias';

  constructor(private http: HttpClient) { }

  getSubjects(id: number){
    const url = `${this.path_base}/${id}`;
    return this.http.get<any>(url);
  }
}
