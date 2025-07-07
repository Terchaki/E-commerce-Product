import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Interfaces
import { ILogin } from './../models/login.model';

// GUID
import { v4 as uuidv4 } from 'uuid';

// Services
import { AuthService } from '../services/auth.service';

// Token
import { SecurityUtil } from '../../core/utils/security.util';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submittedForm: boolean = false;
  passwordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    /**
     * Init forms.
     */
    this.form = this.formBuilder.group(this.validatorsForm());
  }

  ngOnInit(): void {
    /**
     * Redirecting if you already have the login token.
     */
    if (SecurityUtil.hasToken()) {
      this.authService.redirectLogin();
    }
  }
  /**
   * Validators form:
   */
  validatorsForm() {
    return {
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    };
  }

  /**
   * Controls form.
   */
  get f() {
    return this.form.controls;
  }

  showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Submit Form Login.
   */
  onSubmit() {
    this.submittedForm = true;

    if (this.form.invalid) {
      return;
    } else {
      let envReq: ILogin = {
        id: uuidv4(),
        username: this.f['username'].value,
      };
      SecurityUtil.set(envReq);
      this.authService.redirectLogin();
    }
  }
}
