import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL_API: string = environment.webservice;

  constructor(private http: HttpClient) { }

  fun_login(data: any) {
    let URL = this.URL_API + "/login";
    return this.http.post<any>(URL, data);
  }
}
