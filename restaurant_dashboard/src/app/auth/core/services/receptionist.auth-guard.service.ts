import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReceptionistAuthGuardService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (window.localStorage.getItem('role') === 'Receptionist') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
