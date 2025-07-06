import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private route: Router) {}

  redirectLogin() {
    this.route.navigate(['/cadastro']);
  }

  logout() {
    this.route.navigate(['/']);
  }
}
