import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpaddressService {

  constructor(private http: HttpClient) { 
  }

  getIp(){
    return this.http.get<any>('https://jsonip.com');
  }
  
}
