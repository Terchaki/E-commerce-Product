import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityUtil } from '../utils/security.util';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private route: Router) {}

  canActivate() {
    if (!SecurityUtil.getToken()) {
      this.route.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
