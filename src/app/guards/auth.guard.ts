import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { LstorageService } from './../services/lstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor (
    private serStorage: LstorageService,
    private router: Router
  ) { }
  
  canLoad(): boolean {
    let user = this.serStorage.get('user');
    if(user){
      return true;
    } else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
