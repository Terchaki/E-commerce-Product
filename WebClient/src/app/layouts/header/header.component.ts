import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

// Token
import { SecurityUtil } from './../../core/utils/security.util';

// Services
import { AuthService } from '../../auth/services/auth.service';

// Interfaces
import { ILogin } from '../../auth/models/login.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user!: ILogin | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = SecurityUtil.getAccount();
    this.initialName();

    // removing item from local storage (possibly included in some angular library).
    localStorage.removeItem('debug');
  }

  nameUser(): string | undefined {
    const name = `${this.user?.username
      .split(' ')
      .shift()
      ?.slice(0, 10)
      ?.trim()} ${
      this.user?.username.split(' ')[1]
        ? this.user?.username.split(' ')[1]?.slice(0, 10).trim()
        : ''
    }`;
    return name;
  }

  initialName(): string | undefined {
    const names = this.user?.username.split(' ').map((nome) => nome.charAt(0));

    let initials = names?.join('');

    initials = ` ${
      initials!.length > 1
        ? initials?.slice(0, 2)
        : this.user?.username.split(' ')[0]?.slice(0, 2)
    }`;

    return initials?.toUpperCase();
  }

  logout() {
    SecurityUtil.clear();
    this.authService.logout();
  }
}
