import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { LstorageService } from './../services/lstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor (
    private serStorage: LstorageService,
    private router: Router
  ) { }

  canLoad(): boolean {
    let user = this.serStorage.get('user');
    if (user){
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return false;
    } else {
      return true;
    }
  }
}
